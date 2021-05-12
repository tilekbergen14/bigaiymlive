import React from "react";
import styles from "./styles/Spinner.module.scss";

export default function Spinner({ size }) {
  return (
    <div
      className={styles.spinner}
      style={{ width: size ? size : 50, height: size ? size : 50 }}
    >
      <div className={styles.first}></div>
      <div className={styles.second}></div>
    </div>
  );
}
