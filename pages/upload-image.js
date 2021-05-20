import styles from "../styles/UploadImage.module.scss";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { FcAddImage } from "react-icons/fc";
import Backdrop from "../components/Backdrop";
import Toast from "../components/Toast";
import Link from "next/link";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../components/Spinner";

export default function uploadImage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [tags, setTags] = useState("");
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImgs, setLoadingImgs] = useState(false);

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_ADDRESS}delete/${id}`
      );
      setImages((images) => images.filter((image) => image._id !== id));
      setLoading(false);
      setUploaded(true);
      setError(result.data);
    } catch (err) {
      setError(err.response.data ? err.response.data : "No idea");
    }
  };
  const getUserImages = async () => {
    if (user) {
      try {
        if (images.length === 0) {
          setLoadingImgs(true);
        }
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST_ADDRESS}${user.id}`
        );
        setImages(result.data);
        setLoadingImgs(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags);
    formData.append("token", user.token);
    if (file) {
      setLoading(true);
      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_ADDRESS}upload`,
          formData
        );
        if (result) {
          setImages([...images, result.data]);
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
      <Navbar fillNav={true} />
      <div className="container">
        {uploaded &&
          (error ? (
            <Toast setUploaded={setUploaded} text={error} error />
          ) : (
            <Toast
              setUploaded={setUploaded}
              text="Image uploaded succesfully!"
            />
          ))}
        <div className={styles.createImage}>
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
            <button className={`btn`}>Upload image</button>
          </form>

          <div className={styles.mt20}></div>
          <Link href="/">
            <button className={`btn ${styles.backButton}`}>
              Back to Homepage
            </button>
          </Link>

          <button
            onClick={getUserImages}
            className={`btn ${styles.backButton}`}
          >
            {images.length > 0 ? "Refresh" : "Show my images"}
          </button>
        </div>
        {loadingImgs && (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )}
        <div className={styles.gallery}>
          {images.length > 0 &&
            images.map((image) => (
              <div className={styles.imageBox} key={image._id}>
                <Image
                  height={image.height}
                  width={image.width}
                  src={`${process.env.NEXT_PUBLIC_HOST_ADDRESS}${image.url}`}
                />
                <div
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(image._id)}
                >
                  <AiFillDelete className={styles.trashIcon} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
