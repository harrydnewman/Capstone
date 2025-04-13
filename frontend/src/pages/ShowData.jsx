import { useEffect, useState } from 'react';
import ModelCard from '../components/ModelCard';
import styles from '../styles/ShowData.module.css';
import PropTypes from 'prop-types';

export default function ShowData({ data }) {
    const inputData = data || {};

    const importantFields = ['age', 'race'];

    const filteredEntries = Object.entries(inputData).filter(
        ([, value]) => value !== null && value !== "N/A"
    );

    const ageAndRace = filteredEntries.filter(([key]) => importantFields.includes(key));
    const otherCards = filteredEntries.filter(([key]) => !importantFields.includes(key));

    const [titleActive, setTitleActive] = useState(false);
    const [topRowActive, setTopRowActive] = useState(false);
    const [shownOtherCardsCount, setShownOtherCardsCount] = useState(0);
    const [showContinueButton, setShowContinueButton] = useState(false);

    useEffect(() => {
        const animationDuration = 600;
        const buffer = 500;
        const perStep = animationDuration + buffer;

        const titleTimer = setTimeout(() => setTitleActive(true), 300);
        const topRowTimer = setTimeout(() => setTopRowActive(true), 300 + perStep);

        const startTime = 300 + perStep * 2;
        const interval = perStep;

        const cardTimers = otherCards.map((_, index) =>
            setTimeout(() => {
                setShownOtherCardsCount(prev => prev + 1);
            }, startTime + index * interval)
        );

        // ✅ After all cards are shown, wait 5s then show button
        const totalCardsTime = startTime + (otherCards.length * interval);
        const buttonTimer = setTimeout(() => {
            setShowContinueButton(true);
        }, totalCardsTime + 5000); // 5 sec buffer

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(topRowTimer);
            clearTimeout(buttonTimer);
            cardTimers.forEach(clearTimeout);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputData]);

    const handleContinueClick = () => {
        console.log('Button clicked');
    };

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

            {/* Continue Button */}
            {showContinueButton && (
                <div className={styles.continueWrapper}>
                    <button className={styles.continueButton} onClick={handleContinueClick}>
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}

ShowData.propTypes = {
    data: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ])
    )
};
