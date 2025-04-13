import { useEffect, useState } from 'react';
import ModelCard from '../components/ModelCard';
import styles from '../styles/Test.module.css';

import ShowData from './ShowData';
export default function Test() {
    const testData = {
        acne: "Clear Skin",
        aesthetic: "aesthetic",
        age: "20-29",
        attractiveness: "not attractive",
        beard: "No Beard",
        emotion: "neutral",
        face_shape: "Diamond",
        facemask: "WithoutMask",
        gender: "male",
        hair_length: "short human hair",
        hair_type: "wavy",
        race: "White",
        skin_type: "dry",
        smoker: "notsmoking",
    };
    return (
        <ShowData data={testData}/>
    );
}
