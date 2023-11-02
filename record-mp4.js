const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
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

    const Config = {
        followNewTabs: false,
        // Assuming the library accepts width and height for the video dimensions.
        width: dimensions.width,
        height: dimensions.height,
    }

    const recorder = new PuppeteerScreenRecorder(page, Config);
    await recorder.start(`_capture/${fileName}.mp4`);

    // Inject a script to listen for the fxhash-preview event
    await page.evaluateOnNewDocument(() => {
        window.addEventListener('fxhash-preview', () => {
            window.stopRecording = true;
        });
    });

    async function stopRecordingNow() {
        clearInterval(intervalId);  // Clear the interval first
        await recorder.stop();
        console.log(`Video created as ${fileName}.mp4, uploading to ImageKit...`);
        await uploadToImageKit(`_capture/${fileName}.mp4`);
        await browser.close();
    }

    // Stop the recording after 10 seconds
    setTimeout(async () => {
        await stopRecordingNow();
    }, 20000);  // Adjusted to 10 seconds (10000 ms)

    // Check the stopRecording flag every 500ms
    const intervalId = setInterval(async () => {
        const stopRecording = await page.evaluate(() => window.stopRecording);
        if (stopRecording) {
            await stopRecordingNow();
        }
    }, 500);
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
