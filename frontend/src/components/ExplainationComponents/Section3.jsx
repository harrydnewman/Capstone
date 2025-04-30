import styles from '../../styles/ExplainationComponents/ExplainationSections.module.css'
import { useEffect, useState } from 'react'; 
import PropTypes from 'prop-types';

export default function Section3({onFinish}){
    const [showSection2, setShowSection2] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowSection2(true);
        }, 8000); 

        return () => clearTimeout(timeout); 
    }, []);

    useEffect(() => {
        if (showSection2) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
            
            if (onFinish) {
                onFinish();
            }
        }
    }, [showSection2, onFinish]);

    return (
        <div>
            <div className={styles.sectionThreeTitle}>
                <h1>These systems dont just mislabel,</h1>
                <h1>they misjudge.</h1>
            </div>

            {showSection2 && 
            <div className={styles.sectionThreeBody}>
                <h1>People have been arrested, interrogated, and detained because of incorrect matches.</h1>
                <h1>Robert Williams, a black man, was arrested in Detroit after AI said he looked like someone on surveillance footage.</h1>
                {/* <div className={styles.quote}>
                    <h1 className={styles.topText}>“The cop told me, &apos;The computer says it&apos;s you.&apos;”</h1>
                    <h1 className={styles.bottomText}>- Robert Williams</h1>
                </div> */}
                <h1>He spent 30 hours in jail. The only evidence? A faulty match.</h1>
            </div>
            }
        </div>
        
    )
}


Section3.propTypes = {
    onFinish: PropTypes.func, // optional function
  };