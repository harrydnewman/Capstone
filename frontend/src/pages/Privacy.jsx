import styles from '../styles/privacy.module.css'
import { useNavigate } from 'react-router-dom';
export default function Privacy(){

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/')
    }

    const goToExperience = () => {
        navigate('/experience')
    }

    return (
        <div className={styles.main}>
             <h1>Privacy Statement</h1>
             <p>A privacy statement will go here, extremely detailed, need to finish backend before I do this</p>

             <div className={styles.buttonContainer}>
                <button className={styles.backButton} onClick={goHome}>Go Back</button>
                <button className={styles.continueButton} onClick={goToExperience}>Accept</button>
             </div>
        </div>
       
    )
}