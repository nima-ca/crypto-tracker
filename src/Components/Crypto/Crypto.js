import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
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

  const pageHandler = (pageNumber) => {
    setPage(pageNumber);
  };

  const { data, isLoading, hasError, error } = useFetch({
    url: apiAddress,
  });

  const CryptoCardList = () => {
    if (data === undefined) return <Error error={error} />;

    return data.map((crypto) => (
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
  };

  return (
    <div className={styles.container}>
      <Heading page={page} />
      {isLoading && !hasError && <LoadingSpinner />}
      {hasError && <Error error={error} />}
      {!isLoading && !hasError && <CryptoCardList />}
      <Pagination page={page} pageHandler={pageHandler} />
    </div>
  );
};

export default Crypto;
