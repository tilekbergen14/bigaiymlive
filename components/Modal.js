import React from "react";
import styles from "./styles/Modal.module.scss";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFileDownload, MdCancel } from "react-icons/md";
import axios from "axios";

export default function Modal({ image, setModal }) {
  const [user, setUser] = useState(null);
  const [localUser, setLocalUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(image.likes);
  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setLocalUser(getUser);
    if (likes.includes(getUser.id)) {
      setLiked(true);
    }
  }, []);

  const handleDownload = () => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_HOST_ADDRESS}${image.url}`,
    })
      .then((response) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );
        link.download = image.url;

        document.body.appendChild(link);

        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => {});
  };

  const handleLike = async () => {
    setLiked((liked) => !liked);
    if (!likes.includes(localUser.id)) {
      setLikes([...likes, localUser.id]);
    } else {
      setLikes(likes.filter((like) => like !== localUser.id));
    }
    image.likes.toggle;
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_ADDRESS}like/${image._id}`,
      localUser
    );
  };

  return (
    <div className={styles.body}>
      <div className="container">
        <div className={styles.modal}>
          <div className={styles.top}>
            <div className={`flex align-center`}>
              {user ? (
                <Image
                  height={50}
                  width={50}
                  className="profile-img radius-50"
                />
              ) : (
                <FaRegUserCircle className="medium-icon radius-50" />
              )}
              <p className="user-name">Mukhmet Tilekbergen</p>
            </div>
            <div className={`flex ${styles.buttons}`}>
              <button
                className={`btn button ${liked && "btn-red"}`}
                onClick={handleLike}
              >
                <MdFavoriteBorder className="icon" />
                {likes.length} {likes.length > 1 ? "Likes" : "Like"}
              </button>

              <button className="btn" onClick={handleDownload}>
                <MdFileDownload className="icon" />
                Download
              </button>
            </div>
          </div>
          <div className="flex-center">
            <div className={styles.imageBox}>
              <img
                src={`${process.env.NEXT_PUBLIC_HOST_ADDRESS}${image.url}`}
                className={styles.img}
              />
            </div>
          </div>
          <MdCancel
            className={`medium-icon ${styles.backIcon}`}
            onClick={() => setModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
