import styles from '../styles/Explaination.module.css'

import Scope from '../components/ExplainationComponents/Scope'
export default function Explaination() {
    return (
        <div className={styles.main}>
            <div className={styles.section}>
                {/* start these off in ceter and move as things animate in */}
                <h1>None of these models are fully reliable.</h1>
                <h1>Yet, AI systems built on similar data and techniques are used every day in hiring, policing, and immigration screening.</h1>
                <h1>When these systems fail, the consequences aren&apos;t just wrong answers, they&apos;re life-changing decisions.</h1>
            </div>

            <Scope/>

            {/* <div className={styles.section}>
                <h1>How Big Is This Problem?</h1>
                <h2>Facial recognition is everywhere.</h2>
                <h2>In 2021, at least 20 U.S. federal law enforcement agencies were already using facial recognition.</h2>
                <div className={styles.visual}>
                    <p>Show federal agencies using AI facial recognition here</p>
                </div>
                {/* maybe keep this 
                <h2>Talk about local law enforcement departments using the tech</h2>
                <div className={styles.visual}>
                    <p>Show map if possible to find the data relatively quickly</p>
                </div>
            </div>

            <div className={styles.section}>
                <h1>Bias in the Data</h1>
                <h2>Black women are misidentified up to 34.7% of the time, white men just 0.8%. (MIT Study)</h2>
                <h4>ADD MORE INFO</h4>
                <div className={styles.visual}>
                    <p>Some kind of chart maybe?</p>
                </div>
            </div>

            <div className={styles.section}>
                <h1>Real People, Real Harm — Wrongful Arrests</h1>
                <h4>CORNY ASS NAME</h4>
                <h2>In 2024, the Innocence Project found 7 wrongful arrests from facial recognition. 6 were Black individuals.</h2>
                <div className={styles.visual}>
                    <p>see if theres any new/updated/better statistics about this and do a graph</p>
                </div>
            </div>

            <div className={styles.section}>
                <h1>Corporate Surveillance — Who Else Is Watching?</h1>
                <h4>CORNY ASS NAME</h4>
                <h2>Clearview AI scraped billions of images. PimEyes lets anyone search faces across the internet.</h2>
                <h4>Be more descriptive, add a source</h4>
                <div className={styles.visual}>
                    <p>Do something about number of images scraped per year maybe? Or a graph of like whats gonna happen to ur shit</p>
                </div>
            </div>

            <div className={styles.section}>
                <h1>Lack of Oversight</h1>
                <h2>Even police admit they don’t fully understand these tools.</h2>
                <h4>SWITCH THIS WITH THE EXACT NYT QUOTE</h4>
                <div className={styles.visual}>
                    <p>IDFK</p>
                </div>
            </div>

            <div className={styles.section}>
                <h1>Flawed AI isn&apos;t just a personal issue — it&apos;s a systemic problem.</h1>
                <h4>Hate this</h4>
                <h2>Facial recognition threatens privacy, freedom of assembly, and freedom of movement.</h2>    
                <h4>EXPLAIN HOW, do I even mention this in my essay?????</h4>
                <div className={styles.visual}>
                    <p>Rights Checklist: Icons fading out as surveillance grows.</p>
                    <h4>IDK this one seems alright, keep thinking about it</h4>
                </div>
            </div>

            <div className={styles.section}>
                <h1>The photo you uploaded today? It&apos;s a glimpse into how AI sees you.</h1>
                <h1>But for many, these systems shape decisions that deeply impact their lives.</h1>
            </div>

            <h4>Add button to do user experience test here</h4>
            <h4>Also set up basically like a quick reflection that was like: Were these results accurate?</h4>
             */}
        </div>
    )
}

// Wait like x amount of sections between each section, and then scroll down to the next one as it animates in.
// Set up everything first, then do the animations and shit 