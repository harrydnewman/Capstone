import React from "react";
import Webcam from "react-webcam";
import styles from '../styles/Photo.module.css'

export default function Photo() {
    return (
        <div className={styles.photoDiv}>
            {/* <h1>Photo!!</h1> */}
            <Webcam className={styles.webcam}/>
        </div>


    )
}