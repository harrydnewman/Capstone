import styles from '../styles/About.module.css'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';
export default function About() {
    const navigate = useNavigate();

    const goToExperience = () => {
        navigate('/experience')
    }

    return (
        <div className={styles.main}>
            <div className={styles.titleText}>
                <h1>About</h1>
            </div>
            <div className={styles.body}>
                <h4>The Bias Effect is an interactive website that lets you see how facial recognition AI classifies your face, and how wrong it can get it. From race and gender to age, skin tone, attractiveness, and more, your uploaded image is run through 14 real AI models pulled from the Hugging Face platform. These models reflect the kinds of systems being used today by companies, governments, and law enforcement, and they don’t always agree with each other, or with reality</h4>
                <h4>This isn’t about fun filters. It’s about exposing bias.</h4>
                <h4>AI classification systems are everywhere, from unlocking your phone to scanning faces at airports and protests. But the way they’re trained, tested, and deployed often reinforces deep systemic inequalities. Marginalized communities are more likely to be misidentified, over-surveilled, and unfairly targeted. Facial recognition isn’t just flawed, it’s dangerous when we treat it like truth.</h4>
                <h4>The Bias Effect gives you a firsthand look at how AI sees you, and how inconsistently it makes those judgments. By making these outputs visible and personal, the project challenges the illusion that machine classifications are objective or fair.</h4>
                <h2 id='privacy'>Privacy</h2>
                <h4>Your image is never saved or stored on our server. Once the classification is complete, it’s gone. All models run locally, so your photo never leaves our servers and is wiped from memory the moment the results come back.</h4>
                <h2>Why It Matters</h2>
                <h4>This project was created as a capstone for NYU’s Interactive Media Arts program, blending code, critical research, and public engagement. It’s inspired by real-world surveillance tools like Clearview AI and PimEyes, as well as artistic critiques like Coppelgänger and Exposing.ai. By putting these ideas into your hands, The Bias Effect turns passive concern into active confrontation.</h4>
                <h4>You don’t need to be a programmer or a policy expert to understand the risks of facial recognition. You just need to see it in action.</h4>
            </div>

            <div className={styles.buttonWrapper}>
                <Button onClick={goToExperience} text={"Begin"}/>
            </div>


        </div>

    )
}