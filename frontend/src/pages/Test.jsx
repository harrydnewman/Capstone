import React, { useState, useRef } from "react";
// import styles from "..styles/Test.module.css";
import styles from '../styles/Test.module.css'
import Webcam from "react-webcam";

export default function Test() {
    const [expanded, setExpanded] = useState(false);
    const webcamRef = useRef(null);

    const handleClick = () => {
        console.log('Button clicked!');
        setExpanded(!expanded)
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.box} ${expanded ? styles.leftCollapsed : styles.leftExpanded}`}>
                {/* <button onClick={() => handleClick()}>Toggle</button> */}
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
            </div>
            <div className={`${styles.box} ${expanded ? styles.rightExpanded : styles.rightCollapsed}`}>
                <p>This div expands!</p>
            </div>
        </div>
    );
}
