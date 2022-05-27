import CryptoCard from "./CryptoCard";
import styles from "./Crypto.module.css";
import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const apiAddress = `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&interval=1d&per-page=10&page=1`;

const Crypto = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(apiAddress)
      .then((response) => {
        if (!response.ok) {
          setHasError(true);
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setHasError(false);
        setIsLoading(false);
        setCryptoData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(cryptoData);

  return (
    <div className={styles.container}>
      <h1>Crypto-Tracker</h1>
      {cryptoData.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          name={crypto.name}
          id={crypto.id}
          img={crypto["logo_url"]}
          price={crypto.price}
          dailyChange={crypto["1d"]["price_change_pct"]}
        />
      ))}
    </div>
  );
};

export default Crypto;
