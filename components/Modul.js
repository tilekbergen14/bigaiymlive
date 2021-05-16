import image from "next/image";
import React from "react";
import styles from "./styles/Modul.module.scss";

export default function Modul({ url }) {
  console.log("hello");
  if (url) {
    return (
      <div className={styles.modul}>
        <div className={styles.imgBox}>
          <img
            className={styles.img}
            src={`${process.env.NEXT_PUBLIC_HOST_ADDRESS}${url}`}
          />
        </div>
      </div>
    );
  }
}
