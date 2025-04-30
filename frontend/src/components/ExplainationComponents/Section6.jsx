import styles from '../../styles/ExplainationComponents/ExplainationSections.module.css'
import { useEffect, useState } from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

export default function Section6(){
    const [showEnd, setShowEnd] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const timeouts = [];

        timeouts.push(setTimeout(() => setShowEnd(true), 12000));
        timeouts.push(setTimeout(() => setShowButtons(true), 15000));

        return () => timeouts.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (showEnd) {
            scrollToBottom();
        }
    }, [showEnd]);

    const scrollToBottom = () => {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }, 100);
    };

    const userSurveyClick = () => {
        navigate("/usertesting")
    }

    const restartButtonClick = () => {
        navigate("/")
    }


    return (
        <div>
            <div className={styles.sectionSixTitle}>
                <h1>You just experienced what these systems see, and how little they actually understand.</h1>
                <h1>This is not about the future. It’s about what’s already happening.</h1>
                <h1>By revealing the cracks, this project asks a simple question:</h1>
            </div>
            {showEnd && 
                <div className={styles.sectionSixEnd}>
                <h1>How are images of you being used, and by whom?</h1>
                {showButtons && <div className={styles.buttonsDiv}>
                    <Button onClick={userSurveyClick} text={"User Testing Survey"}/>
                    <Button onClick={restartButtonClick} text={"Restart"}/>
                </div>
                }

            </div>
            }

        </div>
    )
}

