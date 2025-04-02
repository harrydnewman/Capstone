import React, { useState, useRef, useEffect } from "react";
// import styles from "..styles/Test.module.css";
import styles from '../styles/Test.module.css'
import Webcam from "react-webcam";

export default function Test() {
    const [expanded, setExpanded] = useState(false);
    const [showTakeButton, setShowTakeButton] = useState(true)
    const [image, setImage] = useState(null);
    const [flashActive, setFlashActive] = useState(false);
    const webcamRef = useRef(null);

    const FLASH_DURATION = 400;

useEffect(() => {
    if (image) {
        const timer = setTimeout(() => {
            setExpanded(prev => !prev);
            
        }, FLASH_DURATION);
        return () => clearTimeout(timer);
    }
}, [image]);


    const handleClick = () => {
        console.log('Button clicked!');
        setFlashActive(true);
        capture()
        setShowTakeButton(prev => !prev)
        setTimeout(() => setFlashActive(false), FLASH_DURATION);
    };
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            console.log(imageSrc)
        },
        [webcamRef]
    );

    return (
        <div className={styles.container}>
            <div className={`${styles.box} ${expanded ? styles.leftCollapsed : styles.leftExpanded}`}>
                {flashActive && <div className={styles.flashOverlay}></div>}
                {/* <button onClick={() => handleClick()}>Toggle</button> */}
                <div className={styles.webcamDiv}>
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/png"

                        style={{
                            width: "60%",
                            height: "85%",
                            objectFit: "cover",
                        }}
                        className={styles.webcam}
                    />
                <div className={`${styles.takeButtonDiv} ${showTakeButton ? styles.takeButtonShown : styles.takeButtonHidden}`}>
                {/* <div className={styles.takeButtonDiv}> */}
                    <button className={styles.takeButton} onClick={handleClick}>
                        <p className={`${showTakeButton ? styles.takeButtonTextShown : styles.takeButtonTextHidden}`}>Take Photo</p>
                    </button>
                </div>
                
                </div>
            </div>
            <div className={`${styles.box} ${expanded ? styles.rightExpanded : styles.rightCollapsed}`}>
                <p>This div expands!</p>
                {image && (
                    <img src={image} alt="Captured" style={{ width: '100%', maxWidth: '300px' }} />
                )}
            </div>
        </div>
    );
}
