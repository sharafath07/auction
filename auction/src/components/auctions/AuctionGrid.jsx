import React from 'react';
import { AuctionCard } from './AuctionCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const AuctionGrid = ({ auctions, loading, onViewAuction, searchTerm }) => {
  const filteredAuctions = auctions.filter(auction =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading auctions..." />;
  }

  if (filteredAuctions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {searchTerm ? 'No auctions found' : 'No auctions available'}
        </h3>
        <p className="text-gray-600">
          {searchTerm
            ? `No auctions match "${searchTerm}". Try a different search term.`
            : 'Be the first to create an auction!'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAuctions.map((auction) => (
        <AuctionCard
          key={auction.id}
          auction={auction}
          onView={onViewAuction}
        />
      ))}
    </div>
  );
};
