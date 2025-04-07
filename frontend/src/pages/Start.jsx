import React, { useState, useRef, useEffect } from "react";
import styles from '../styles/Start.module.css'
import Webcam from "react-webcam";
import Spinner from "../components/Spinner";
import fetchAgeAndRace from "../api/fetchAgeAndRace";
import LittleSpinner from "../components/littleSpinner";

export default function Start({ onChangeToOnline }) {
    const [expanded, setExpanded] = useState(false);
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
    const [webcamReady, setWebcamReady] = useState(false);
    const [hold, setHold] = useState(false)

    const FLASH_DURATION = 400;

    useEffect(() => {
        console.log("Loading set to true")
    }, [loading]);

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

            setAgeRange(data.ageRange)
            setAgeAccuracy(data.ageAccuracy)
            setRace(data.raceClassification)

            // const ageRangeTimeout = setTimeout(() => setAgeRange(data.ageRange), 2000);
            // const ageAccuracyTimeout = setTimeout(() => setAgeAccuracy(data.ageAccuracy), 3000);
            // const raceTimeout = setTimeout(() => setRace(data.raceClassification), 4000);
            const showButtonTimeout = setTimeout(() => setShowOnlineDataButton(true), 100);
            const onlineDataTimeout = setTimeout(() => setOnlineData("This is still in development"), 100);
            // const showButtonTimeout = setTimeout(() => setShowOnlineDataButton(true), 6000);
            // const onlineDataTimeout = setTimeout(() => setOnlineData("This is still in development"), 15000);
            // Cleanup function
            return () => {
                // clearTimeout(ageRangeTimeout);
                // clearTimeout(ageAccuracyTimeout);
                // clearTimeout(raceTimeout);
                clearTimeout(showButtonTimeout);
                clearTimeout(onlineDataTimeout);
            };
        }
    }, [data]);

    useEffect(() => {
        console.log("webcam set to ready")
    }, [webcamReady]);

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
        setHold(true)
        onChangeToOnline();
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
            <div className={leftBoxClassName}>
                {flashActive && <div className={styles.flashOverlay}></div>}
                <div className={styles.webcamDiv}>

                    <div className={styles.mediaContainer}>

                        {!photoTaken && (
                            <div className={`${webcamReady ? styles.fadeOut : styles.fadeIn}`}>
                                <Spinner />
                            </div>
                        )}

                        {!photoTaken && (
                            <Webcam
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                onUserMedia={() => setWebcamReady(true)}
                                className={`${webcamReady ? styles.fadeInDelayed : styles.fadeOut}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                        {photoTaken && (
                            <img
                                src={image}
                                alt="Captured"
                                className={styles.fadeIn}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </div>
                    <div className={`${styles.takeButtonDiv} ${showTakeButton ? styles.takeButtonShown : styles.takeButtonHidden} ${webcamReady ? styles.fadeInDelayed : styles.fadeOut}`}>
                        <button className={styles.takeButton} onClick={takePhoto}>
                            <p className={`${showTakeButton ? styles.takeButtonTextShown : styles.takeButtonTextHidden}`}>
                                Take Photo
                            </p>
                        </button>
                    </div>
                </div>



            </div>
            <div className={rightBoxClassName}>
                {loading ?
                    <Spinner />
                    :
                    <div className={styles.resultsDiv}>
                        <div className={`${styles.resultsSection} ${ageRange !== null ? styles.visible : ''}`}>
                            <p className={styles.resultsHeader}>Estimated Age Range</p>
                            <p className={styles.resultsText}><strong>{ageRange ?? ''}</strong></p>
                        </div>

                        <div className={`${styles.resultsSection} ${ageAccuracy !== null ? styles.visible : ''}`}>
                            <p className={styles.resultsHeader}>Age Detection Confidence</p>
                            <p className={styles.resultsText}><strong>{ageAccuracy ?? ''}</strong></p>
                        </div>

                        <div className={`${styles.resultsSection} ${race !== null ? styles.visible : ''}`}>
                            <p className={styles.resultsHeader}>Identified Race</p>
                            <p className={styles.resultsText}><strong>{race ?? ''}</strong></p>
                        </div>

                        <div className={`${styles.resultsSection} ${showOnlineDataButton ? styles.visible : ''}`}>
                            <div className={`${styles.whereYouShowUpOnlineButtonDiv} ${onlineData != null ? styles.expandOnHover : ''}`}>
                                <p className={styles.resultsHeader}>Where You Show Up Online</p>
                                <button className={`${styles.whereYouShowUpOnlineButton} ${onlineData ? styles.dataLoaded : ''}`} onClick={onlineData != null ? whereYouShowUpOnlineClick : undefined}>
                                    {onlineData != null ?
                                        <p className={`${showOnlineDataButton ? styles.whereYouShowUpOnlineButtonTextShown : styles.whereYouShowUpOnlineButtonTextHidden}`}>Continue</p>
                                        :
                                        <div className={styles.loadingOnlineDataButtonDiv}>
                                            <p className={`${showOnlineDataButton ? styles.whereYouShowUpOnlineButtonTextShown : styles.whereYouShowUpOnlineButtonTextHidden}`}>Loading</p>
                                            <LittleSpinner />
                                        </div>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
