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
        // Step 1: Trigger title animation
        const titleTimer = setTimeout(() => {
            setTitleActive(true);
        }, 100);

        // Step 2: Trigger top row animation
        const topRowTimer = setTimeout(() => {
            setTopRowActive(true);
        }, 600);

        // Step 3: Trigger card animations
        const cardTimers = otherCards.map((_, index) =>
            setTimeout(() => {
                setShownOtherCardsCount(prev => prev + 1);
            }, 1000 + index * 800)
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
                        showAccuracy={false}
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
                        showAccuracy={false}
                        style={{ animationDelay: `${index * 0.3}s` }}
                        className={styles.animatedCard}
                    />
                ))}
            </div>
        </div>
    );
}
