import { useEffect, useState } from 'react'; 
import styles from '../styles/Explaination.module.css'
import TitleSection from '../components/ExplainationComponents/TitleSection';
import Section1 from '../components/ExplainationComponents/Section1'
import Section2 from '../components/ExplainationComponents/Section2';
import Section3 from '../components/ExplainationComponents/Section3';
import Section4 from '../components/ExplainationComponents/Section4';

export default function Explaination() {
    const [showSection1, setShowSection1] = useState(false)
    const [showSection2, setShowSection2] = useState(false)

    const section1Finish = () => {
        setTimeout(() => {
            console.log("Section 1 Done")
            setShowSection2(true)
        }, 4000)
    }

    const section3Finish = () => {
        setTimeout(() => {
            console.log("Section 3 Done")
            // setShowSection2(true)
        }, 10000)
    }

    const section4Finish = () => {
        setTimeout(() => {
            console.log("Section 4 Done")
            // setShowSection2(true)
        }, 15500)
    }


    useEffect(() => {
        const timeouts = [];
      
        timeouts.push(setTimeout(() => setShowSection1(true), 5000));
      
        return () => timeouts.forEach(clearTimeout);
      }, []);
      
      useEffect(() => {
        if (showSection1) {
          scrollToBottom();
        }
      }, [showSection1]);

      useEffect(() => {
        if (showSection2) {
          scrollToBottom();
        }
      }, [showSection2]);
      
      const scrollToBottom = () => {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 100); 
      };
    return (
        <div className={styles.main}>
             {/* <TitleSection/>

            {showSection1 && <Section1 onFinish={section1Finish} />}
{showSection2 && <Section2/>}  */}
            {/* <Section3 onFinish={section3Finish}/> */}
            <Section4 onFinish={section4Finish}/>
        </div>
    )
}

// Wait like x amount of sections between each section, and then scroll down to the next one as it animates in.
// Set up everything first, then do the animations and shit 