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
            // Adjust the following line to account for the path as well
            const ipfsUri = `https://ipfs.io/ipfs/${uri.slice(7)}`;
            const response = await axios.get(ipfsUri, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data);

            // Determine filetype from buffer
            const fileType = await fileTypeFromBuffer(buffer);
            const ipfsHash = uri.split('/')[2];  // Extracting the hash part for filename

            return {
                buffer: buffer,
                extension: fileType.ext,
                fileName: ipfsHash
            };

        } else if (uri.startsWith('https://') || uri.startsWith('http://')) {
            const response = await axios.get(uri, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);  // <-- Ensure we have a Buffer here

            // Determine filetype and file name from buffer
            const fileType = await fileTypeFromBuffer(buffer);
            fileName = path.basename(uri, `.${fileType.ext}`);  // Remove extension from file name

            return {
                buffer: buffer,
                extension: fileType.ext,
                fileName: fileName
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
            // Resize GIF while preserving animation
            const resizedGifBuffer = await gifResize({
                width: 2000,
                height: 2000,
                optimizationLevel: 2  // Adjust optimization level as needed
            })(buffer);
            return resizedGifBuffer;
        } else {
            // Resize other image types
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

    // Set the folder and file name
    const folderName = 'wallace_collection';

    const requestBody = {
        file: media,  // This should be a Buffer
        fileName: fileBasename,
        folder: folderName,
        useUniqueFileName: false  // Set to false to use the fileName as is
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
            //console.error(`Error uploading media to ImageKit (Attempt ${attempt}):`, error.message);
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
        // If the request is successful (status 200), the file exists
        return response.status === 200;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // File not found
            return false;
        } else {
            //console.error('Error checking existence on ImageKit:', error.message);
            return false;
        }
    }
}

async function processMedia(ipfsUri, fileName) {

    // Fetch media from IPFS
    const mediaBuffer = await fetchMedia(ipfsUri);
    if (!mediaBuffer) {
        return null;
    }


    //const fileType = await fileTypeFromBuffer(mediaBuffer.buffer);

    const fileBasename = slugify(fileName, {
        replacement: '_',
        remove: "#",
        lower: true,
        strict: true,
        locale: 'en'
    }) + '.' + mediaBuffer.extension;

    // Check if media already exists on ImageKit
    // Assume a function checkExistsOnImageKit that returns true if file exists
    const exists = await checkExistsOnImageKit(fileBasename);
    if (exists) {
        console.log(`Media already exists on ImageKit: ${fileBasename}`);
        return null;
    }

    const resizedBuffer = await resizeImage(mediaBuffer.buffer);

    // Upload media to ImageKit
    const imageKitUri = await uploadToImageKit(resizedBuffer, fileBasename);
    return imageKitUri;

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
    // Define a standard structure for the metadata
    const standardMetadata = {
        tokenID: '',
        name: '',
        description: '',
        artist: '',
        image: '',
        display_uri: '',
        website: '',
        tags: [],
        attributes: [],
    };

    // Map the fields from the scraped metadata to the standard structure
    // This example is based on the first metadata example provided
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
        // Extract artist name from the HTML
        const artistElement = artistDiv.querySelector('.artist-title');
        const artistName = artistElement ? artistElement.textContent.trim() : '';

        // Find all images with data-metadata attribute within the current artist div
        const images = artistDiv.querySelectorAll('img[data-metadata]');

        for (const img of images) {
            const metadataUrl = img.getAttribute('data-metadata');
            let fetchedMetadata = null;

            fetchedMetadata = await fetchMetadata(metadataUrl);

            if (fetchedMetadata) {
                // Normalize the metadata
                const normalizedMetadata = await normalizeMetadata(fetchedMetadata);
                normalizedMetadata.artist = artistName;  // Set the artist name

                if (normalizedMetadata.image) {
                    const imageKitUri = await processMedia(normalizedMetadata.image, normalizedMetadata.name);
                    if (imageKitUri) {
                        normalizedMetadata.image = imageKitUri;
                    }
                }

                metadataArray.push(normalizedMetadata);
            }
        }
    }

    // Derive JSON file name from HTML file name
    const jsonFileName = path.basename(filePath, '.html') + '.json';
    const jsonFilePath = path.join('collection', jsonFileName);

    if (metadataArray.length === 0) {
        console.log(`No metadata found for ${filePath}, skipping file write.`);
    } else {
        // Store metadata to a JSON file using fs promises API
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
}

processAllFiles();