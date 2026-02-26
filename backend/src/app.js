const express = require("express");
const cors = require("cors");
const app = express();

const contactRoutes = require("./routes/contactRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running successfully! 🚀 Check /api/hello for API status.");
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express 🚀" });
});


module.exports = app;
