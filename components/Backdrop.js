import React from "react";
import styles from "./styles/Backdrop.module.scss";
import Spinner from "./Spinner";

export default function Backdrop() {
  return (
    <div className={styles.backdrop}>
      <Spinner />
    </div>
  );
}
