import styles from "../styles/EmotionBlame.module.css";
import Emotions from "../components/Emotions";
import Blame from "../components/Blame";
import { useEffect, useState } from "react";

export default function EmotionBlameSequence() {
  const [showEmotions, setShowEmotions] = useState(true);
  const [fadeInEmotions, setFadeInEmotions] = useState(false);
  const [flickerOutEmotions, setFlickerOutEmotions] = useState(false);
  const [showBlame, setShowBlame] = useState(false);

  useEffect(() => {
    // ✅ Smooth first frame controlled start
    const animationFrame = requestAnimationFrame(() => {
      setFadeInEmotions(true);
    });

    const flickerOutTimer = setTimeout(() => {
      setFlickerOutEmotions(true);
    }, 4500);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(flickerOutTimer);
    };
  }, []);

  useEffect(() => {
    if (flickerOutEmotions) {
      const timeout = setTimeout(() => {
        setShowEmotions(false);
        setShowBlame(true);
      }, 600); // match flickerOut animation
      return () => clearTimeout(timeout);
    }
  }, [flickerOutEmotions]);

  return (
    <div className={styles.sequenceWrapper}>
      {showEmotions && (
        <div className={`${styles.fade} ${fadeInEmotions ? styles.fadeIn : ''}`}>
        <Emotions flickerOut={flickerOutEmotions} fadeInActive={fadeInEmotions} />
        </div>
      )}
      {showBlame && (
        <div className={`${styles.fade} ${styles.fadeIn}`}>
          <Blame />
        </div>
      )}
    </div>
  );
}

// EmotionBlameSequence.js
// export default function EmotionBlameSequence() {
//   const [showEmotions, setShowEmotions] = useState(true);
//   const [fadeInEmotions, setFadeInEmotions] = useState(false);
//   const [flickerOutEmotions, setFlickerOutEmotions] = useState(false);

//   useEffect(() => {
//     // after 1 frame, set fadeIn to true
//     const animationFrame = requestAnimationFrame(() => {
//       setFadeInEmotions(true);
//     });

//     // after 4.5s, flicker out
//     const flickerOutTimer = setTimeout(() => {
//       setFlickerOutEmotions(true);
//     }, 4500);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       clearTimeout(flickerOutTimer);
//     };
//   }, []);

//   return (
//     <div className={styles.sequenceWrapper}>
//       {showEmotions && (
//         <div className={`${styles.fade} ${fadeInEmotions ? styles.fadeIn : ''}`}>
//           <Emotions
//             flickerOut={flickerOutEmotions}
//             fadeInActive={fadeInEmotions} // pass down
//           />
//         </div>
//       )}

//     </div>
//   );
// }
