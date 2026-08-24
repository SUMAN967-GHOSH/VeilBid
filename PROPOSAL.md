# Project Proposal: VeilBid

## 1. What are you building and who is it for?
**VeilBid** is a decentralized, privacy-preserving auction platform. It is built for **sellers** who want to auction high-value items without exposing their minimum acceptable price, and **bidders** who want to participate without revealing their identities or bidding strategies to competitors.

## 2. Why Midnight?
In traditional transparent blockchains (like Ethereum or Cardano), auction parameters and bidder behaviors are fully public. This allows MEV bots and competitors to track behavior, maliciously outbid, or wait until the last minute to bid exactly the reserve price, artificially suppressing the true market value of the item.

**Midnight is the perfect fit** because its zero-knowledge (ZK) data protection capabilities (via Compact smart contracts) allow VeilBid to:
- Cryptographically hide the seller's reserve price.
- Keep bidder identities and bid amounts private.
- Settle auctions securely, proving mathematically whether the highest bid met the reserve without ever exposing the reserve price itself.

## 3. What is the Data Model?
VeilBid uses a hybrid data model:
- **On-chain (Midnight ZK Smart Contract):** Stores cryptographic hashes (commitments) of the reserve price and salt, the highest bid amount, and bidder pseudonyms (derived cryptographic keys, not public addresses). It maintains the state of the auction and handles the zero-knowledge settlement.
- **Off-chain (Neon Postgres):** Stores public item metadata, such as item descriptions and images, ensuring the smart contract logic remains lightweight and focused on privacy preservation.

## 4. Higher Feasibility
This project has **high feasibility** because it leverages an established modern web stack alongside Midnight's native tools:
- **Compact DSL:** Simplifies writing ZK circuits compared to traditional ZK languages, reducing development time and complexity.
- **Next.js & Tailwind CSS:** Provides a modern, responsive UI.
- **Midnight JS SDK & 1AM Wallet:** Provides out-of-the-box integration for circuit execution and user signing in the browser extension.
- **Postgres:** Offloading non-critical metadata to a traditional relational database simplifies the smart contract architecture.

## 5. Project Status
- ✅ Smart Contracts written, tested, and compiled.
- ✅ Frontend built and integrated with Midnight SDK.
- ✅ Deployed to Midnight Preview Network.
- ✅ E2E Testing passing.
