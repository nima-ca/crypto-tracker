import styles from "./Pagination.module.css";

const Pagination = (props) => {
  return (
    <div className={styles.pagination}>
      <p>Previous</p>
      <p>Next</p>
    </div>
  );
};

export default Pagination;
