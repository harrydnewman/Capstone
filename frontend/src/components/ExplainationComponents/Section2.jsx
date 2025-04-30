import { useEffect, useState } from 'react'; 
import styles from '../../styles/ExplainationComponents/ExplainationSections.module.css'
import Graph from './Components/Graph';
import PropTypes from 'prop-types';

export default function Section2({ onFinish }){
    const [showBody1, setShowBody1] = useState(false)
    const [showGraph, setShowGraph] = useState(false)
    const [showBody2, setShowBody2] = useState(false)
    const [showBody3, setShowBody3] = useState(false)

    useEffect(() => {
        const timeouts = [];
      
        timeouts.push(setTimeout(() => setShowBody1(true), 5000));
        timeouts.push(setTimeout(() => setShowGraph(true), 15000));
        timeouts.push(setTimeout(() => setShowBody2(true), 20000));
        timeouts.push(setTimeout(() => setShowBody3(true), 30000));
      
        return () => timeouts.forEach(clearTimeout);
      }, []);
      
      useEffect(() => {
        if (showBody1) {
          scrollToBottom();
        }
      }, [showBody1]);
      
      useEffect(() => {
        if (showGraph) {
          scrollToBottom();
        }
      }, [showGraph]);
      
      useEffect(() => {
        if (showBody2) {
          scrollToBottom();
        }
      }, [showBody2]);

      useEffect(() => {
        if (showBody3) {
          scrollToBottom();
          if (onFinish) onFinish();
        }
      }, [showBody3, onFinish]);
      
      const scrollToBottom = () => {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 100); 
      };


    return (
        <div className={styles.sectionTwoWrapper}>
            <div className={styles.sectionTwoTitle}>
                <h1>AI reflects the world it&apos;s trained on.</h1>
                <h1>And the world it&apos;s trained on is deeply unequal.</h1>
            </div> 

            {showBody1 && 
                <div className={styles.sectionTwoBodyOne}>
                <h1>Facial classification systems are often trained on scraped public images.</h1>
                <h1>These datasets tend to mirror existing online imbalances.</h1>
                <h1 className={styles.h1Emphasis}>Overrepresenting white, male, Western faces while underrepresenting everyone else.</h1>
                <h1>Facial analysis AI performs best on lighter-skinned men and worst on darker-skinned women, revealing clear racial and gender bias.</h1>
            </div>
            }

            {showGraph && 
                <Graph/>
            }

            {showBody2 && 
            <div className={styles.sectionTwoBodyTwo}>
                <h1>These are the error rates from Microsoft Azure Face API, IBM Watson, and Face++ (China).</h1>
                <h1>Each system was tested on the same, balanced dataset of face images.</h1>
                <h1>Across all three systems, lighter-skinned men were classified most accurately.</h1>
                <h1>Darker-skinned women faced the highest error rates — over 34%.</h1>
            </div>
            }

            {showBody3 && 
            <div className={styles.sectionTwoBodyThree}>
                <h1>These gaps reflect which faces are overrepresented in the training data, and which ones aren&apos;t seen at all.</h1>
                <h1>The more familiar a face is to the data, the fewer mistakes it makes.</h1>
            </div>
            }
        </div>
    )
}


Section2.propTypes = {
  onFinish: PropTypes.func,
};
