import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import styles from "../styles/EmotionBlame.module.css";

// Emotions.js
export default function Emotions({ flickerOut = false, fadeInActive = false }) {
    return (
      <div className={styles.popUpText}>
        <h1
          className={`
            ${styles.slideUp} 
            ${styles.slideUp1} 
            ${fadeInActive ? styles.fadeIn : ''} 
            ${flickerOut ? styles.flickerOut : ''}
          `}
        >
          Suprised?
        </h1>
        <h1
          className={`
            ${styles.slideUp} 
            ${styles.slideUp2} 
            ${fadeInActive ? styles.fadeIn : ''} 
            ${flickerOut ? styles.flickerOut : ''}
          `}
        >
          Offended?
        </h1>
        <h1
          className={`
            ${styles.slideUp} 
            ${styles.slideUp3} 
            ${fadeInActive ? styles.fadeIn : ''} 
            ${flickerOut ? styles.flickerOut : ''}
          `}
        >
          Confused?
        </h1>
      </div>
    );
  }
  


Emotions.propTypes = {
  flickerOut: PropTypes.bool,
  fadeInActive: PropTypes.bool
};
