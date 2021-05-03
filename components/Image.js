import Image from "next/image";
import styles from "../styles/Home.module.scss";

export default function ImageComponent({ image }) {
  return <img src={image} className={styles.image} />;
}
