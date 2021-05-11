import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";

export default function Navbar() {
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
    <nav
      className={!changeColor ? styles.nav : `${styles.nav} ${styles.active}`}
    >
      <h2 className={styles.logo}>Bigaiym</h2>
      <ul className={styles.lists}>
        <li className={styles.list}>Explore</li>
        <li className={styles.list}>Contact Us</li>
        <Link href="upload-image/">
          <button className={`${styles.list} button`}>Login</button>
        </Link>
      </ul>
    </nav>
  );
}
