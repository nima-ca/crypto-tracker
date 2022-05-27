import styles from "./Heading.module.css";

const Heading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.symbol}>
        <p>#</p>
      </div>
      <div className={styles.name}>
        <p>name</p>
      </div>
      <div className={styles.price}>
        <p>Price</p>
        <p>24h</p>
      </div>
    </div>
  );
};

export default Heading;
