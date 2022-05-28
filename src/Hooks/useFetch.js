import { useState, useEffect } from "react";

const useFetch = ({ url }) => {
  const [data, setData] = useState([]);
  const [isLoading, setISLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setISLoading(true);
    setHasError(false);
    setError("");
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError(
            `This is an http error: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((data) => {
        setData(data);
        setISLoading(false);
      })
      .catch((error) => {
        setHasError(error);
        setISLoading(false);
      });
  }, [url]);

  return {
    data,
    isLoading,
    hasError,
    error,
  };
};

export default useFetch;
