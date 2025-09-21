import React, { createContext, useContext, useEffect, useReducer } from 'react';

const WalletContext = createContext(undefined);

const initialState = {
  connected: false,
  account: null,
  balance: '0',
  chainId: null,
  isLoading: false,
  error: null,
};

function walletReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_WALLET':
      return { ...state, ...action.payload, connected: true, error: null };
    case 'DISCONNECT':
      return { ...initialState };
    default:
      return state;
  }
}

export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const connect = async () => {
    if (!window.ethereum) {
      dispatch({ type: 'SET_ERROR', payload: 'MetaMask not detected' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });

      dispatch({
        type: 'SET_WALLET',
        payload: {
          account: accounts[0],
          chainId: parseInt(chainId, 16),
          balance: (parseInt(balance, 16) / 1e18).toFixed(4),
        }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const disconnect = () => {
    dispatch({ type: 'DISCONNECT' });
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          dispatch({ type: 'SET_WALLET', payload: { account: accounts[0] } });
        }
      };

      const handleChainChanged = (chainId) => {
        dispatch({ type: 'SET_WALLET', payload: { chainId: parseInt(chainId, 16) } });
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
