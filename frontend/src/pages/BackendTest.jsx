// import TestImage from '../assets/janedl.png?url';
// import styles from '../styles/backendtest.module.css';
// import { useState } from 'react';

// const uploadFile = async (fileUrl) => {
//     const url = "http://localhost:5151/upload"; // Change this to your backend endpoint
//     const formData = new FormData();
    
//     // Fetch the image as a Blob (since it's a static import)
//     const response = await fetch(fileUrl);
//     const blob = await response.blob();
    
//     formData.append("file", blob, TestImage);

//     try {
//         const uploadResponse = await fetch(url, {
//             method: "POST",
//             body: formData,
//         });

//         if (!uploadResponse.ok) {
//             throw new Error(`HTTP error! Status: ${uploadResponse.status}`);
//         }

//         const result = await uploadResponse.json();
//         // console.log("Upload successful:", result);
//         return result;
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         return null;
//     }
// };

// export default function BackendTest() {
//     const [status, setStatus] = useState("Upload");
//     const [data, setData] = useState("");
//     const [race, setRace] = useState("");
//     const [age, setAge] = useState("");
//     const [ageAccuracy, setAgeAccuracy] = useState("");

//     const handleUpload = async () => {
//         setStatus("Uploading...");
//         const response = await uploadFile(TestImage);
//         console.log(response)
//         if (response) {
//             setStatus("Uploaded");
//             setData("Upload successful");
//             setAge(response.ageRange)
//             setAgeAccuracy(response.ageAccuracy)
//             setRace(response.raceClassification)
//         } else {
//             setStatus("Upload Failed");
//         }
//     };

//     return (
//         <div className={styles.backendTest}>
//             <h1>Backend Test</h1>
//             <img src={TestImage} alt="TestImage" />

//             <button onClick={handleUpload}>
//                 {status}
//             </button>
//             {data.length > 0 ? <p>{data}</p> : <p>No data available</p>}
//             {race.length > 0 ? <p>Race: {race}</p> : <p></p>}
//             {age.length > 0 ? <p>Age: {age}</p> : <p></p>}
//             {ageAccuracy.length > 0 ? <p>Age Accuracy: {ageAccuracy}</p> : <p></p>}
//         </div>
//     );
// }


export default function BackendTest(){
    return (
        <h1>Hi</h1>
    )
}