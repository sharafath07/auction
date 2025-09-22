import React, { useState } from 'react';
import { WalletProvider } from './context/WalletContext';
import { Header } from './components/layout/Header';
import { AuctionGrid } from './components/auctions/AuctionGrid';
import { AuctionDetailsModal } from './components/auctions/AuctionDetailsModal';
import { CreateAuctionModal } from './components/auctions/CreateAuctionModal';
import { useAuctions } from './hooks/useAuctions';
import About from './components/about';

function AppContent() {
  const { auctions, loading, refreshAuctions } = useAuctions();
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState(true);

  const handleViewAuction = (auction) => {
    setSelectedAuction(auction);
  };

  const handleCreateAuctionSuccess = () => {
    refreshAuctions();
  };

  return (
   
    <div className="min-h-screen bg-gray-50">
        {
          status ?
            <About setStatus={setStatus} /> :
          <div>
            <Header
              onCreateAuction={() => setShowCreateModal(true)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            <main className="max-w-7xl screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Live Auctions
                </h2>
                <p className="text-gray-600">
                  Discover unique digital collectibles and place your bids
                </p>
              </div>

              <AuctionGrid
                auctions={auctions}
                loading={loading}
                onViewAuction={handleViewAuction}
                searchTerm={searchTerm}
              />
            </main>

            <AuctionDetailsModal
              auction={selectedAuction}
              isOpen={selectedAuction !== null}
              onClose={() => setSelectedAuction(null)}
            />

            <CreateAuctionModal
              isOpen={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              onSuccess={handleCreateAuctionSuccess}
            />
          </div> 
        }
      </div>
  )
}

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;
