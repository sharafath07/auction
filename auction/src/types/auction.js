/**
 * @typedef {Object} Auction
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} seller
 * @property {string} startingBid
 * @property {string} currentBid
 * @property {string} highestBidder
 * @property {number} endTime
 * @property {boolean} ended
 * @property {boolean} cancelled
 */

/**
 * @typedef {Object} Bid
 * @property {string} bidder
 * @property {string} amount
 * @property {number} timestamp
 * @property {string} transactionHash
 */

/**
 * @typedef {Object} WalletState
 * @property {boolean} connected
 * @property {string|null} account
 * @property {string} balance
 * @property {number|null} chainId
 */

/**
 * @typedef {Object} CreateAuctionData
 * @property {string} title
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} startingBid
 * @property {number} duration
 */
