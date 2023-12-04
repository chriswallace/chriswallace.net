// Importing modules using ESM syntax
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { promises as fs } from 'fs';  // Node.js built-in fs promises API
import path from 'path';
import imageKit from 'imagekit';
import { fileTypeFromBuffer } from 'file-type';
import slugify from 'slugify';
import sharp from 'sharp';
import gifResize from '@gumlet/gif-resize';  // Import a library for resizing GIFs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;  // 2 seconds

// Initialize ImageKit
const imagekit = new imageKit({
    publicKey: "public_L3fJkv2yTfeiUv4DH5HtKrmlOAk=",
    privateKey: "private_i5P3md55uud+u6D6LLqgooJE1hs=",
    urlEndpoint: "https://ik.imagekit.io/UltraDAO/"
});

async function fetchMedia(uri) {
    try {
        let buffer;
        let fileName = '';

        if (uri.startsWith('ipfs://')) {
            const ipfsUri = `https://ipfs.io/ipfs/${uri.slice(7)}`;
            const response = await axios.get(ipfsUri, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data);

            const fileType = await fileTypeFromBuffer(buffer);
            const ipfsHash = uri.split('/')[2];

            // Get image dimensions using sharp
            const dimensions = await sharp(buffer).metadata();
            const { width, height } = dimensions;

            return {
                buffer: buffer,
                extension: fileType.ext,
                fileName: ipfsHash,
                dimensions: { width, height }
            };

        } else if (uri.startsWith('https://') || uri.startsWith('http://')) {
            const response = await axios.get(uri, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data);

            const fileType = await fileTypeFromBuffer(buffer);
            fileName = path.basename(uri, `.${fileType.ext}`);

            // Get image dimensions using sharp
            const dimensions = await sharp(buffer).metadata();
            const { width, height } = dimensions;

            return {
                buffer: buffer,
                extension: fileType.ext,
                fileName: fileName,
                dimensions: { width, height }
            };
        } else {
            throw new Error('Unsupported URI scheme');
        }
    } catch (error) {
        console.error('Error fetching media:', error.message);
        console.error(uri);
    }
    return null;
}

async function resizeImage(buffer) {
    try {
        const fileType = await fileTypeFromBuffer(buffer);

        if (fileType.ext === 'gif') {
            const resizedGifBuffer = await gifResize({
                width: 2000,
                height: 2000,
                optimizationLevel: 2
            })(buffer);
            return resizedGifBuffer;
        } else {
            const resizedBuffer = await sharp(buffer)
                .resize({
                    width: 2000,
                    height: 2000,
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .toBuffer();
            return resizedBuffer;
        }
    } catch (error) {
        console.error('Error resizing image:', error.message);
        return null;
    }
}

async function uploadToImageKit(media, fileBasename) {
    const folderName = 'wallace_collection';

    const requestBody = {
        file: media,
        fileName: fileBasename,
        folder: folderName,
        useUniqueFileName: false
    };

    console.log("Uploading media to ImageKit: ", requestBody.folder + "/" + requestBody.fileName);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await imagekit.upload(requestBody);
            if (response && response.url) {
                return response.url;
            } else {
                throw new Error('Invalid response from ImageKit');
            }
        } catch (error) {
            if (attempt < MAX_RETRIES) {
                console.log(`Retrying in ${RETRY_DELAY} milliseconds...`);
                await sleep(RETRY_DELAY);
            } else {
                console.error('Max retries reached. Upload failed.');
                return null;
            }
        }
    }
}

async function checkExistsOnImageKit(fileName) {
    const imageKitUri = `https://ik.imagekit.io/UltraDAO/wallace_collection/${fileName}`;

    try {
        const response = await axios.head(imageKitUri);
        return response.status === 200;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false;
        } else {
            return false;
        }
    }
}

async function processMedia(ipfsUri, fileName) {
    const mediaData = await fetchMedia(ipfsUri);
    if (!mediaData) {
        return null;
    }

    const fileBasename = slugify(fileName, {
        replacement: '_',
        remove: "#",
        lower: true,
        strict: true,
        locale: 'en'
    }) + '.' + mediaData.extension;

    const exists = await checkExistsOnImageKit(fileBasename);
    if (exists) {
        console.log(`Media already exists on ImageKit: ${fileBasename}`);
        return null;
    }

    const resizedBuffer = await resizeImage(mediaData.buffer);

    const imageKitUri = await uploadToImageKit(resizedBuffer, fileBasename);
    return {
        uri: imageKitUri,
        dimensions: mediaData.dimensions // Include dimensions
    };
}

