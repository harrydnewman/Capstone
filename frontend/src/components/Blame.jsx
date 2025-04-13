import styles from '../styles/EmotionBlame.module.css'

export default function Blame(){
    return (
        <div className={styles.popUpText}>
                <h1 className={`${styles.slideUp} ${styles.slideUp1}`}>Don&lsquo;t blame us.</h1>
                <h1 className={`${styles.slideUp} ${styles.slideUp2}`}>Blame the models.</h1>
            </div>
    )
}