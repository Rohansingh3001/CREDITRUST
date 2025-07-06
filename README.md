
# 🌐 Web3Buddy — Hands-On Web3 Onboarding with On-Chain Proof

> A soulbound badge system built on Aptos that teaches users Web3 by doing — with every quest you complete, your knowledge gets etched on-chain.

---

## 🎯 What Is Web3Buddy?

**Web3Buddy** is a quest-based onboarding app that teaches users key Web3 concepts through real, interactive tasks. As users complete each quest, they **earn Soulbound NFTs (SBTs)** minted on the **Aptos blockchain** — forming a **verifiable Web3 profile** that proves what they’ve learned.

---

## 💡 Why Web3Buddy?

Most platforms throw you into Web3 and expect you to "figure it out." Web3Buddy flips that — you actually **learn by doing**, and your learning is **recorded on-chain** through badges that can't be sold or transferred.

---

## 🚀 Features

| Feature                     | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| 🧩 Interactive Quests       | Users learn topics by completing hands-on missions            |
| 🪪 Wallet Integration       | Connect Petra/Martian wallet to progress through quests       |
| 🏅 Soulbound NFTs (SBTs)    | Mint non-transferable badges for each completed quest         |
| 📜 Smart Contract on Aptos  | Secure Move-based contract using Aptos Object Model           |
| 📤 IPFS Metadata (Optional) | Store badge images or proof using NFT.Storage or Web3.Storage |
| 📊 On-chain Profile         | Public profile shows all earned badges                        |

---

## 🧪 Sample Quests & Badges

| Quest ID     | Title              | Flow                                   | Badge Name          |
| ------------ | ------------------ | -------------------------------------- | ------------------- |
| `wallet_101` | What is a Wallet?  | Connect wallet + explanation           | 🧠 Wallet Explorer  |
| `mint_nft`   | How to Mint an NFT | Mint NFT on Aptos testnet              | 🎨 NFT Minter       |
| `sign_msg`   | Sign a Message     | User signs message with wallet         | ✍️ Signer Level 1   |
| `scam_quiz`  | Avoid Scam Sites   | Complete a quiz about phishing & scams | 🛡️ Security Aware  |
| `view_chain` | View On-Chain Data | Inspect wallet history via Aptos API   | 🔍 On-chain Analyst |

---

## 🧱 Tech Stack

| Layer        | Tech                              | Purpose                               |
| ------------ | --------------------------------- | ------------------------------------- |
| 🧰 Backend   | Aptos Move(Smart Contract)        | Badge minting + quest tracking        |
| 🌐 Frontend  | React + Tailwind + Wallet Adapter | UI and wallet interaction             |
| ⛓ Blockchain | Aptos Move                        | Soulbound badge minting               |
| 📦 Storage   | IPFS (NFT.Storage)                | Decentralized badge image + metadata  |
| 🔐 Auth      | Petra Wallet            | Wallet login + signature verification |

---

## 📝 Smart Contract Details

**Language**: Move (Aptos)
**Badge Minting**: Soulbound NFTs using Aptos Object Model
**Event System**: Emits `BadgeMintedEvent` on every quest completion
**Storage**: Each badge is a unique object stored at its own address
**Access Control**: Only admin can mint badges via resource account

---

## 🚦 How It Works (Flow)

1. **User connects wallet**
2. **Completes a quest**
3. **Backend verifies** quest and calls `mint_badge()`
4. **Contract mints soulbound NFT** and emits `BadgeMintedEvent`
5. **Frontend displays** the badge and updates profile

---

## 🧪 Try It Yourself

```bash
# 1. Clone the repo
git clone https://github.com/your-org/web3buddy.git

# 2. Install Aptos CLI
curl -sSL https://aptos.dev/install.sh | bash

# 3. Build and test the contract
aptos move test

# 4. Deploy to devnet (after setting up aptos.yaml)
aptos move publish --profile devnet

# 5. Mint a badge (from CLI or backend)
aptos move run --function-id "web3buddy::badges::mint_badge" ...
```

---

## 👥 Team

| Name | Role                  | GitHub / Contact |
| ---- | --------------------- | ---------------- |
| Shivam Jha | Smart Contract Dev    | https://github.com/ShivamJhaXXIII                 |
| Rohan Singh | Frontend Developer    | https://github.com/Rohansingh3001                 |
| Ashutosh Choubey + Rohan Singh | Backend / Integration |  https://github.com/AIChoubeyX                |

---

## 🧠 Future Ideas

* 🧠 AI Chat Companion: Help users through quests conversationally
* 🧩 Dynamic Quests: Auto-generate quests using on-chain conditions
* 🛡️ ZK Quests: Use zero-knowledge proof to verify knowledge without revealing data
* 💬 Peer Endorsements: Users can endorse each other’s knowledge
* 🎓 Public Web3 Resume: Show off what you’ve learned via badges
* 🧠 Leaderboard & XP: Gamified learning experience

---

## 📦 Deployed Contract Info

- **Aptos Network:** Devnet  
- **Contract Address:** `0xa291cc4c7ef0b9de7f91704de56457e073d63e75b49d390892813f1515df31aa`  
- **Main Module:** `badges.move` — Mints quest-based soulbound NFTs

---

