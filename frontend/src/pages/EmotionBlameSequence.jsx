import styles from "../styles/EmotionBlame.module.css";
import Emotions from "../components/Emotions";
import Blame from "../components/Blame";
import { useEffect, useState } from "react";

export default function EmotionBlameSequence() {
    const [showEmotions, setShowEmotions] = useState(true);
    const [fadeInEmotions, setFadeInEmotions] = useState(false);
    const [flickerOutEmotions, setFlickerOutEmotions] = useState(false);
    const [showBlame, setShowBlame] = useState(false);
  
    useEffect(() => {
      const fadeInTimer = setTimeout(() => {
        setFadeInEmotions(true);
      }, 100);
  
      const flickerOutTimer = setTimeout(() => {
        setFlickerOutEmotions(true);
      }, 4500);
  
      return () => {
        clearTimeout(fadeInTimer);
        clearTimeout(flickerOutTimer);
      };
    }, []);
  
    useEffect(() => {
      if (flickerOutEmotions) {
        const timeout = setTimeout(() => {
          setShowEmotions(false);
          setShowBlame(true);
        }, 600); // match flickerOut animation
        return () => clearTimeout(timeout);
      }
    }, [flickerOutEmotions]);
  
    return (
      <div className={styles.sequenceWrapper}>
        {showEmotions && (
          <div className={`${styles.fade} ${fadeInEmotions ? styles.fadeIn : ''}`}>
            <Emotions flickerOut={flickerOutEmotions} />
          </div>
        )}
        {showBlame && (
          <div className={`${styles.fade} ${styles.fadeIn}`}>
            <Blame />
          </div>
        )}
      </div>
    );
  }
  