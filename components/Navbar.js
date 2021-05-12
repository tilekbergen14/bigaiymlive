import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles/Navbar.module.scss";

export default function Navbar({ fillNav }) {
  const [changeColor, setChangeColor] = useState(fillNav ? true : false);

  useEffect(() => {
    let mounted = true;
    window.addEventListener("scroll", () => {
      if (window.scrollY < 100) {
        if (mounted) {
          setChangeColor(false);
        }
      } else {
        if (mounted) {
          setChangeColor(true);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <nav
      className={!changeColor ? styles.nav : `${styles.nav} ${styles.active}`}
    >
      <Link href="/">
        <h2 className={styles.logo}>Bigaiym</h2>
      </Link>
      <ul className={styles.lists}>
        <li className={styles.list}>Explore</li>
        <li className={styles.list}>Contact Us</li>
        <Link href="upload-image/">
          <button className={`${styles.list} ${styles.show} button`}>
            Create Image
          </button>
        </Link>
      </ul>
    </nav>
  );
}
