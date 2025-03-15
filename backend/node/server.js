const express = require("express");
const multer = require("multer");
const path = require("path");
const FormData = require("form-data")
const axios = require("axios");
const cors = require('cors');

const app = express();
const PORT = 5151;
app.use(cors({ origin: "http://localhost:5173" }));
// Set up storage with filename preservation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filenames
    }
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Ensure "uploads" folder exists
const fs = require("fs");
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}


// Get age and race from upload
async function getAgeAndRace(imagePath, imageName){
    const url = "http://127.0.0.1:5000/upload";

    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath))

    try {

        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders(), // ✅ Ensures correct headers for multipart encoding
            },
        });


        const data = await response.data; // Parse response JSON
        return data
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
// API endpoint to handle file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const fileName = req.file.filename
        const filePath = req.file.path

        const ageAndRace = await getAgeAndRace(filePath, fileName)
        console.log(ageAndRace)
    
        // need to update this json to return as normal 
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });
        res.json(ageAndRace);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error });
    }
   
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
