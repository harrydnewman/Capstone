import { useEffect, useState } from 'react';
import styles from '../styles/Test.module.css';
import ShowData from './ShowData';

export default function Test() {
    const testData = {
        acne: "Clear Skin",
        aesthetic: "aesthetic",
        age: "20-29",
        attractiveness: "not attractive",
        beard: "No Beard",
        emotion: "neutral",
        face_shape: "Diamond",
        facemask: "WithoutMask",
        gender: "male",
        hair_length: "short human hair",
        hair_type: "wavy",
        race: "White",
        skin_type: "dry",
        smoker: "notsmoking",
    };

    const [showData, setShowData] = useState(true);
    const [showNext, setShowNext] = useState(false);
    const [showSweep, setShowSweep] = useState(false);

    const handleContinue = () => {
        console.log("✅ Continue button clicked from parent Test component");

        setShowSweep(true);

        setTimeout(() => {
            setShowData(false);
            setShowNext(true);
        }, 1200); // match animation duration
    };

    return (
        <div className={styles.main}>
            {showData && <ShowData data={testData} onContinue={handleContinue} />}

            {showSweep && <div className={styles.sweepOverlay} />}

            {showNext && (
                <div className={styles.nextContent}>
                    <h1>Next</h1>
                </div>
            )}
        </div>
    );
}
