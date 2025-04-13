import styles from '../styles/ModelCard.module.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function ModelCard({ name, result, accuracy, showAccuracy }) {
    const [animateAccuracy, setAnimateAccuracy] = useState(false);

    useEffect(() => {
        if (showAccuracy) {
            setAnimateAccuracy(true);
        }
    }, [showAccuracy]);

    return (
        <div className={styles.main}>
            <h2 className={styles.modelName}>{name}</h2>
            <h1 className={styles.modelResult}>{result}</h1>
            {showAccuracy && (
                <div className={`${styles.accuracyDiv} ${animateAccuracy ? styles.accuracyDivActive : ''}`}>
                    <h1>Accuracy</h1>
                    <h1>{accuracy}</h1>
                </div>
            )}
        </div>
    );
}

ModelCard.propTypes = {
    name: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    accuracy: PropTypes.string,
    showAccuracy: PropTypes.bool
};
