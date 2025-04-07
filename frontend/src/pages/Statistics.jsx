import styles from '../styles/Statistics.module.css'
import { useNavigate } from 'react-router-dom';



export default function Statistics(){
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/')
    }

    return (
        <div className={styles.main}>
            <h1>Statistics</h1>
            <p>More Content Coming Soon</p>
            <button className={styles.returnButton} onClick={goHome}>
                Return To Home
            </button>
        </div>
    )
}