# 📖 Usage Guide

A step-by-step guide for interacting with VeilBid on the **Midnight PREPROD** network.

> **Prerequisite:** Follow [SETUP.md](./SETUP.md) first to install the 1AM Wallet, get PREPROD tokens, and run the app locally.

---

## 1. Connecting Your Wallet

1. Open VeilBid at [https://veil-bid.vercel.app](https://veil-bid.vercel.app) or `http://localhost:3000`.
2. Click **"Connect 1AM Wallet"** in the top-right corner.
3. The 1AM extension will prompt you to approve the connection to **Midnight Preprod**. Click **Approve**.
4. Your shielded address appears in the navbar — your ZK identity is now active.

> 🔒 **Privacy note:** Your real wallet address is never sent to the smart contract. You appear on-chain as `Hash(your_secret_key)` — a contract-specific ephemeral identity.

> 💡 VeilBid saves your session — it will auto-reconnect on your next visit.

---

## 2. Creating an Auction (Seller)

1. Navigate to the **Auctions** page and click **"Create Private Auction"**.
2. Fill in:
   - **Item Name / Description** — publicly visible, stored in the database.
   - **Secret Reserve Price** (in tNIGHT) — *this stays completely private*.
   - **Duration** (in blocks) — how long bidding is open (~20 seconds per block).
   - **Category** (optional) — Art, NFT, Corporate, DeFi, Real Estate.
   - **Image URL** (optional) — a link to an image for your item.
3. Click **"Deploy Auction"**.
4. Your wallet generates a ZK proof locally, computing `Hash(reserve_price, salt)`. Only the **commitment hash** is sent to the Midnight PREPROD blockchain — the price never leaves your device.
5. The contract deploys and your auction goes live immediately. It appears in the auction grid and in your **Command Center** dashboard.

> ⚠️ **Important:** The reserve price and salt are stored in your browser's local private state. Do not clear your browser storage while your auction is active.

---

## 3. Placing a Bid (Bidder)

1. Browse the active auctions on the **Auctions** page.
2. You can also load a specific auction by pasting a contract address into the lookup bar, or by opening a shared link (e.g., `?load=<contract_address>`).
3. Click **"Place Sealed Bid"** on any OPEN auction.
4. Enter your bid amount (in tNIGHT) — it must be strictly higher than the current highest bid.
   - Use the **+10** or **+50 tNIGHT** quick buttons for convenience.
5. Click **"Submit Bid"**. A ZK proof is generated confirming:
   - Your bid exceeds the current highest bid.
   - The auction has not yet expired.
6. Once confirmed, the auction card updates showing the new highest bid amount (and your ZK-derived identity as the bidder — not your real address).

> 🛡️ You cannot bid on your own auction. The seller identity check is enforced on-chain by the smart contract.

---

## 4. Settling an Auction (Seller)

Settling can only happen **after** the auction's end block has passed.

1. Navigate to your **Command Center** (Dashboard).
2. Find your auction in the "Your Deployed Auctions" list.
3. Click **"Reveal & Settle Auction"**.
4. Your wallet generates a final ZK proof using your original secret reserve price and salt, proving `Hash(price, salt) == reserve_commitment` on-chain.
5. The contract evaluates the outcome:
   - ✅ **Highest bid ≥ reserve price** → Status changes to **SETTLED** (SOLD). The winner is declared by their ZK key.
   - ❌ **Highest bid < reserve price** → Status changes to **EXPIRED**. No winner.

> 🔒 The actual reserve price is **never revealed on-chain** — only a boolean (met / not met) is disclosed by the ZK circuit.

---

## 5. Cancelling an Auction (Seller)

If you need to cancel an active auction before it expires:

1. Go to the **Auctions** page and find your OPEN auction.
2. As the seller, you will see a **"Cancel Auction"** option.
3. Submitting this calls the `cancelAuction` circuit, which flips the auction status to **EXPIRED** immediately.

> This is useful if the item has been sold privately or you no longer wish to auction it.

---

## 6. Withdrawing Funds (Bidder — Expired Auctions)

If an auction ends in the **EXPIRED** state (reserve not met), the losing highest bidder can reclaim their locked funds:

1. Browse to the expired auction.
2. Click **"Withdraw Funds"**.
3. The `withdrawExpired` ZK circuit verifies you are the previous highest bidder and resets the bid state.

---

## 7. Sharing an Auction

Each auction card has a **copy link** button (📋 icon next to the contract address). Clicking it copies a direct URL like:

```
https://veil-bid.vercel.app/auctions?load=ac616d0ed7625c97c6188df5253077ce140ac64d73390ae925631caf4e3533ba
```

Anyone who opens this link will have the auction automatically loaded — even without a wallet connected.

---

## Verifying On-Chain

You can independently verify all auction activity on the Midnight PREPROD block explorer:

- **PREPROD Explorer:** [https://preprod.midnightexplorer.com](https://preprod.midnightexplorer.com)
- **1AM Explorer:** [https://explorer.1am.xyz](https://explorer.1am.xyz)
- **VeilBid Contract:** [`ac616d0ed7625c97c...533ba`](https://explorer.1am.xyz/contract/ac616d0ed7625c97c6188df5253077ce140ac64d73390ae925631caf4e3533ba)
