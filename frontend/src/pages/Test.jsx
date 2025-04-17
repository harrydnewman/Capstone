import { useState } from 'react';
import styles from '../styles/Test.module.css';
import ShowData from './ShowData';
import EmotionBlameSequence from './EmotionBlameSequence';
import Accuracy from './Accuracy';

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
    const [showAccuracy, setShowAccuracy] = useState(false)

    const handleContinue = () => {
        console.log("✅ Continue button clicked from parent Test component");
        setShowSweep(true);

        setTimeout(() => {
            setShowData(false);
            setShowNext(true);
        }, 600); 

        setTimeout(() => {
            setShowSweep(false);
        }, 1200); 

        setTimeout(() => {
            setShowNext(false);
            setShowAccuracy(true);
        }, 8500); 
    };

    return (
        <div className={styles.main}>
            {showData && <ShowData data={testData} onContinue={handleContinue} />}
{showNext && (
                <div className={styles.nextContent}>
                    <EmotionBlameSequence />
                </div>
            )}
            {showSweep && <div className={styles.sweepOverlay} />}
            {showAccuracy && <Accuracy data={testData}/>} 
            
        </div>
    );
}
