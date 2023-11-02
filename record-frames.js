const puppeteer = require('puppeteer');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const imagekit = require('imagekit');

// Initialize ImageKit
const imagekitInstance = new imagekit({
    publicKey: "public_L3fJkv2yTfeiUv4DH5HtKrmlOAk=",
    privateKey: "private_i5P3md55uud+u6D6LLqgooJE1hs=",
    urlEndpoint: "https://ik.imagekit.io/UltraDAO/"
});

async function captureAndUpload(url, fileName) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Retrieve Canvas Dimensions or fallback to 1080x1080
    const dimensions = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return canvas ? { width: canvas.width, height: canvas.height } : { width: 1080, height: 1080 };
    });

    await page.setViewport({
        width: dimensions.width,
        height: dimensions.height,
        deviceScaleFactor: 1,
    });

    const frameCount = 900;  // Adjust the frame count as needed
    for (let i = 0; i < frameCount; i++) {
        const frameDataUrl = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            return canvas.toDataURL();
        });

        const frameData = frameDataUrl.split(',')[1];
        const frameBuffer = Buffer.from(frameData, 'base64');
        fs.writeFileSync(`_frames/frame${i.toString().padStart(4, '0')}.png`, frameBuffer);

        // Wait for the next frame
        await new Promise(resolve => setTimeout(resolve, 33));  // ~30fps
    }

    await browser.close();

    ffmpeg()
        .input('_frames/frame%04d.png')
        .inputOptions([
            '-framerate', '30'
        ])
        .output(`_capture/${fileName}.mp4`)
        .on('end', async () => {
            console.log(`Video created as ${fileName}.mp4, uploading to ImageKit...`);
            await uploadToImageKit(`_capture/${fileName}.mp4`);
        })
        .run();
}

async function uploadToImageKit(filePath) {
    const file = await fs.promises.readFile(filePath);
    imagekitInstance.upload({
        file: file,
        fileName: filePath.split('/').pop(),
        folder: 'wallace_collection',
        useUniqueFileName: false
    }, function (error, result) {
        if (error) console.error(error);
        else console.log(result);
    });
}

// Get the command line arguments
const [, , fileName, url] = process.argv;

if (!fileName || !url) {
    console.error('Please provide a filename and URL as command line arguments.');
    process.exit(1);
}

captureAndUpload(url, fileName);