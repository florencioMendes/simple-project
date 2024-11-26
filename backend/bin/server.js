require('dotenv').config();
const express = require("express");
const app = express();

const PORT = ((port) => port >= 0 && port)(parseInt(process.env.SERVICE_PORT, 10) || 3333)
app.listen(PORT, () => console.log(`App listening on port: ${PORT}!`))
app.use(express.json())

module.exports = { app }