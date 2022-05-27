import styles from "./CryptoCard.module.css";

const CryptoCard = ({ id, name, price, img, dailyChange }) => {
  const dailyChangeClass = dailyChange > 0 ? styles.positive : styles.negative;

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <img src={img} alt="" />
        <p>{id}</p>
      </div>
      <div className={styles.name}>
        <p>{name}</p>
      </div>
      <div className={styles.price}>
        <p>{`Price: ${price}$`}</p>
        <p className={dailyChangeClass}>{`${dailyChange}%`}</p>
      </div>
    </div>
  );
};

export default CryptoCard;
