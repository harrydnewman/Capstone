import React, { useState } from "react";
// import styles from "..styles/Test.module.css";
import styles from '../styles/Test.module.css'

export default function Test() {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        console.log('Button clicked!');
        setExpanded(!expanded)
      };

    return (
        <div className={styles.container}>
            <div className={`${styles.box} ${expanded ? styles.leftCollapsed : styles.leftExpanded}`}>
                <button onClick={() => handleClick()}>Toggle</button>
            </div>
            <div className={`${styles.box} ${expanded ? styles.rightExpanded : styles.rightCollapsed}`}>
                <p>This div expands!</p>
            </div>
        </div>
    );
}
