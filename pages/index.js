import styles from "../styles/Home.module.scss";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import ImageComponent from "../components/Image";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Home({ images }) {
  console.log(images);
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
          {images.map((image) => (
            <ImageComponent key={image._id} image={image.url} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps(context) {
  const result = await axios.get(`http://localhost:5000/`);

  return { props: { images: result.data } };
}
