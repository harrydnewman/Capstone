import styles from '../styles/Accuracy.module.css';
import ModelCard from "../components/ModelCard";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function Accuracy({ data }) {
  const inputData = data || {};
  const [showAccuracy, setShowAccuracy] = useState(false)
  const [activate, setActivate] = useState(false);

  const importantFields = ['age', 'race'];

  const filteredEntries = Object.entries(inputData).filter(
    ([, value]) => value !== null && value !== "N/A"
  );

  const ageAndRace = filteredEntries.filter(([key]) => importantFields.includes(key));
  const otherCards = filteredEntries.filter(([key]) => !importantFields.includes(key));

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivate(true);
    }, 2000); // Slow intro

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
        setShowAccuracy(true);
    }, 3000); // Slow intro

    return () => clearTimeout(timer);
  }, [activate]);


  return (
    <div className={styles.main}>
      <div className={`${styles.titleText} ${activate ? styles.pushUp : ''}`}>
        <h1>Don’t blame us.</h1>
        <h1>Blame the models.</h1>
      </div>

      <div className={`${styles.cardsDiv} ${activate ? styles.cardsActive : ''}`}>
        <div className={styles.topRow}>
          {ageAndRace.map(([key, value]) => (
            <ModelCard
              key={key}
              name={key}
              result={value}
              showAccuracy={showAccuracy}
            />
          ))}
        </div>

        <div className={styles.otherRows}>
          {otherCards.map(([key, value]) => (
            <ModelCard
              key={key}
              name={key}
              result={value}
              showAccuracy={showAccuracy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Accuracy.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ])
  )
};
