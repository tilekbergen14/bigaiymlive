import styles from "../styles/Home.module.scss";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import ImageComponent from "../components/Image";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Home({ images }) {
  return (
    <div className={styles.homepage}>
      <header className={styles.header}>
        <Image
          alt="header background"
          src="/city2.jpg"
          layout="fill"
          className={styles.background}
        />
        <Navbar />
        <div className={styles.headerBox}>
          <h1 className={styles.headerText}>
            The best free stock photos and videos shared by talented creators.
          </h1>
          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              placeholder="Search for free photos and videos"
            />
            <FaSearch className={styles.icon} />
          </div>
        </div>
      </header>
      <section className={styles.body}>
        <h3 className="title">Photos</h3>
        <div className={styles.images}>
          {images &&
            images.map((image) => (
              <ImageComponent image={image.url} key={image._id} />
            ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const result = await axios.get(process.env.NEXT_PUBLIC_HOST_ADDRESS);
    return { props: { images: result.data } };
  } catch (err) {
    return { props: { images: null } };
  }
}
