import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles/Navbar.module.scss";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar({ fillNav, getUser }) {
  const [changeColor, setChangeColor] = useState(false);
  const [user, setUser] = useState(getUser);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    let mounted = true;
    if (!fillNav) {
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
    } else {
      setChangeColor(true);
    }
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
        <Link href={user ? "upload-image/" : "auth"}>
          <div>
            <MdAccountCircle className={styles.accountIcon} />
          </div>
        </Link>
        <Link href={user ? "upload-image/" : "auth"}>
          <button className={`${styles.list} button ${styles.hide}`}>
            Create Image
          </button>
        </Link>
      </ul>
    </nav>
  );
}
