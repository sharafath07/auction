import { useState, useEffect, useCallback } from 'react';

// Mock data generator
const generateMockAuctions = () => {
  const titles = [
    'Rare Digital Collectible',
    'Vintage NFT Artwork',
    'Limited Edition Token',
    'Exclusive Digital Asset',
    'Premium Collectible',
    'Unique Digital Art',
    'Special Edition NFT',
    'Rare Gaming Item'
  ];

  const images = [
    'https://images.pexels.com/photos/6765371/pexels-photo-6765371.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/7887803/pexels-photo-7887803.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8183880/pexels-photo-8183880.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8369577/pexels-photo-8369577.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8464886/pexels-photo-8464886.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]

  return Array.from({ length: 12 }, (_, i) => {
    const now = Math.floor(Date.now() / 1000);
    const endTime = now + Math.floor(Math.random() * 604800); // Up to 7 days
    const startingBid = (Math.random() * 5 + 0.1).toFixed(4);
    const currentBid = (parseFloat(startingBid) + Math.random() * 10).toFixed(4);
    
    return {
      id: `auction-${i + 1}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: `This is a premium digital collectible with unique attributes and rarity. Perfect for collectors and enthusiasts.`,
      imageUrl: images[Math.floor(Math.random() * images.length)],
      seller: `0x${Math.random().toString(16).substring(2, 42)}`,
      startingBid: (parseFloat(startingBid) * 1e18).toString(),
      currentBid: (parseFloat(currentBid) * 1e18).toString(),
      highestBidder: Math.random() > 0.5 ? `0x${Math.random().toString(16).substring(2, 42)}` : '',
      endTime,
      ended: false,
      cancelled: false,
    };
  });
};

const generateMockBids = (auctionId) => {
  const bidCount = Math.floor(Math.random() * 8) + 1;
  const now = Math.floor(Date.now() / 1000);
  
  return Array.from({ length: bidCount }, (_, i) => ({
    bidder: `0x${Math.random().toString(16).substring(2, 42)}`,
    amount: ((Math.random() * 5 + 0.5) * 1e18).toString(),
    timestamp: now - (bidCount - i) * 3600,
    transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
  })).sort((a, b) => b.timestamp - a.timestamp);
};

export const useAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAuctions(generateMockAuctions());
      setLoading(false);
    }, 1000);
  }, []);

  const getAuction = useCallback((id) => {
    return auctions.find(auction => auction.id === id);
  }, [auctions]);

  const getAuctionBids = useCallback((auctionId) => {
    return generateMockBids(auctionId);
  }, []);

  const refreshAuctions = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setAuctions(generateMockAuctions());
      setLoading(false);
    }, 500);
  }, []);

  return {
    auctions,
    loading,
    getAuction,
    getAuctionBids,
    refreshAuctions,
  };
};
