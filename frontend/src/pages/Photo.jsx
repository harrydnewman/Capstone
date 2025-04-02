import React, { useRef } from "react";
import Webcam from "react-webcam";
import styles from "../styles/Photo.module.css";

export default function Photo() {
  const webcamRef = useRef(null);

  return (
    <div className={styles.photoDiv}>
      <div className={styles.webcamDiv}>
        <Webcam
          ref={webcamRef}
          style={{
            width: "60%",
            height: "80%",
            objectFit: "cover",
          }}
          className={styles.webcam}
        />
      </div>
      <div className={styles.infoDiv}>
        <h1>Take Photo</h1>
      </div>
    </div>
  );
}
