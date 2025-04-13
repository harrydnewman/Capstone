import styles from "../styles/Test.module.css";
import Emotions from "../components/Emotions";
import Blame from "../components/Blame";
import { useEffect, useState } from "react";

export default function EmotionBlameSequence() {
    const [showEmotions, setShowEmotions] = useState(true);
    const [fadeOutEmotions, setFadeOutEmotions] = useState(false);
    const [showBlame, setShowBlame] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOutEmotions(true); 
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (fadeOutEmotions) {
            const timeout = setTimeout(() => {
                setShowEmotions(false);
                setShowBlame(true);
            }, 600);

            return () => clearTimeout(timeout);
        }
    }, [fadeOutEmotions]);

    return (
        <div className={styles.main}>
            {showEmotions && (
                <div className={`${styles.fade} ${fadeOutEmotions ? styles.fadeOut : styles.fadeIn}`}>
                    <Emotions />
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
