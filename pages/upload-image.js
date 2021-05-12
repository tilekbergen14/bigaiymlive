import styles from "../styles/UploadImage.module.scss";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import Backdrop from "../components/Backdrop";
import Toast from "../components/Toast";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

export default function uploadImage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags);
    if (file) {
      setLoading(true);
      try {
        const result = await axios.post(
          "http://localhost:5000/upload",
          formData
        );
        if (result) {
          setLoading(false);
          setUploaded(true);
          setError(null);
        }
      } catch (err) {
        setLoading(false);
        setUploaded(true);
        setError(err.response.data);
      }
    } else {
      setUploaded(true);
      setError("Please select image!");
    }
  };
  return (
    <div className={styles.body}>
      {loading && <Backdrop />}
      {uploaded &&
        (error ? (
          <Toast setUploaded={setUploaded} text={error} error />
        ) : (
          <Toast setUploaded={setUploaded} text="Image uploaded succesfully!" />
        ))}
      <Navbar fillNav={true} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="file"
          id="imageInput"
          onChange={(e) => setFile(e.target.files[0])}
          className={styles.displaynone}
        />
        <div className={styles.imageInput}>
          <label htmlFor="imageInput">
            <FcAddImage className={styles.imageIcon} />
          </label>
          <label htmlFor="imageInput">
            <p className={styles.imageText}>
              {file ? file.name : "No image choosen"}
            </p>
          </label>
        </div>
        <p className={styles.tags}>Tags</p>
        <input
          type="text"
          placeholder="Example: nature city love ..."
          className={styles.tagsInput}
          onChange={(e) => setTags(e.target.value)}
        />
        <button className={`${styles.button}`}>Upload image</button>
      </form>

      <Link href="/">
        <button className={`${styles.button} ${styles.backButton}`}>
          <BiArrowBack className={styles.icon} />
          Back to Homepage
        </button>
      </Link>
    </div>
  );
}
