import styles from '../styles/Online.module.css'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const sampleData = {
    acne: "Clear Skin",
    aesthetic: "aesthetic",
    age: "10-19",
    attractiveness: "not attractive",
    beard: "No Beard",
    emotion: "sad",
    face_shape: "Heart",
    facemask: "WithoutMask",
    filename: "7a1033e6339748e29e9f7ae6af787487.png",
    gender: "male",
    hair_length: "short human hair",
    hair_type: "wavy",
    race: "White",
    skin_type: "dry",
    smoker: "notsmoking"
}

// This needs a ton of updates

// Also need to add other screens

export default function Online({ data: propData }) {
    const location = useLocation();
    const routerData = location.state?.data;

    const { age, race, acne, aesthetic, attractiveness, beard, emotion, face_shape, facemask, gender, hair_length, hair_type, skin_type, smoker } = { ...sampleData, ...routerData, ...propData };

    return (
        <div className={styles.main}>
            <div className={styles.pageTitle}>
                <h1>How AI Sees You</h1>
            </div>
            <div className={styles.lastPageResults}>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Estimated Age Range</p>
                    <p className={styles.dataText}><strong>{age}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Identified Race</p>
                    <p className={styles.dataText}><strong>{race}</strong></p>
                </div>
            </div>
            <div className={styles.restOfResults}>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Acne</p>
                    <p className={styles.dataText}><strong>{acne}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Aesthetic</p>
                    <p className={styles.dataText}><strong>{aesthetic}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Attractiveness</p>
                    <p className={styles.dataText}><strong>{attractiveness}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>beard</p>
                    <p className={styles.dataText}><strong>{beard}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Emotion</p>
                    <p className={styles.dataText}><strong>{emotion}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Face Shape</p>
                    <p className={styles.dataText}><strong>{face_shape}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Facemask</p>
                    <p className={styles.dataText}><strong>{facemask}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Gender</p>
                    <p className={styles.dataText}><strong>{gender}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Hair Length</p>
                    <p className={styles.dataText}><strong>{hair_length}</strong></p>
                </div>

                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Hair Type</p>
                    <p className={styles.dataText}><strong>{hair_type}</strong></p>
                </div>

                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Skin Type</p>
                    <p className={styles.dataText}><strong>{skin_type}</strong></p>
                </div>

                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Are you a Smoker</p>
                    <p className={styles.dataText}><strong>{smoker}</strong></p>
                </div>
            </div>
        </div>
    );
}

Online.propTypes = {
    data: PropTypes.object,
};
