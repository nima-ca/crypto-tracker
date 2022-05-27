import CryptoCard from "./CryptoCard";
import styles from "./Crypto.module.css";

const Crypto = () => {
  return (
    <div className={styles.container}>
      <h1>Crypto-Tracker</h1>
      <CryptoCard />
    </div>
  );
};

export default Crypto;
