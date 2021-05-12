import React from "react";
import styles from "./styles/Toast.module.scss";

export default function Toast({ error, text, setUploaded }) {
  setTimeout(() => {
    setUploaded(false);
  }, 3000);
  return (
    <div
      className={styles.toast}
      style={{
        background: error ? "#ff304f" : "#14ff84",
        boxShadow: error ? "0 0 10px $error" : "0 0 10px $success",
      }}
    >
      {text ? text : "Toast"}
    </div>
  );
}
