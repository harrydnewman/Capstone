import { useEffect, useState } from 'react'; 
import styles from '../../styles/ExplainationComponents/ExplainationSections.module.css'
import Traits from './Components/Traits'
import PropTypes from 'prop-types';

export default function Section1({ onFinish }) {
    const [showSection2, setShowSection2] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowSection2(true);
        }, 10000); 

        return () => clearTimeout(timeout); 
    }, []);

    useEffect(() => {
        if (showSection2) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });

            // 🔔 notify parent when Section1 finishes showing everything
            if (onFinish) {
                onFinish();
            }
        }
    }, [showSection2, onFinish]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.sectionOneDiv}>
            <h1>What you just saw wasn&apos;t a novelty.</h1>
            <h1>It was a simulation of how AI systems reduce your identity into a series of traits.</h1>
            <Traits/>
            <h1>You were sorted into these categories, without any understanding of who you are.</h1>
        </div>
        {showSection2 && 
            <div className={styles.sectionOneDivPart2}>
            <h1>Classification is not understanding.</h1>
            <h1>It is reduction.</h1>
        </div>
        }

        </div>
        
    )
}

Section1.propTypes = {
    onFinish: PropTypes.func, // optional function
  };