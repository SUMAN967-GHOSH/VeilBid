# 🛠️ Setup Guide

> **Network:** Midnight **PREPROD** — the pre-production testnet that mirrors Mainnet.

Follow these steps to get VeilBid running locally and connected to the live Midnight PREPROD network.

---

## Step 1 — Install the 1AM Wallet

VeilBid interacts with the Midnight Network through the **1AM Wallet** browser extension.

1. Install the [1AM Wallet](https://www.1am.xyz/) extension from the Chrome Web Store (or any compatible Chromium browser).
2. Create a new wallet and **save your 24-word recovery phrase** somewhere safe.
3. In the wallet UI, click the **network dropdown** at the top and select **Midnight Preprod**.

> ⚠️ Make sure the wallet is set to **Preprod**, not Preview or Mainnet. VeilBid is deployed on PREPROD.

---

## Step 2 — Get PREPROD Test Tokens (tNIGHT)

You need `tNIGHT` tokens to deploy auctions and place bids. These are free testnet tokens.

1. Open your 1AM Wallet and copy your **unshielded address** (starts with `mn_addr_preprod1...`).
2. Go to the [PREPROD Faucet](https://midnight-tmnight-preprod.nethermind.dev/).
3. Paste your address, complete the captcha, and submit. Tokens arrive in ~1 minute.
4. In your wallet, click **"Generate tDUST"** (or "Register tokens") to convert some `tNIGHT` to `tDUST` — this is needed to pay gas fees.

> 💡 **Two-token model:** Midnight uses `tNIGHT` for value transfers and `tDUST` for transaction fees. You need a small amount of both.

---

## Step 3 — Run VeilBid Locally

```bash
# 1. Clone the repository
git clone https://github.com/SUMAN967-GHOSH/VeilBid.git
cd VeilBid

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local
```

Open `.env.local` and fill in your database URL. Everything else is pre-configured for PREPROD:

```bash
# .env.local
DATABASE_URL="postgresql://..."   # Your Neon Postgres connection string

# These are already set correctly in .env.example for PREPROD:
NEXT_PUBLIC_MIDNIGHT_NETWORK=preprod
NEXT_PUBLIC_NODE_WS_URL=wss://rpc.preprod.midnight.network/ws
NEXT_PUBLIC_INDEXER_URI=https://indexer.preprod.midnight.network/api/v4/graphql
NEXT_PUBLIC_INDEXER_WS_URI=wss://indexer.preprod.midnight.network/api/v4/graphql
NEXT_PUBLIC_PROOF_SERVER_URI=https://proving.preprod.midnight.network
```

```bash
# 4. Push the database schema
npx prisma db push

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Step 4 — Connect Wallet

1. Click **"Connect 1AM Wallet"** in the top-right corner.
2. The 1AM extension will ask to approve the connection — click **Approve**.
3. Your shielded address will appear in the navbar. You are ready.

> 💡 VeilBid remembers your connection — you won't need to reconnect on every page refresh.

---

## Running Tests

```bash
npm test
```

This runs 17 ZK circuit simulation tests covering all 5 Compact circuits.

---

## PREPROD Network Endpoints Reference

| Service | URL |
|:--------|:----|
| Node RPC | `wss://rpc.preprod.midnight.network/ws` |
| Indexer (GraphQL) | `https://indexer.preprod.midnight.network/api/v4/graphql` |
| Proof Server | `https://proving.preprod.midnight.network` |
| Faucet | `https://midnight-tmnight-preprod.nethermind.dev/` |
| Block Explorer | `https://preprod.midnightexplorer.com` |
| 1AM Explorer | `https://explorer.1am.xyz` |
