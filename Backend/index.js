const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pool = require('./db');

const PORT = process.env.PORT || 3000;
const app = express(); // instance of express application. 

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


// start the server
app.listen(PORT, () => {
    console.log("Server is running on 3000");
})

// Setup Multer storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // directory to store files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extreme(file.originalname)); //unique filename
    },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Route to handle file upload 
app.post('/upload', upload.single('file'), async (req, res) => {
    const { file } = req;
    const { filename } = file;
    try {
        // Insert file path into db
        const query = 'INSERT INTO files (filename) VALUES ($1) RETURNING *';
        const result = await pool.query(query, [filename]);

        res.json({ message: 'File uploaded successfully', file: result.rows[0] });

    } catch (error) {
        console.error('Error saving file to the database:', error);
        res.status(500).json({ message: 'Error saving file' });
    }
})