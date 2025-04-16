import styles from '../styles/Explaination.module.css'
import Section1 from '../components/ExplainationComponents/Section1'
export default function Explaination() {
    return (
        <div className={styles.main}>
            <div className={styles.titleSection}>
                <h1>None of these models are fully reliable.</h1>
                <h1>Yet, AI systems built on similar data and techniques are used every day in hiring, policing, and immigration screening.</h1>
                <h1>When these systems fail, the consequences aren&apos;t just wrong answers, they&apos;re life-changing decisions.</h1>
            </div>
            <Section1/>
        </div>
    )
}

// Wait like x amount of sections between each section, and then scroll down to the next one as it animates in.
// Set up everything first, then do the animations and shit 