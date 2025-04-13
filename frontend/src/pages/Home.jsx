import styles from "../styles/Home.module.css"
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/start')
    }
    return (
        <div className={styles.main}>
            <div className={styles.titleText}>
                <h1>The Bias Effect</h1>
                <h2>See How AI Sees You</h2>
            </div>
            <div className={styles.continueButton}>
                <button className={styles.startButton} onClick={handleClick}>Begin</button>
            </div>
        </div>
    )
}