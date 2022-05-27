import { useEffect, useState } from "react";
import styles from "./Crypto.module.css";
import CryptoCard from "./CryptoCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import Heading from "../UI/Heading";
import Pagination from "../UI/Pagination";

const apiKey = process.env.REACT_APP_API_KEY;

const Crypto = () => {
  const [page, setPage] = useState(1);
  const apiAddress = `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&interval=1d&per-page=10&page=${page}`;

  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const pageHandler = (pageNumber) => {
    setPage(pageNumber);
  };

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
        setErrorMessage(error.message);
      });
  }, [apiAddress]);
  console.log(cryptoData);

  const CryptoCardList = cryptoData.map((crypto) => (
    <CryptoCard
      key={crypto.id}
      name={crypto.name}
      id={crypto.id}
      img={crypto["logo_url"]}
      price={crypto.price}
      dailyChange={crypto["1d"]["price_change_pct"]}
    />
  ));

  return (
    <div className={styles.container}>
      <h1>Crypto-Tracker</h1>
      <Heading />
      {isLoading && !hasError && <LoadingSpinner />}
      {hasError && <p>{`${errorMessage} 😢😭`}</p>}
      {!isLoading && !hasError && CryptoCardList}
      <Pagination
        page={page}
        pageHandler={pageHandler}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Crypto;
