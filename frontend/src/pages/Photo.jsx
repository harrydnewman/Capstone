import React, { useRef } from "react";
import Webcam from "react-webcam";
import styles from "../styles/Photo.module.css";

export default function Photo() {

    const handleClick = () => {
        alert('Button clicked!');
      };
  const webcamRef = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.webcamDiv}>
        <Webcam
          ref={webcamRef}
          style={{
            width: "60%",
            height: "85%",
            objectFit: "cover",
          }}
          className={styles.webcam}
        />
        <div className={styles.takeButtonDiv}>
            <button className={styles.takeButton} onClick={handleClick}>
                <p>Take Photo</p>
            </button>
        </div>
      </div>
      {/* <div className={styles.infoDiv}>
        <h1>Take Photo</h1>
      </div> */}
    </div>

  );
}
