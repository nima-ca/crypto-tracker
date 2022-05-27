import styles from "./CryptoCard.module.css";

const CryptoCard = ({ currency, name, price, img }) => {
  return (
    <div className={styles.card}>
      <div>
        <img src={img} alt="" />
        <p>btc</p>
      </div>
      <p>bitcoin</p>
      <p>{`Price: ${123}$`}</p>
    </div>
  );
};

export default CryptoCard;
