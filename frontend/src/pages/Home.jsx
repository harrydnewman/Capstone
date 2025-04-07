import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.homePage}>
            <div className={styles.mainContent}>
                <div className={styles.titles}>
                    <div className={styles.textContainer}>
                        <div className={styles.title}><h1>The Rise and Risks of Facial Recognition in the United States</h1></div>
                        <div className={styles.subtitle}>
                            <h2>Exploring the expansion of facial recognition in the U.S., exposing systemic bias, data exploitation, and the erosion of public oversight.</h2>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.enterExperienceButton}>Enter Experience</button>
                        <button className={styles.seeStatisticsButton}>See Statistics</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


