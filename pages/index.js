import styles from "../styles/Home.module.scss";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import ImageComponent from "../components/Image";
import Navbar from "../components/Navbar";
import axios from "axios";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

export default function Home({ dfImages }) {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(dfImages);
  const [count, setCount] = useState(10);
  useEffect(() => {
    let mounted = true;
    window.addEventListener("scroll", async () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom && mounted) {
        setLoading(true);
        try {
          const result = await axios.get(
            `${process.env.NEXT_PUBLIC_HOST_ADDRESS}?photos=${count}`
          );
          if (result && mounted) {
            setImages([...images, ...result.data]);
            setCount((count) => count + result.data.length);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div
      className={styles.homepage}
      style={{ overflowY: "hidden", height: modal && "100vh" }}
    >
      {modal && <Modal image={file} setModal={setModal} />}
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
                image={image}
                key={image._id}
                modal={modal}
                setModal={setModal}
                setFile={setFile}
              />
            ))}
        </div>
        <div className="flex justify-center m-16">{loading && <Spinner />}</div>
      </section>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const result = await axios.get(process.env.NEXT_PUBLIC_HOST_ADDRESS);
    return { props: { dfImages: result.data } };
  } catch (err) {
    return { props: { dfImages: [] } };
  }
}
