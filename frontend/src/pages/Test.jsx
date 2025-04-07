import React, { useState, useRef, useEffect } from "react";
// import styles from "..styles/Test.module.css";
import styles from '../styles/Test.module.css'
import Webcam from "react-webcam";
import Spinner from "../components/Spinner";
import fetchAgeAndRace from "../api/fetchAgeAndRace";
import LittleSpinner from "../components/littleSpinner";

export default function Test() {
    const [expanded, setExpanded] = useState(false);
    const [rightFullExpanded, setRightFullExpanded] = useState(false)
    const [showTakeButton, setShowTakeButton] = useState(true)
    const [image, setImage] = useState(null);
    const [flashActive, setFlashActive] = useState(false);
    const webcamRef = useRef(null);
    const [loading, setLoading] = useState(null);
    const [photoTaken, setPhotoTaken] = useState(false);
    const [data, setData] = useState(null)
    const [ageRange, setAgeRange] = useState(null)
    const [ageAccuracy, setAgeAccuracy] = useState(null)
    const [race, setRace] = useState(null)
    const [showOnlineDataButton, setShowOnlineDataButton] = useState(false)
    const [onlineData, setOnlineData] = useState(null)
    const [hold, setHold] = useState(false) //idk if I want to change this yet


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

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
        if (data) {

            // setAgeRange(data.ageRange)
            // setAgeAccuracy(data.ageAccuracy)
            // setRace(data.raceClassification)

            const ageRangeTimeout = setTimeout(() => setAgeRange(data.ageRange), 2000);
            const ageAccuracyTimeout = setTimeout(() => setAgeAccuracy(data.ageAccuracy), 3000);
            const raceTimeout = setTimeout(() => setRace(data.raceClassification), 4000);
            const showButtonTimeout = setTimeout(() => setShowOnlineDataButton(true), 6000);
            const onlineDataTimeout = setTimeout(() => setOnlineData("This is still in development"), 15000);

            // Cleanup function
            return () => {
                clearTimeout(ageRangeTimeout);
                clearTimeout(ageAccuracyTimeout);
                clearTimeout(raceTimeout);
                clearTimeout(showButtonTimeout);
                clearTimeout(onlineDataTimeout);
            };
        }
    }, [data]);

    const rightClass = expanded
        ? (data && !loading && hold ? styles.rightFullExpanded : styles.rightExpanded)
        : styles.rightCollapsed;

    const rightBoxClassName = [
        styles.box,
        rightClass,
    ].filter(Boolean).join(' ');

    const leftClass = expanded
        ? (data && !loading && hold ? styles.leftFullCollapsed : styles.leftCollapsed)
        : styles.leftExpanded;

    const leftBoxClassName = [
        styles.box,
        leftClass,
    ].filter(Boolean).join(' ');



    const takePhoto = async () => {
        setFlashActive(true);
        capture()
        setShowTakeButton(prev => !prev)
        setTimeout(() => setFlashActive(false), FLASH_DURATION);
        setLoading(true)
        setPhotoTaken(true)
    };

    const whereYouShowUpOnlineClick = () => {
        console.log("Where you show up online")

        // not done yet
    };

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        },
        [webcamRef]
    );

    return (
        <div className={styles.container}>
            {/* <div className={`${styles.box} ${expanded ? styles.leftCollapsed : styles.leftExpanded}`}> */}
            <div className={leftBoxClassName}>
                {flashActive && <div className={styles.flashOverlay}></div>}
                {/* <button onClick={() => handleClick()}>Toggle</button> */}
                <div className={styles.webcamDiv}>
                    {photoTaken ? (
                        <img src={image} alt="Captured" style={{
                            width: "60%",
                            height: "85%",
                            objectFit: "cover",
                        }} />
                    ) : (
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
                    )}

                    <div className={`${styles.takeButtonDiv} ${showTakeButton ? styles.takeButtonShown : styles.takeButtonHidden}`}>
                        {/* <div className={styles.takeButtonDiv}> */}
                        <button className={styles.takeButton} onClick={takePhoto}>
                            <p className={`${showTakeButton ? styles.takeButtonTextShown : styles.takeButtonTextHidden}`}>Take Photo</p>
                        </button>
                    </div>

                </div>
            </div>
            {/* <div className={`${styles.box} ${expanded ? styles.rightExpanded : styles.rightCollapsed}`}> */}
            <div className={rightBoxClassName}>
                {loading ?
                    <Spinner />
                    :
                    <div className={styles.resultsDiv}>
                        {ageRange !== null && (
                            <div className={styles.resultsSection}>
                                <p className={styles.resultsHeader}>Estimated Age Range</p>
                                <p className={styles.resultsText}><strong>{ageRange}</strong></p>
                            </div>
                        )}

                        {ageAccuracy !== null && (
                            <div className={styles.resultsSection}>
                                <p className={styles.resultsHeader}>Age Detection Confidence</p>
                                <p className={styles.resultsText}><strong>{ageAccuracy}</strong></p>
                            </div>
                        )}

                        {race !== null && (
                            <div className={styles.resultsSection}>
                                <p className={styles.resultsHeader}>Identified Race</p>
                                <p className={styles.resultsText}><strong>{race}</strong></p>
                            </div>
                        )}

                        {showOnlineDataButton && (
                           
                            

                                <div className={`${styles.whereYouShowUpOnlineButtonDiv} ${onlineData != null ? styles.expandOnHover : ''}`}>
                                <p className={styles.resultsHeader}>Where You Show Up Online</p>
                                <button className={styles.whereYouShowUpOnlineButton} onClick={onlineData != null ? whereYouShowUpOnlineClick : undefined}>
                                        {onlineData != null ?
                                            <p className={`${showOnlineDataButton ? styles.whereYouShowUpOnlineButtonTextShown : styles.whereYouShowUpOnlineButtonTextHidden}`}>Loaded</p>
                                            :
                                            <div className={styles.loadingOnlineDataButtonDiv}>

                                                <p className={`${showOnlineDataButton ? styles.whereYouShowUpOnlineButtonTextShown : styles.whereYouShowUpOnlineButtonTextHidden}`}>Loading</p>
                                                <LittleSpinner />
                                            </div> 
                                        }
                                    </button>
                                </div>
                            
                        )}


                    </div>
                }

                {/* {image && (
                    <img src={image} alt="Captured" style={{ width: '100%', maxWidth: '300px' }} />
                )} */}
            </div>
        </div>
    );
}
