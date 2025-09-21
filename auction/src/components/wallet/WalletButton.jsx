import React from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { shortAddress } from '../../utils/format';
import { Button } from '../ui/Button';

export const WalletButton = () => {
  const { connected, account, balance, connect, disconnect, isLoading } = useWallet();

  if (connected && account) {
    return (
      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex flex-col items-end text-sm">
          <span className="text-gray-600">{shortAddress(account)}</span>
          <span className="text-xs text-gray-500">{balance} ETH</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnect}
          className="flex items-center space-x-1"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Disconnect</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      loading={isLoading}
      className="flex items-center space-x-2"
    >
      <Wallet className="w-4 h-4" />
      <span>Connect Wallet</span>
    </Button>
  );
};