async function fetchMetadata(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching metadata:', error.message);
        return null;
    }
}

function normalizeAttributes(attributes) {
    return attributes.map(attribute => {
        if (attribute.name && !attribute.trait_type) {
            attribute.trait_type = attribute.name;
            delete attribute.name;
        }
        return attribute;
    });
}

async function normalizeMetadata(metadata) {
    const standardMetadata = {
        name: '',
        description: '',
        artist: '',
        image: '',
        video: '',
        display_uri: '',
        website: '',
        tags: [],
        attributes: [],
    };

    // Map the fields from the scraped metadata to the standard structure
    standardMetadata.name = metadata.name || '';
    standardMetadata.tokenID = metadata.tokenID || metadata.tokenId || '';
    standardMetadata.description = metadata.description || '';
    standardMetadata.artist = metadata.artist || '';
    standardMetadata.platform = metadata.platform || '';

    if (metadata.symbol && metadata.symbol === 'GENTK')
        standardMetadata.image = metadata.displayUri || metadata.image || metadata.preview_asset_url || metadata.artifactUri || metadata.thumbnailUri || '';
    else
        standardMetadata.image = metadata.image || metadata.preview_asset_url || metadata.artifactUri || metadata.displayUri || metadata.thumbnailUri || '';

    standardMetadata.live_uri = metadata.live_url || metadata.artifactUri || metadata.generatorUri || metadata.primary_asset_url || '';
    standardMetadata.tags = metadata.tags || '';
    standardMetadata.website = metadata.website || '';

    standardMetadata.attributes = Array.isArray(metadata.features || metadata.attributes || metadata.traits)
        ? normalizeAttributes(metadata.features || metadata.attributes || metadata.traits)
        : [];

    if (metadata.image) {
        const mediaResult = await processMedia(metadata.image, metadata.name);
        if (mediaResult && mediaResult.uri) {
            metadata.image = mediaResult.uri;
            metadata.dimensions = mediaResult.dimensions; // Include dimensions here
        }
    }

    return standardMetadata;
}

async function scrapeAndStoreMetadata(filePath) {
    const html = await fs.readFile(filePath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Find all artist divs
    const artistDivs = document.querySelectorAll('.collection-group');
    const metadataArray = [];

    for (const artistDiv of artistDivs) {
        const artistElement = artistDiv.querySelector('.artist-title');
        const artistName = artistElement ? artistElement.textContent.trim() : '';
        const images = artistDiv.querySelectorAll('img[data-metadata]');

        for (const img of images) {
            const metadataUrl = img.getAttribute('data-metadata');
            let fetchedMetadata = await fetchMetadata(metadataUrl);

            if (fetchedMetadata) {
                const normalizedMetadata = await normalizeMetadata(fetchedMetadata);
                normalizedMetadata.artist = artistName;

                // Create or update artist
                const artist = await prisma.artist.upsert({
                    where: { name: normalizedMetadata.artist },
                    update: {},
                    create: { name: normalizedMetadata.artist }
                });

                // Create artwork
                const artwork = await prisma.artwork.create({
                    data: {
                        title: normalizedMetadata.name,
                        description: normalizedMetadata.description,
                        artistId: artist.id,
                        // Add other artwork details
                    }
                });

                metadataArray.push(normalizedMetadata);
            }
        }
    }

    const jsonFileName = path.basename(filePath, '.html') + '.json';
    const jsonFilePath = path.join('collection', jsonFileName);

    if (metadataArray.length === 0) {
        console.log(`No metadata found for ${filePath}, skipping file write.`);
    } else {
        await fs.writeFile(jsonFilePath, JSON.stringify(metadataArray, null, 2));
        console.log(`Metadata saved to ${jsonFilePath}`);
    }
}

async function processAllFiles() {
    const dir = 'collection';
    const files = await fs.readdir(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);

        if (path.extname(file) === '.html') {
            await scrapeAndStoreMetadata(filePath);
        }
    }

    await prisma.$disconnect();
}

processAllFiles();