import React, { useState, useEffect } from 'react';
import { User, Clock, TrendingUp, ExternalLink, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CountdownTimer } from '../ui/CountdownTimer';
import { useContract } from '../../hooks/useContract';
import { useWallet } from '../../context/WalletContext';
import { useAuctions } from '../../hooks/useAuctions';
import { shortAddress, formatEth, formatDate, getExplorerLink, isValidEthAmount } from '../../utils/format';

export const AuctionDetailsModal = ({ auction, isOpen, onClose }) => {
  const { account, connected } = useWallet();
  const { placeBid, withdrawBid, loading, error } = useContract();
  const { getAuctionBids } = useAuctions();
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([]);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (auction) {
      setBids(getAuctionBids(auction.id));
      const currentBidEth = parseFloat(formatEth(auction.currentBid));
      setBidAmount((currentBidEth + 0.01).toFixed(4));
    }
  }, [auction, getAuctionBids]);

  if (!auction) return null;

  const currentBidEth = formatEth(auction.currentBid);
  const isOwner = account === auction.seller;
  const isHighestBidder = account === auction.highestBidder;
  const hasEnded = auction.endTime < Math.floor(Date.now() / 1000);

  const validateBid = () => {
    if (!bidAmount || !isValidEthAmount(bidAmount)) {
      setValidationError('Please enter a valid ETH amount');
      return false;
    }

    const bidAmountNum = parseFloat(bidAmount);
    const currentBidNum = parseFloat(currentBidEth);

    if (bidAmountNum <= currentBidNum) {
      setValidationError(`Bid must be higher than ${currentBidEth} ETH`);
      return false;
    }

    setValidationError('');
    return true;
  };

  const handlePlaceBid = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!validateBid()) return;

    try {
      await placeBid(auction.id, bidAmount);
      setBidAmount((parseFloat(bidAmount) + 0.01).toFixed(4));
      setBids(getAuctionBids(auction.id));
    } catch (err) {
      console.error('Failed to place bid:', err);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawBid(auction.id);
    } catch (err) {
      console.error('Failed to withdraw:', err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={auction.title}
      maxWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image and Basic Info */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden mb-4">
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <CountdownTimer endTime={auction.endTime} size="lg" />
              {hasEnded && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  Auction Ended
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>Seller: {shortAddress(auction.seller)}</span>
            </div>

            <p className="text-gray-700">{auction.description}</p>
          </div>
        </div>

        {/* Bidding Section */}
        <div className="space-y-6">
          {/* Current Bid */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Current Highest Bid</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {currentBidEth} ETH
            </div>
            {auction.highestBidder && (
              <div className="text-sm text-gray-600">
                by {shortAddress(auction.highestBidder)}
              </div>
            )}
          </div>

          {/* Bidding Form */}
          {!hasEnded && !isOwner && connected && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Bid (ETH)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                    setValidationError('');
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationError ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter bid amount"
                />
                {validationError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {validationError}
                  </p>
                )}
              </div>

              <Button
                onClick={handlePlaceBid}
                loading={loading}
                className="w-full"
                disabled={isHighestBidder}
              >
                {isHighestBidder ? 'You are the highest bidder' : 'Place Bid'}
              </Button>
            </div>
          )}

          {/* Withdraw Button */}
          {!hasEnded && isHighestBidder && (
            <Button
              onClick={handleWithdraw}
              loading={loading}
              variant="outline"
              className="w-full"
            >
              Withdraw Bid
            </Button>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </p>
            </div>
          )}

          {/* Bid History */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Bid History
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {bids.length > 0 ? (
                bids.map((bid, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{formatEth(bid.amount)} ETH</div>
                      <div className="text-sm text-gray-600">
                        by {shortAddress(bid.bidder)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {formatDate(bid.timestamp)}
                      </div>
                      <a
                        href={getExplorerLink(bid.transactionHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-xs flex items-center"
                      >
                        View Tx <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No bids yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
