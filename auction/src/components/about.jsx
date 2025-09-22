// About.jsx
import React from "react";

const About = ({setStatus}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About CryptoAuction</h1>

      <div style={styles.card}>
        <img
          src="https://www.cyberbahnit.com/wp-content/uploads/2017/11/blockchain.jpg" // replace with your own image
          alt="Crypto Auction"
          style={styles.image}
        />
        <div style={styles.content}>
          <h2 style={styles.title}>Our Idea</h2>
          <p style={styles.text}>
            Crypto Auction is an innovative online auction platform where
            traditional money is replaced with cryptocurrencies like Bitcoin,
            Ethereum, and more. Sellers list their items, and buyers compete by
            placing bids in crypto. The highest bid at the end wins, making the
            process fair, transparent, and global.
          </p>

          <h3 style={styles.subtitle}>Why We Built This</h3>
          <ul style={styles.list}>
            <li>To make auctions borderless and accessible worldwide.</li>
            <li>To leverage the transparency and security of blockchain.</li>
            <li>To support modern digital assets like NFTs and collectibles.</li>
            <li>To create faster, trustless, and decentralized transactions.</li>
          </ul>

          <h3 style={styles.subtitle}>Future Features</h3>
          <ul style={styles.list}>
            <li>Smart contract–powered decentralized auctions.</li>
            <li>Multi-chain support (Ethereum, Polygon, Solana, etc.).</li>
            <li>Wallet integration (MetaMask, Trust Wallet, etc.).</li>
            <li>Escrow system for secure transactions.</li>
            <li>Expansion into NFT marketplace auctions.</li>
          </ul>

            <button style={styles.button} onClick={()=> setStatus(false)}>Go to Website</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  heading: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "40px",
    color: "#5c2ee2",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
    padding: "20px",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    marginRight: "20px",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "15px",
    color: "#5c2ee2",
  },
  subtitle: {
    fontSize: "1.3rem",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#5c2ee2",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "10px",
    lineHeight: "1.6",
  },
  list: {
    fontSize: "1rem",
    paddingLeft: "20px",
    marginBottom: "10px",
  },
  button: {
    marginTop: "20px",
    background: "linear-gradient(90deg, #5c2ee2, #a445ed)",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default About;
