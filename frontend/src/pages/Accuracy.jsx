import styles from '../styles/Accuracy.module.css'
import { useEffect, useState } from "react";
import ModelCard from "../components/ModelCard"

export default function Accuracy() {
    const [showAccuracy, setShowAccuraccy] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAccuraccy(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);
    
    const fakeModelData = {
        name: "Age",
        result: "25-30 years",
        accuracy: "92.4%",
        showAccuracy: showAccuracy
    };

    const fakeModelData2 = {
        name: "Race",
        result: "White",
        accuracy: "53.4%",
        showAccuracy: showAccuracy
    };
    return (
        // <EmotionBlameSequence/>
        <div className={styles.main}>
            <ModelCard
                name={fakeModelData.name}
                result={fakeModelData.result}
                accuracy={fakeModelData.accuracy}
                showAccuracy={fakeModelData.showAccuracy} />
            <ModelCard
                name={fakeModelData2.name}
                result={fakeModelData2.result}
                accuracy={fakeModelData2.accuracy}
                showAccuracy={fakeModelData2.showAccuracy} />
        </div>
    )
}
