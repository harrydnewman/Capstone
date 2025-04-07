import React, { useState, useEffect } from 'react';
import Start from './Start';
import Online from './Online';
import styles from '../styles/Experience.module.css';

export default function Experience() {
    const [currentScreen, setCurrentScreen] = useState('start');
    const [fade, setFade] = useState('fadeIn');

    const handleChangeOnline = () => {
        setFade('fadeOut');

        setTimeout(() => {
            setCurrentScreen('online');
            setFade('fadeIn');
        }, 500); // match CSS duration
    };

    return (
        <div className={`${styles.screenContainer} ${styles[fade]}`}>
            {currentScreen === 'start' && <Start onChangeToOnline={handleChangeOnline} />}
            {currentScreen === 'online' && <Online />}
        </div>
    );
}
