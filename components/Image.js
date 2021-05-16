import styles from "../styles/Home.module.scss";
import { FiDownload } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";

export default function ImageComponent({ image }) {
  return (
    <div className={styles.imageBox}>
      <img
        src={`${process.env.NEXT_PUBLIC_HOST_ADDRESS}${image}`}
        alt="Images"
        className={styles.img}
      />
      <div className={styles.imageActions}>
        <FiDownload className={styles.imgIcon} />
        <MdFavoriteBorder className={styles.imgIcon} />
      </div>
    </div>
  );
}
