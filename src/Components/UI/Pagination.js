import styles from "./Pagination.module.css";
import React, { useState } from "react";

const Pagination = ({ page, pageHandler, setIsLoading }) => {
  console.log(page);

  const increasePageNumber = () => {
    if (page === 30) return;
    pageHandler(page + 1);
    setIsLoading(true);
  };

  const decreasePageNumber = () => {
    if (page === 1) return;
    pageHandler(page - 1);
    setIsLoading(true);
  };

  return (
    <div className={styles.pagination}>
      <button onClick={decreasePageNumber}>Previous</button>
      <button onClick={increasePageNumber}>Next</button>
    </div>
  );
};

export default Pagination;
