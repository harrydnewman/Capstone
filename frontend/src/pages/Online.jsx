import styles from '../styles/Online.module.css'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const sampleData = {
    ageRange: '20-29',
    ageAccuracy: '62.76%',
    raceClassification: 'White',
};

export default function Online({ data: propData }) {
    const location = useLocation();
    const routerData = location.state?.data;

    const { ageRange, ageAccuracy, raceClassification } = { ...sampleData, ...routerData, ...propData };

    return (
        <div className={styles.main}>
            <div className={styles.pageTitle}>
                <h1>Where You Show Up Online</h1>
            </div>
            <div className={styles.lastPageResults}>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Estimated Age Range</p>
                    <p className={styles.dataText}><strong>{ageRange}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Age Detection Confidence</p>
                    <p className={styles.dataText}><strong>{ageAccuracy}</strong></p>
                </div>
                <div className={styles.lastPageResultsSection}>
                    <p className={styles.dataHeader}>Identified Race</p>
                    <p className={styles.dataText}><strong>{raceClassification}</strong></p>
                </div>
            </div>
            <div className={styles.holder}>
                <h1>More Coming Soon</h1>
            </div>
        </div>
    );
}

Online.propTypes = {
    data: PropTypes.object,
};
