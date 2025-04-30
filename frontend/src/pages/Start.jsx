import styles from '../styles/Start.module.css'
import Webcam from "react-webcam";
import { useState, useRef } from "react";
import Button from '../components/Button';
import PropTypes from "prop-types";

export default function Start({ onPhotoCaptured }) {
      const webcamRef           = useRef(null);
  const [flashActive, setFlashActive] = useState(false);

    const FLASH_DURATION = 400;

    const takePhoto = async () => {
    setFlashActive(true);
    const imageSrc = webcamRef.current.getScreenshot();
    
    setTimeout(() => {
        setFlashActive(false)
        if (onPhotoCaptured) {
            onPhotoCaptured(imageSrc); // base64 image string
        }
    }, FLASH_DURATION);
};


    return (
        <div className={styles.main}>
        {flashActive && <div className={styles.flashOverlay}></div>}
            {/* <h1>New Start</h1> */}
            <div className={styles.webcamDiv}>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            </div>
            <div className={styles.buttonWrapper}>
            <Button onClick={takePhoto} text={"Take Photo"}/>
              
            </div>
        </div>
    )
}

Start.propTypes = {
    onPhotoCaptured: PropTypes.func,
};
