import { useEffect, useState } from 'react'; 
import styles from '../styles/Explaination.module.css'
import TitleSection from '../components/ExplainationComponents/TitleSection';
import Section1 from '../components/ExplainationComponents/Section1'
import Section2 from '../components/ExplainationComponents/Section2';
import Section3 from '../components/ExplainationComponents/Section3';
import Section4 from '../components/ExplainationComponents/Section4';
import Section5 from '../components/ExplainationComponents/Section5';
import Section6 from '../components/ExplainationComponents/Section6';

export default function Explaination() {
    const [showSection1, setShowSection1] = useState(false)
    const [showSection2, setShowSection2] = useState(false)
    const [showSection3, setShowSection3] = useState(false)
    const [showSection4, setShowSection4] = useState(false)
    const [showSection5, setShowSection5] = useState(false)
    const [showSection6, setShowSection6] = useState(false)

    const section1Finish = () => {
        setTimeout(() => {
            console.log("Section 1 Done")
            setShowSection2(true)
        }, 4000)
    }

    const section2Finish = () => {
        setTimeout(() => {
            console.log("Section 2 Done")
            setShowSection3(true)
        }, 5000)
    }

    const section3Finish = () => {
        setTimeout(() => {
            console.log("Section 3 Done")
            setShowSection4(true)
        }, 10000)
    }

    const section4Finish = () => {
        setTimeout(() => {
            console.log("Section 4 Done")
            setShowSection5(true)
        }, 15500)
    }

    const section5Finish = () => {
        setTimeout(() => {
            console.log("Section 5 Done")
            setShowSection6(true)
        }, 5000)
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

      useEffect(() => {
        if(showSection3){
            scrollToBottom()
        }
      }, [showSection3]);

      useEffect(() => {
        if(showSection4){
            scrollToBottom()
        }
      }, [showSection4]);

      useEffect(() => {
        if(showSection5){
            scrollToBottom()
        }
      }, [showSection5]);

      useEffect(() => {
        if(showSection6){
            scrollToBottom()
        }
      }, [showSection6]);
      
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
        <TitleSection/>


        {/* old code: */}
        {showSection1 && <Section1 onFinish={section1Finish}/>}
        {showSection2 && <Section2 onFinish={section2Finish}/>}
        {showSection3 && <Section3 onFinish={section3Finish}/>}
        {showSection4 && <Section4 onFinish={section4Finish}/>}
        {showSection5 && <Section5 onFinish={section5Finish}/>}
        {showSection6 && <Section6/>}
        </div>
    )
}
