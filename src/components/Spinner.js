import React from "react";
import styles from "../styles/Spinner.module.css";

const Spinner = () => {
  return (
    <div className="align-items-center text-center">
      <span className={styles.loader}></span>
    </div>
  );
};

export default Spinner;
