import styles from "../styles/Home.module.scss";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageComponent from "../components/Image";

export default function Home() {
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 100) {
        setChangeColor(false);
      } else {
        setChangeColor(true);
      }
    });
  }, []);

  return (
    <div className={styles.homepage}>
      <header className={styles.header}>
        <Image
          alt="header background"
          src="/city2.jpg"
          layout="fill"
          className={styles.background}
        />
        <nav
          className={
            !changeColor ? styles.nav : `${styles.nav} ${styles.active}`
          }
        >
          <h2 className={styles.logo}>Bigaiym</h2>
          <ul className={styles.lists}>
            <li className={styles.list}>Explore</li>
            <li className={styles.list}>Contact Us</li>
            <button className={`${styles.list} button`}>Login</button>
          </ul>
        </nav>
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
        <h3>Photos</h3>
        <div className={styles.images}>
          <ImageComponent image="/city2.jpg" />
          <ImageComponent image="/boywithbike.jpg" />
          <ImageComponent image="/nightsky.png" />
        </div>
      </section>
    </div>
  );
}
