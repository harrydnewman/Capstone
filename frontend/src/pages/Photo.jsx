import React from "react";
import Webcam from "react-webcam";
import styles from '../styles/Photo.module.css'

const videoConstraints = {
    width: 500,
    height: 800,
    facingMode: "user"
  };

export default function Photo() {
    return (
        <div className={styles.photoDiv}>
            <div className={styles.webcamDiv}>
                <Webcam className={styles.webcam} height={800} width={500} videoConstraints={videoConstraints}/>
            </div>
            <div className={styles.infoDiv}>
                <h1>Take Photo</h1>
            </div>
        </div>
    )
}