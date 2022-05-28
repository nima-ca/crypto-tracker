import { useEffect, useState } from "react";
import styles from "./Crypto.module.css";
import CryptoCard from "./CryptoCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import Error from "../UI/Error";
import Heading from "../UI/Heading";
import Pagination from "../UI/Pagination";
import { Link } from "react-router-dom";

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
          setErrorMessage(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setHasError(false);
        setIsLoading(false);
        setCryptoData(data);
      });
  }, [apiAddress]);
  console.log(cryptoData);

  const CryptoCardList = cryptoData.map((crypto) => (
    <Link
      style={{ textDecoration: "none" }}
      to={`/${crypto.symbol}`}
      key={crypto.id}
    >
      <CryptoCard
        key={crypto.id}
        name={crypto.name}
        id={crypto.id}
        img={crypto["logo_url"]}
        price={crypto.price}
        dailyChange={crypto["1d"]["price_change_pct"]}
      />
    </Link>
  ));

  return (
    <div className={styles.container}>
      <Heading page={page} />
      {isLoading && !hasError && <LoadingSpinner />}
      {hasError && <Error error={errorMessage} />}
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
