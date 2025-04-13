import styles from "../styles/EmotionBlame.module.css"


export default function Emotions() {
    return (
        <div className={styles.popUpText}>
            <h1 className={`${styles.slideUp} ${styles.slideUp1}`}>Suprised?</h1>
            <h1 className={`${styles.slideUp} ${styles.slideUp2}`}>Offended?</h1>
            <h1 className={`${styles.slideUp} ${styles.slideUp3}`}>Confused?</h1>
        </div>
    )
}