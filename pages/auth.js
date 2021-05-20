import styles from "../styles/Auth.module.scss";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import Backdrop from "../components/Backdrop";
import { useRouter } from "next/router";

export default function uploadImage() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const handleSubmit = async () => {
    if (login || data.password === data.password2) {
      try {
        setLoading(true);
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_ADDRESS}${
            login ? "login" : "register"
          }`,
          login ? { username: data.username, password: data.password } : data
        );
        if (result) {
          localStorage.setItem("user", JSON.stringify(result.data));
          router.push("/");
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
      }
    } else {
      setError("Passwords doesn't match!");
    }
  };
  return (
    <div className={styles.body}>
      {loading && <Backdrop />}
      <Navbar fillNav={true} />
      <div className={styles.inputBox}>
        <div className={styles.lockIcon}>
          <AiFillLock className={styles.icon} />
        </div>
        <p className={styles.label}>Username</p>

        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <p className={styles.label}>Password</p>
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        {!login && (
          <>
            <p className={styles.label}>Confirm password</p>
            <input
              type="password"
              placeholder="Confirm password"
              className={styles.input}
              onChange={(e) => setData({ ...data, password2: e.target.value })}
            />
          </>
        )}
        <p className={styles.error}>{error && error}</p>
        <button className="btn" onClick={handleSubmit}>
          {login ? "Login" : "Sign up"}
        </button>
        <button className={`${styles.backBtn} btn`}>Back</button>
      </div>
      <footer className={styles.footer}>
        {login ? "Don't have an account? " : "Already have an account?"}{" "}
        <span
          className={styles.link}
          onClick={() => setLogin((login) => !login)}
        >
          {login ? "Sign up" : "Login"}
        </span>
      </footer>
    </div>
  );
}
