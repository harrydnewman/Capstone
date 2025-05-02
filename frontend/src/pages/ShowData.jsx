import { useEffect, useState, useRef } from 'react';
import ModelCard from '../components/ModelCard';
import styles from '../styles/ShowData.module.css';
import PropTypes from 'prop-types';
import Button from '../components/Button';

export default function ShowData({ data, onContinue }) {
    const inputData = data || {};
    const containerRef = useRef(null);

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
        if (shownOtherCardsCount > 8) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [shownOtherCardsCount])

    useEffect(() => {
        const animationDuration = 600;
        const buffer = 500;
        const perStep = animationDuration + buffer;

        const titleTimer = setTimeout(() => setTitleActive(true), 300);
        const topRowTimer = setTimeout(() => setTopRowActive(true), 300 + perStep);

        const startTime = 300 + perStep * 2;
        const interval = Math.floor(perStep * 0.75);

        const cardTimers = otherCards.map((_, index) =>
            setTimeout(() => {
                setShownOtherCardsCount(prev => prev + 1);
            }, startTime + index * interval)
        );

        const totalCardsTime = startTime + (otherCards.length * interval);
        const buttonTimer = setTimeout(() => {
            setShowContinueButton(true);
        }, totalCardsTime + 4000); // 5 sec buffer

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(topRowTimer);
            clearTimeout(buttonTimer);
            cardTimers.forEach(clearTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputData]);

    // useEffect(() => {
    //     // ✅ INSTANT TEST MODE
    //     setTitleActive(true);
    //     setTopRowActive(true);
    //     setShownOtherCardsCount(otherCards.length);
    //     setShowContinueButton(true);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [inputData]);


    const handleContinueClick = () => {
        if (onContinue) {
            onContinue();
        }
    };

    useEffect(() => {
        if (showContinueButton) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
      }, [showContinueButton]);

    return (
        <div className={styles.main} ref={containerRef}>
            {/* Title */}
            <div className={`${styles.title} ${titleActive ? styles.active : ''}`}>
  <h1 className={styles.glowText}>
    {"How AI Sees You".split("").map((char, i) => {
      const text = "How AI Sees You";
      const maxProgress = 14;
      const percentPerChar = maxProgress / text.length;
      {/* const charThreshold = (i + 1) * percentPerChar; */}

      return (
        <span
          key={i}
          style={{
            opacity: titleActive ? 1 : 0.1,
            filter: `drop-shadow(0 0 ${titleActive ? 4 : 0}px white)`,
            transition: "all 0.3s ease",
            display: "inline-block",
            marginRight: char === " " ? "0.01em" : "0",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    })}
  </h1>
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
                    <Button onClick={handleContinueClick} text={"Continue"} />
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
    ),
    onContinue: PropTypes.func, // ✅ Add this
};