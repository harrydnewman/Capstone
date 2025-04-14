import styles from '../styles/Explaination.module.css'

export default function Explaination() {
    return (
        <div className={styles.main}>
            <div className={styles.mainPoint}>
                {/* animate these */}
                <h1>None of these models are fully reliable.</h1>
                <h1>Yet, AI systems built on similar data and techniques are used every day in hiring, policing, and immigration screening.</h1>
                <h1>When these systems fail, the consequences aren&apos;t just wrong answers, they&apos;re life-changing decisions.</h1>
            </div>
        </div>

        // check explaination notes for more info
    )
}