const axios = require("axios");
const fs = require("fs");

const walletAddress = "tz1R5CMvYnpteLY3aLcxwgMG2vGK6FiN94DA";
const baseUrl = `https://api.tzkt.io/v1/tokens/balances`;
const query = `?account=${walletAddress}&token.standard=fa2`;

const stream = fs.createWriteStream("nfts.json");
let isFirstToken = true;
let totalProcessed = 0; // Running total of processed items
const existingTokens = new Set();

stream.write("[");

async function fetchNFTs(url) {
  try {
    console.log(`Fetching data from: ${url}`);
    const response = await axios.get(url);
    const nfts = response.data;

    if (nfts.length === 0) {
      finishStream();
      return;
    }

    nfts.forEach((nft) => {
      const uniqueId = `${nft.token.contract.address}-${nft.token.tokenId}`;
      if (!existingTokens.has(uniqueId)) {
        existingTokens.add(uniqueId);
        streamData(nft);
        totalProcessed++; // Increment for each new item
      }
    });

    // Use totalProcessed as the next offset
    await fetchNFTs(`${baseUrl}${query}&offset=${totalProcessed}`);
  } catch (error) {
    console.error(`Error fetching NFTs: ${error.message}`);
    finishStream();
  }
}

function streamData(nft) {
  if (!isFirstToken) {
    stream.write(",");
  } else {
    isFirstToken = false;
  }
  stream.write(JSON.stringify(nft, null, 2));
}

function finishStream() {
  stream.write("]");
  stream.end();
  console.log("Stream finished. Data written to nfts.json");
}

fetchNFTs(`${baseUrl}${query}`);
