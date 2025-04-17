import styles from '../styles/NewStart.module.css'
import Webcam from "react-webcam";
import React, { useState, useRef, useEffect } from "react";
import Button from '../components/Button';

export default function NewStart({ onPhotoCaptured }) {
    const [expanded, setExpanded] = useState(false);
    const [showTakeButton, setShowTakeButton] = useState(true)
    const [image, setImage] = useState(null);
    const [flashActive, setFlashActive] = useState(false);
    const [loading, setLoading] = useState(null);
    const [photoTaken, setPhotoTaken] = useState(false);
    const [data, setData] = useState(null)
    const [ageRange, setAgeRange] = useState(null)
    const [race, setRace] = useState(null)
    const [showOnlineDataButton, setShowOnlineDataButton] = useState(false)
    const [onlineData, setOnlineData] = useState(null)
    const [webcamReady, setWebcamReady] = useState(false);
    const [hold, setHold] = useState(false);
    const [animateAgeRange, setAnimateAgeRange] = useState(false);
    const [animateRace, setAnimateRace] = useState(false);
    const webcamRef = useRef(null);

    const FLASH_DURATION = 400;


    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        },
        [webcamRef]
    );

    const takePhoto = async () => {
    setFlashActive(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    
    setShowTakeButton(prev => !prev);
    setTimeout(() => {
        setFlashActive(false)
        if (onPhotoCaptured) {
            onPhotoCaptured(imageSrc); // base64 image string
        }
    }, FLASH_DURATION);
    setLoading(true);
    setPhotoTaken(true);
};


    return (
        <div className={styles.main}>
        {flashActive && <div className={styles.flashOverlay}></div>}
            {/* <h1>New Start</h1> */}
            <div className={styles.webcamDiv}>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                onUserMedia={() => setWebcamReady(true)}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            </div>
            <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={takePhoto}>
                Take Photo
            </button>
              
            </div>
        </div>
    )
}