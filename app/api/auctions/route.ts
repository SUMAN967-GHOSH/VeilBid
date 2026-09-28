import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const network = searchParams.get('network');
    const status = searchParams.get('status');
    const deployerAddress = searchParams.get('deployer');

    const where: any = {};
    if (network) where.network = network;
    if (status) where.lastKnownStatus = status;
    if (deployerAddress) where.deployerAddress = deployerAddress;

    const auctions = await prisma.auctionContract.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    // Convert BigInt to string for JSON serialization
    const serializedAuctions = auctions.map(a => ({
      ...a,
      auctionEndBlock: a.auctionEndBlock ? a.auctionEndBlock.toString() : null
    }));

    return NextResponse.json({ auctions: serializedAuctions });
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return NextResponse.json({ error: 'Failed to fetch auctions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { contractAddress, itemDescription, deployerAddress, deployTxHash, network, category, imageUrl, auctionEndBlock, reserveCommitment } = data;

    if (!contractAddress || !itemDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const auction = await prisma.auctionContract.create({
      data: {
        contractAddress,
        itemDescription,
        deployerAddress: deployerAddress ?? null,
        deployTxHash:    deployTxHash    ?? null,
        network:         network || 'preprod',
        category:        category ?? null,
        imageUrl:        imageUrl ?? null,
        auctionEndBlock: auctionEndBlock ? BigInt(auctionEndBlock) : null,
        reserveCommitment: reserveCommitment ?? null,
      },
    });

    const serialized = { ...auction, auctionEndBlock: auction.auctionEndBlock?.toString() };
    return NextResponse.json({ auction: serialized }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating auction:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Auction already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create auction' }, { status: 500 });
  }
}
