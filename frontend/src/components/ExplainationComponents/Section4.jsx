import styles from '../../styles/ExplainationComponents/ExplainationSections.module.css'
import { useEffect, useState } from 'react';
import Section4Gif from '../../assets/Section4.gif'
import PropTypes from 'prop-types';

export default function Section4({ onFinish }) {
  const [showSection2, setShowSection2] = useState(false);
  const [showGif, setShowGif] = useState(false);
const [gifClass, setGifClass] = useState('');

useEffect(() => {
    if (showSection2) {
      setShowGif(false); // unmount
      setGifClass(''); // reset animation class
  
      const timer = setTimeout(() => {
        setShowGif(true);
        setGifClass(styles.gifAnimationTrigger); // reapply animation cleanly
      }, 4000);
  
      return () => clearTimeout(timer);
    }
  }, [showSection2]);
  

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

      if (onFinish) onFinish();
    }
  }, [showSection2, onFinish]);

  return (
    <div>
    <div className={styles.sectionFourTitle}>
                <h1>Sites like Clearview AI and PimEyes have scraped billions of photos from the internet.</h1>
                <h1>From Instagram, LinkedIn, Pinterest, and even YouTube thumbnails.</h1>
            </div>
        {showSection2 && 
            <div className={styles.sectionFourBody}>
        <h1>You Never Gave Permission</h1>
        <h1>Yet your face may already be part of a facial recognition database.</h1>
        <div className={styles.sectionFourGif}>
          {showGif && <img src={Section4Gif} alt="gif showing webscraping" className={gifClass}/>}
        </div>
      </div>
        }

    </div>
  );
}

Section4.propTypes = {
  onFinish: PropTypes.func,
};
