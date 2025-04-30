import styles from "../styles/Home.module.css"
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'

export default function Home(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/experience')
    }

    const handleAboutClick = () => {
        navigate('/about')
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
            <div className={styles.aboutButtonDiv}>
                <button className= {styles.aboutButton} onClick={handleAboutClick}><p>About</p></button>
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