---
layout: default
title: Candy Digital Collectible Deposit/Withdrawal
description: I designed a new bulk-select feature and a workflow for moving digital collectibles between self-custodied and institutional-custodied wallets.
permalink: /portfolio/candy-digital-collectible-deposit-withdrawal/
thumbnail: https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-home-thumb.png
---

<div class="content-container mt-2">
  <a class="back fade-in-element" href="/portfolio">/portfolio</a>
  <h1 class="fade-in-element mb-3">Candy Digital Collectible Deposit/Withdrawal</h1>
</div>

<div class="content-container mb-8">
  <dl class="project-list fade-in-element">
    <div>
      <dt>Company</dt>
      <dd>Candy Digital</dd>
    </div>
    <div>
      <dt>Role</dt>
      <dd>Product Design</dd>
    </div>
    <div>
      <dt>Year</dt>
      <dd>2024</dd>
    </div>
  </dl>
</div>

<div class="content-container-wo flex flex-col py-3 bg-black mb-12">
    <div class="zoomable max-h-[500px] mx-auto">
        <div class="video-player">
            <video id="portfolioVideo" data-type="video" width="100%" controls muted playsinline autoplay loop loading="lazy" class="max-h-full max-w-full">
                <source src="/assets/video/withdrawal-deposit.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
        </div>
    </div>
</div>

<div class="content-container">
  <p>One of the most-requested features of users on Candy Digital's marketplace is the ability to withdraw digital collectibles held in someone's collection to their own self-custodied digital wallet. This allows them full control over their NFTs, able to transfer and sell through various decentralized marketplaces. I was tasked with designing the user flow for withdrawals and deposits and integrating them into the current My Collection section of Candy.io.</p>

  <p>The first task was to understand all the technical requirements of web3 wallets and the blockchain as it pertains to authorizing transactions, connecting a wallet, and ensuring the security of each user on Candy.io. Being familiar with WalletConnect and Web3 Wallet, I wireframed a happy path where the user could select collectibles from their account, connect a wallet (if they didn't already have one connected), and submit a request to withdraw items. This request would then appear in our custom admin for our fraud and risk team to review/approve, and once approved, the withdrawal would be executed on the blockchain.</p>

  <p>The happy path for deposits is slightly more complicated, as users are required to sign the transaction themselves to initiate a transfer back to Candy.io. The process is intended to be as simple as possible while educating users about features they may lose access to by transferring collectibles to self-custodied wallets.</p>

  <p>After developing these features, we worked with a small group of beta testers using Metamask as our first supported wallet for withdrawals. Users reported successful transactions in these limited test and provided feedback about the process as we worked on the next phase of rollout to all users.</p>
</div>