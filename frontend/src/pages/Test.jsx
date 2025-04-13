import styles from '../styles/Test.module.css'
import Webcam from "react-webcam";
import React, { useState, useRef, useEffect } from "react";


export default function Test() {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [flashActive, setFlashActive] = useState(false);
    const [showTakeButton, setShowTakeButton] = useState(true)
    const [webcamReady, setWebcamReady] = useState(false);
    const FLASH_DURATION = 400;

    useEffect(() => {
        if (image) {
            const timer = setTimeout(() => {
                setExpanded(prev => !prev);
            }, FLASH_DURATION);

            const fetch = async () => {
                const data = await fetchAgeAndRace(image);
                setData(data)
            };

            fetch();

            return () => clearTimeout(timer);
        }
    }, [image]);

    const takePhoto = async () => {
        // setFlashActive(true);
        capture()
        setShowTakeButton(prev => !prev)
        setTimeout(() => setFlashActive(false), FLASH_DURATION);
        setLoading(true)
        setPhotoTaken(true)
    };

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        },
        [webcamRef]
    );


    return (
        <div className={styles.leftBox}>
        {/* {flashActive && <div className={styles.flashOverlay}></div>} */}
            <div className={styles.webcam}>
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    onUserMedia={() => setWebcamReady(true)}
                    className={`${webcamReady ? styles.fadeInDelayed : styles.fadeOut}`}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px"
                    }}
                />
            </div>
            <div className={styles.takeButtonDiv}>
                <button className={styles.takeButton} onClick={takePhoto}>
                    <p className={`${showTakeButton ? styles.takeButtonTextShown : styles.takeButtonTextHidden}`}>
                        Take Photo
                    </p>
                </button>
            </div>
        </div>
    )
}