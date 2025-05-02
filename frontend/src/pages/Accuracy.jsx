import styles from '../styles/Accuracy.module.css';
import ModelCard from "../components/ModelCard";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Accuracy({ data }) {
  const inputData = data || {};
  const [showAccuracy, setShowAccuracy] = useState(false)
  const [activate, setActivate] = useState(false);
  const [showContinue, setShowContinue] = useState(false)
  const navigate = useNavigate();

  const importantFields = ['age', 'race'];

  const filteredEntries = Object.entries(inputData).filter(
    ([, value]) => value !== null && value !== "N/A"
  );

  const ageAndRace = filteredEntries.filter(([key]) => importantFields.includes(key));
  const otherCards = filteredEntries.filter(([key]) => !importantFields.includes(key));

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivate(true);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!activate) return; // ⛔ Don't run until activated
  
    const timer = setTimeout(() => {
      setShowAccuracy(true);
    }, 3000); // Delay after activation
  
    const buttonTimer = setTimeout(() => {
      setShowContinue(true);
    }, 10000); // Delay after activation
  
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
    };
  }, [activate]);

  useEffect(() => {
    if(showAccuracy){
      const OFFSET      = 20; 
          const targetY     =
            document.documentElement.scrollHeight - window.innerHeight - OFFSET;
      
          window.scrollTo({ top: Math.max(targetY, 0), behavior: "smooth" });
    }
  }, [showAccuracy])
  
  useEffect(() => {
    if (showContinue) {
        scrollToBottom();
    }
}, [showContinue]);

const scrollToBottom = () => {
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, 100);
};


  const goToExplaination = () => {
    navigate("/explanation")
  }


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

      {showContinue && <div className={styles.buttonWrapper}>
        <Button onClick={goToExplaination} text={"Continue"}/>
      </div>
      }
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
