import styles from "../styles/Home.module.scss";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import ImageComponent from "../components/Image";
import Navbar from "../components/Navbar";
import axios from "axios";
import Modal from "../components/Modal";
import { useState } from "react";

export default function Home({ images }) {
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  return (
    <div
      className={styles.homepage}
      style={{ overflowY: "hidden", height: modal && "100vh" }}
    >
      {modal && <Modal imageUrl={imageUrl} setModal={setModal} />}
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
              <ImageComponent
                image={image.url}
                key={image._id}
                modal={modal}
                setModal={setModal}
                setImageUrl={setImageUrl}
              />
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
