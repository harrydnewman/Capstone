import { useEffect, useState } from 'react';
import ModelCard from '../components/ModelCard';
import styles from '../styles/Test.module.css';

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

    const importantFields = ['age', 'race'];

    const filteredEntries = Object.entries(testData).filter(
        ([, value]) => value !== null && value !== "N/A"
    );

    const ageAndRace = filteredEntries.filter(([key]) => importantFields.includes(key));
    const otherCards = filteredEntries.filter(([key]) => !importantFields.includes(key));

    const [titleActive, setTitleActive] = useState(false);
    const [topRowActive, setTopRowActive] = useState(false);
    const [shownOtherCardsCount, setShownOtherCardsCount] = useState(0);

    useEffect(() => {
        const animationDuration = 600;
        const buffer = 500;
        const perStep = animationDuration + buffer; // 1000ms clean
    
        const titleTimer = setTimeout(() => {
            setTitleActive(true);
        }, 300); // Title fast
    
        const topRowTimer = setTimeout(() => {
            setTopRowActive(true);
        }, 300 + perStep); // After title anim + buffer
    
        const startTime = 300 + perStep * 2; // After top row anim + buffer
        const interval = perStep; // Consistent per card
    
        const cardTimers = otherCards.map((_, index) =>
            setTimeout(() => {
                setShownOtherCardsCount(prev => prev + 1);
            }, startTime + index * interval)
        );
    
        return () => {
            clearTimeout(titleTimer);
            clearTimeout(topRowTimer);
            cardTimers.forEach(clearTimeout);
        };
    }, []);
    

    return (
        <div className={styles.main}>
            {/* Title */}
            <div className={`${styles.title} ${titleActive ? styles.active : ''}`}>
                <h1>How AI Sees You</h1>
            </div>

            {/* Age + Race Row */}
            <div className={`${styles.topRow} ${topRowActive ? styles.active : ''}`}>
                {ageAndRace.map(([key, value]) => (
                    <ModelCard
                        key={key}
                        name={key}
                        result={value}
                        showAccuracy={true}
                    />
                ))}
            </div>

            {/* Other Cards */}
            <div className={styles.otherRows}>
                {otherCards.slice(0, shownOtherCardsCount).map(([key, value], index) => (
                    <ModelCard
                        key={key}
                        name={key}
                        result={value}
                        showAccuracy={true}
                        style={{ animationDelay: `${index * 0.3}s` }}
                        className={styles.animatedCard}
                    />
                ))}
            </div>
        </div>
    );
}
