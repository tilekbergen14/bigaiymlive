import Image from "next/image";
import styles from "../styles/Home.module.scss";
import {FiDownload} from 'react-icons/fi'
import {MdFavoriteBorder} from 'react-icons/md'

export default function ImageComponent({ image }) {
  return <div className={styles.imageBox}>
    <img src={image} className={styles.img} />
    <div className={styles.imageActions}>
      <FiDownload className={styles.imgIcon}/>
      <MdFavoriteBorder className={styles.imgIcon}/>
    </div>
    </div>
}
