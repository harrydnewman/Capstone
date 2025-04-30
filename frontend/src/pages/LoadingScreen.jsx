import styles from '../styles/LoadingScreen.module.css';
import PropTypes from "prop-types";

export default function LoadingScreen({ progress }) {
  const text = "How AI Sees You";
  const maxProgress = 14;
  const shouldVanish = progress >= maxProgress;

  return (
    <div className={styles.main}>
      <h1 className={`${styles.glowText} ${shouldVanish ? styles.glitchVanish : ''}`}>
        {text.split("").map((char, i) => {
          const percentPerChar = maxProgress / text.length;
          const charThreshold = (i + 1) * percentPerChar;

          return (
            <span
              key={i}
              style={{
                opacity: progress >= charThreshold ? 1 : 0.1,
                filter: `drop-shadow(0 0 ${progress >= charThreshold ? 4 : 0}px white)`,
                transition: "all 0.3s ease",
                display: "inline-block",
                marginRight: char === " " ? "0.01em" : "0",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </h1>
    </div>
  );
}

LoadingScreen.propTypes = {
    progress: PropTypes.number,
};