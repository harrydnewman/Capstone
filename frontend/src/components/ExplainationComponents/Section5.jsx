import styles from '../../styles/ExplainationComponents/ExplainationSections.module.css'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Agencies from './Components/Agencies'

export default function Section5({onFinish}) {
    const [showBody1, setShowBody1] = useState(false)
    const [showBody2, setShowBody2] = useState(false)
    const [showBody3, setShowBody3] = useState(false)
    const [showAgencies, setShowAgencies] = useState(false)


    useEffect(() => {
        const timeouts = [];

        // timeouts.push(setTimeout(() => setShowBody1(true), 4000));
        // timeouts.push(setTimeout(() => setShowAgencies(true), 10000));
        // timeouts.push(setTimeout(() => setShowBody2(true), 20000));
        // timeouts.push(setTimeout(() => setShowBody3(true), 25000));

        timeouts.push(setTimeout(() => setShowBody1(true), 0));
        timeouts.push(setTimeout(() => setShowAgencies(true), 6000));
        timeouts.push(setTimeout(() => setShowBody2(true), 16000));
        timeouts.push(setTimeout(() => setShowBody3(true), 21000));

        return () => timeouts.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (showBody1) {
            scrollToBottom();
        }
    }, [showBody1]);

    useEffect(() => {
        if (showAgencies) {
            scrollToBottom();
        }
    }, [showAgencies]);

    useEffect(() => {
        if (showBody2) {
            scrollToBottom();
        }
    }, [showBody2]);

    useEffect(() => {
        if (showBody3) {
            scrollToBottom();
            if (onFinish) {
                onFinish();
            }
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
        <div>
            {/* <div className={styles.sectionFiveTitle}>
                <h1>Power Without Oversight</h1>
            </div> */}
            {showBody1 && 
            <div className={styles.sectionFiveBody}>
                <h1>These systems are already in use</h1>
                <h1>by over 20 federal agencies,</h1>
                <h1>hundreds of police departments,</h1>
                <h1>and countless private companies.</h1>
           
            </div>
        }
        {showAgencies && 
            <div className={styles.sectionFiveAgencies}>
                <h1>Federal Agencies That Employ Law Enforcement Officers Currently Using Facial Recognition Technology</h1>
                <Agencies />
            </div>

        }
           {showBody2 && 
            <div className={styles.sectionFiveBodyTwo}>
                <h1>These systems are deployed with little public oversight, no real transparency,</h1>
                <h1>and no consistent way to audit how they work or who they affect.</h1>
            </div>

           }
            {showBody3 && 
                <div className={styles.sectionFiveBodyThree}>
                <h1>This isn’t just about misuse.</h1>
                <h1>It’s about these systems operating nationwide, with no real accountability.</h1>
            </div>
            }
           
        </div>
    )
}


Section5.propTypes = {
    onFinish: PropTypes.func, // optional function
  };