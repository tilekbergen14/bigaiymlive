import styles from "../styles/Home.module.scss";
import { FiDownload } from "react-icons/fi";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ImageComponent({ image, modal, setModal, setFile }) {
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
    <div className={styles.imageBox}>
      <Image
        src={`${process.env.NEXT_PUBLIC_HOST_ADDRESS}${image.url}`}
        alt="Images"
        height={image.height}
        width={image.width}
        onClick={() => {
          setModal((modal) => !modal);
          setFile(image);
        }}
      />

      <div className={styles.imageActions}>
        <FiDownload className={styles.imgIcon} onClick={handleDownload} />
        {liked ? (
          <MdFavorite className={styles.imgIcon} onClick={handleLike} />
        ) : (
          <MdFavoriteBorder className={styles.imgIcon} onClick={handleLike} />
        )}
      </div>
    </div>
  );
}
