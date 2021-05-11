import React from "react";
import styles from "../styles/UploadImage.module.scss";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";

export default function uploadImage() {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log("sending");
    axios.post("http://localhost:5000/single/", formData);
  };
  return (
    <div className={styles.body}>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="button">Upload image</button>
      </form>
    </div>
  );
}
