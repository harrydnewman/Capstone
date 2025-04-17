import { useEffect, useState } from 'react';
import styles from '../styles/Test.module.css';
import ShowData from './ShowData';
import EmotionBlameSequence from './EmotionBlameSequence';
import Accuracy from './Accuracy';
import NewStart from './newStart';
import LoadingScreen from './LoadingScreen';
import fetchData from '../api/fetchData';

export default function Experience() {
    const [photo, setPhoto] = useState(null)
    const [data, setData] = useState(null)
    const [showWebcam, setShowWebcam] = useState(true)
    const [showData, setShowData] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [showSweep, setShowSweep] = useState(false);
    const [showAccuracy, setShowAccuracy] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [progress, setProgress] = useState(0);



    const handleContinue = () => {
        setShowSweep(true);

        setTimeout(() => {
            setShowData(false);
            setShowNext(true);
        }, 600); 

        setTimeout(() => {
            setShowSweep(false);
        }, 1200); 

        setTimeout(() => {
            setShowNext(false);
            setShowAccuracy(true);
        }, 8500); 
    };

    useEffect(() => {
        if (photo) {
          setShowSweep(true);
      
          setTimeout(() => {
            setShowWebcam(false);
            setShowSweep(false);
            setShowLoading(true);
          }, 1400);
      
          console.log("new photo");
          console.log(photo);
      
          async function getDataAndSet() {
            const result = await fetchData(photo, (completed) => setProgress(completed));
            setData(result); // ✅ Now you set the actual result
          }
      
          getDataAndSet();
        }
      }, [photo]);

     useEffect(() => {
        if(data){
            console.log("new data")
            console.log(data)
        }
     }, [data])

     useEffect(() => {
        if(progress == 14){
            console.log("progress is done")
            setTimeout(() => {
                setShowLoading(false)
            setShowData(true)
              }, 2000);
            
        }
     }, [progress])
     

    return (
        

        <div className={styles.main}>
        {showWebcam && <NewStart onPhotoCaptured={(img) => setPhoto(img)} />}
        {showLoading && <LoadingScreen progress={progress}/>}
           {showData && <ShowData data={data} onContinue={handleContinue} />}

{showSweep && <div className={styles.sweepOverlay} />}
{showNext && 
               <div className={styles.nextContent}>
                    <EmotionBlameSequence />
               </div>
            } 
            {showAccuracy && <Accuracy data={data}/>}

            
         </div>
    );
}