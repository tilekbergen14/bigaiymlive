import React from "react";
import styles from "./styles/Modal.module.scss";
import Image from "next/image";

export default function Modal({ imageUrl, setModal }) {
  return (
    <div className={styles.body} onClick={() => setModal(false)}>
      <div className={styles.modal}>
        <Image
          src={`${process.env.NEXT_PUBLIC_HOST_ADDRESS}${imageUrl}`}
          height={500}
          width={500}
        />
      </div>
    </div>
  );
}
