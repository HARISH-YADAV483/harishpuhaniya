const express = require("express");
const cors = require("cors");
const app = express();

const contactController = require("./controllers/contactController");

app.use(cors());
app.use(express.json());

app.post("/api/contact", contactController.createContact);

app.get("/", (req, res) => {
    res.send("Backend is running successfully!  Check /api/hello for API status.");
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express " });
});


module.exports = app;
