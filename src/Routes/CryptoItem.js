import useFetch from "../Hooks/useFetch";
import { useParams } from "react-router-dom";
import styles from "./CryptoItem.module.css";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import Error from "../Components/UI/Error";
import NotFound from "../Components/UI/NotFound";

const apiKey = process.env.REACT_APP_API_KEY;

const CryptoItem = () => {
  let { id } = useParams();
  const apiAddress = `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=${id}&interval=1d,7d,30d`;

  const {
    data: fetchedData,
    isLoading,
    hasError,
    error,
  } = useFetch({ url: apiAddress });

  const CryptoTemplate = () => {
    if (fetchedData === undefined) return <Error error={error} />;
    if (fetchedData === null) return <NotFound />;

    const data = { ...fetchedData[0] };
    if (data["1d"] === undefined) return <NotFound />;

    const dailyChange = data["1d"]["price_change_pct"];
    const dailyChangeClass =
      dailyChange > 0 ? styles.positive : styles.negative;

    const weeklyChange = data["7d"]["price_change_pct"];
    const weeklyChangeClass =
      weeklyChange > 0 ? styles.positive : styles.negative;

    const monthlyChange = data["30d"]["price_change_pct"];
    const monthlyChangeClass =
      monthlyChange > 0 ? styles.positive : styles.negative;

    return (
      <div className={styles.container}>
        <h2 className={styles.name}>{data.name}</h2>
        <div className={styles.card}>
          <div className={styles.icon}>
            <img src={data["logo_url"]} alt="" />
            <h2>{id}</h2>
          </div>
          <p>{`Rank: ${data.rank}`}</p>
          <p>{`Price: ${data.price}$`}</p>
          <p className={dailyChangeClass}>{`24h: ${dailyChange}%`}</p>
          <p className={weeklyChangeClass}>{`7d: ${weeklyChange}%`}</p>
          <p className={monthlyChangeClass}>{`30d: ${monthlyChange}%`}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      {isLoading && !hasError && <LoadingSpinner />}
      {hasError && <Error error={error} />}
      {!isLoading && !hasError && <CryptoTemplate />}
    </>
  );
};

export default CryptoItem;
