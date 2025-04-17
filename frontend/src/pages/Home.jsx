import styles from "../styles/Home.module.css"
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'

export default function Home(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/experience')
    }
    return (
        <div className={styles.main}>
            <div className={styles.titleText}>
                <h1>The Bias Effect</h1>
                <h2>See How AI Sees You</h2>
            </div>
            <div className={styles.buttonWrapper}>
                <Button onClick={handleClick} text={"Begin"}/>
            </div>
        </div>
    )
}

        // {/* <div className={styles.footer}>
        //     <p>Harrison Newman ● </p>
        //     <p>New York University ● </p>
        //     <p>Interactive Media A ● </p>
        // </div> */}
        // {/* </> */}