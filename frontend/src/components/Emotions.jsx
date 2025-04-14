import styles from "../styles/EmotionBlame.module.css"


export default function Emotions({ flickerOut = false }) {
    return (
      <div className={styles.popUpText}>
        <h1 className={`${styles.slideUp} ${styles.slideUp1} ${flickerOut ? styles.flickerOut : ''}`}>Suprised?</h1>
        <h1 className={`${styles.slideUp} ${styles.slideUp2} ${flickerOut ? styles.flickerOut : ''}`}>Offended?</h1>
        <h1 className={`${styles.slideUp} ${styles.slideUp3} ${flickerOut ? styles.flickerOut : ''}`}>Confused?</h1>
      </div>
    );
  }
  
  
