require('dotenv').config();
const express = require("express")
const cors = require("cors")
const axios = require("axios");


const app = express();
const PORT = process.env.PORT || 5002

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})