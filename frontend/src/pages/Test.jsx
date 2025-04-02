import React, { useState, useRef, useEffect } from "react";
// import styles from "..styles/Test.module.css";
import styles from '../styles/Test.module.css'
import Webcam from "react-webcam";

export default function Test() {
    const [expanded, setExpanded] = useState(false);
    const [image, setImage] = useState(null)
    const webcamRef = useRef(null);

    useEffect(() => {
        if (image) {
            console.log("Image state updated!", image);
            setExpanded(prev => !prev);
            // You can perform other logic here
        }
    }, [image]);

    const handleClick = () => {
        console.log('Button clicked!');
        capture()
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
                    </div>
                    <div className={styles.takeButtonDiv}>
                        <button className={styles.takeButton} onClick={handleClick}>
                            <p>Take Photo</p>
                        </button>
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
