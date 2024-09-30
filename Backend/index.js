const express = require('express');
const cors = require('cors');
const connectToDB = require('./db');

const PORT = process.env.PORT || 3000;
const app = express(); // instance of express application. 

app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());

connectToDB();

// start the server
app.listen(PORT,()=>{
    console.log("Server is running on 3000");
})