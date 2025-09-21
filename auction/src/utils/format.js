/**
 * Shortens an Ethereum address for display
 */
export const shortAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Formats time remaining in human-readable format
 */
export const formatTimeLeft = (endTime) => {
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = endTime - now;

  if (timeLeft <= 0) return 'Auction ended';

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

/**
 * Formats ETH amount for display
 */
export const formatEth = (wei) => {
  const eth = parseFloat(wei) / 1e18;
  return eth.toFixed(4);
};

/**
 * Converts ETH to Wei
 */
export const toWei = (eth) => {
  return (parseFloat(eth) * 1e18).toString();
};

/**
 * Formats timestamp to readable date
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString();
};

/**
 * Gets Shardeum explorer link for transaction
 */
export const getExplorerLink = (txHash) => {
  return `https://explorer-sphinx.shardeum.org/transaction/${txHash}`;
};

/**
 * Checks if auction is ending soon (within 24 hours)
 */
export const isEndingSoon = (endTime) => {
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = endTime - now;
  return timeLeft > 0 && timeLeft <= 86400; // 24 hours
};

/**
 * Validates Ethereum address
 */
export const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Validates ETH amount
 */
export const isValidEthAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};
