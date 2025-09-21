import React from 'react';
import { User, Eye } from 'lucide-react';
import { shortAddress, formatEth } from '../../utils/format';
import { CountdownTimer } from '../ui/CountdownTimer';
import { Button } from '../ui/Button';

export const AuctionCard = ({ auction, onView }) => {
  const currentBidEth = formatEth(auction.currentBid);
  const hasHighestBidder = auction.highestBidder !== '';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <CountdownTimer endTime={auction.endTime} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {auction.title}
        </h3>

        {/* Seller */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <User className="w-4 h-4 mr-1" />
          <span>Seller: {shortAddress(auction.seller)}</span>
        </div>

        {/* Current Bid */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">Current Bid</p>
            <p className="text-xl font-bold text-gray-900">
              {currentBidEth} ETH
            </p>
          </div>
          {hasHighestBidder && (
            <div className="text-right">
              <p className="text-xs text-gray-500">Highest Bidder</p>
              <p className="text-sm font-medium text-green-600">
                {shortAddress(auction.highestBidder)}
              </p>
            </div>
          )}
        </div>

        {/* View Button */}
        <Button
          onClick={() => onView(auction)}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 group-hover:border-blue-500 group-hover:text-blue-600"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </Button>
      </div>
    </div>
  );
};
