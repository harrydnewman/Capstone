import styles from '../styles/ModelCard.module.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function ModelCard({ name, result, showAccuracy, style, className }) {
    const [animateAccuracy, setAnimateAccuracy] = useState(false);

    useEffect(() => {
        if (showAccuracy) {
            setAnimateAccuracy(true);
        }
    }, [showAccuracy]);

    const models = [
        { name: "imfarzanansari/skintelligent-acne", classification: "acne", outputs: ["Clear Skin", "Occasional Spots", "Mild Acne", "Moderate Acne", "Severe Acne", "Very Severe Acne"], accuracy: "Unknown", accuracyNotes: "(Accuracy rates not disclosed)" },
        { name: "cafeai/cafe_aesthetic", classification: "Image Appeal", outputs: ["aesthetic", "not_aesthetic"], accuracy: "Unknown", accuracyNotes: "(Accuracy rates not disclosed)" },
        { name: "dima806/fairface_age_image_detection", classification: "Age", outputs: ["0-2", "3-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "more than 70"], accuracy: "58.92%" },
        { name: "dima806/attractive_faces_celebs_detection", classification: "Attractiveness", outputs: ["attractive", "not attractive"], accuracy: "83.79%" },
        { name: "dima806/beard_face_image_detection", classification: "Beard", outputs: ["Beard", "No Beard"], accuracy: "100%", accuracyNotes: "(Not Verified)" },
        { name: "dima806/facial_emotions_image_detection", classification: "Emotion", outputs: ["sad", "disgust", "angry", "neutral", "fear", "surprise", "happy"], accuracy: "90.92%" },
        { name: "metadome/face_shape_classification", classification: "Face Shape", outputs: ["Heart", "Oblong", "Oval", "Round", "Square"], accuracy: "85.30%" },
        { name: "Heem2/Facemask-detection", classification: "Face Mask", outputs: ["WithMask", "WithoutMask"], accuracy: "99.53%" },
        { name: "rizvandwiki/gender-classification", classification: "Gender", outputs: ["female", "male"], accuracy: "92.44%" },
        { name: "Leilab/hair_lenght", classification: "Hair Length", outputs: ["long hair", "short human hair"], accuracy: "88.89%" },
        { name: "dima806/hair_type_image_detection", classification: "Hair Type", outputs: ["curly", "dreadlocks", "kinky", "straight", "wavy"], accuracy: "92.80%" },
        { name: "dima806/skin_types_image_detection", classification: "Skin Type", outputs: ["dry", "normal", "oily"], accuracy: "65.34%" },
        { name: "dima806/smoker_image_classification", classification: "Smoker", outputs: ["notsmoking", "smoking"], accuracy: "96.88%" },
        { name: "Anzhc/Race-Classification-FairFace-YOLOv8", classification: "Race", outputs: ["Black", "East Asian", "Indian", "Latino_Hispanic", "Middle Eastern", "Southeast Asian", "White"], accuracy: "73.50%" }
    ];

    const keyToClassificationMap = {
        aesthetic: "Image Appeal",
        face_shape: "Face Shape",
        facemask: "Face Mask",
        hair_length: "Hair Length",
        hair_type: "Hair Type",
        skin_type: "Skin Type",
        smoker: "Smoker",
        attractiveness: "Attractiveness",
        emotion: "Emotion",
        beard: "Beard",
        gender: "Gender",
        age: "Age",
        acne: "acne",
        race: "Race"
    };

    function formatName(key) {
        const classificationName = keyToClassificationMap[key.toLowerCase()] || key;
        return classificationName.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    }
    

    function formatValue(key, value) {
        const capitalizeWords = (str) =>
            str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        switch (key) {
            case "hair_length":
                if (value === "short human hair") return "Short";
                if (value === "long hair") return "Long";
                break;
            case "aesthetic":
                if (value === "not_aesthetic") return "Not Aesthetic";
                return capitalizeWords(value);
            case "attractiveness":
            case "hair_type":
            case "emotion":
            case "gender":
            case "skin_type":
                return capitalizeWords(value);
            case "facemask":
                if (value === "WithoutMask") return "No Mask";
                if (value === "WithMask") return "Wearing Mask";
                break;
            case "smoker":
                if (value === "notsmoking") return "Non-Smoker";
                if (value === "smoking") return "Smoker";
                break;
            default:
                return value;
        }
        return value;
    }

    function getModelDataByKey(key) {
        const classificationName = keyToClassificationMap[key.toLowerCase()] || key;
        return models.find(m => m.classification.toLowerCase() === classificationName.toLowerCase());
    }

    function getOriginalKeyFromName(displayName) {
        const reverseMap = Object.entries(keyToClassificationMap).find(([, value]) => value === displayName);
        return reverseMap ? reverseMap[0] : displayName.toLowerCase().replace(/\s+/g, '_');
    }

    const originalKey = getOriginalKeyFromName(name);
    const formattedName = formatName(name);
    const formattedResult = formatValue(originalKey, result);
    const modelData = getModelDataByKey(originalKey);
    const finalAccuracy = modelData ? modelData.accuracy : "N/A";
    const accuracyNotes = modelData?.accuracyNotes;

    return (
        <div className={`${styles.main} ${className || ''}`} style={style}>
            <h2 className={styles.modelName}>{formattedName}</h2>
            <h1 className={styles.modelResult}>{formattedResult}</h1>
            {showAccuracy && (
                <div className={`${styles.accuracyDiv} ${animateAccuracy ? styles.accuracyDivActive : ''}`}>
                    <h2 className={styles.modelName}>Accuracy</h2>
                    <h1 className={styles.modelResult}>{finalAccuracy}</h1>
                    {accuracyNotes && <p className={styles.accuracyNotes}>{accuracyNotes}</p>}
                </div>
            )}
        </div>
    );
}

ModelCard.propTypes = {
    name: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    showAccuracy: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string
};
