const mongoose = require("mongoose");
const Contact = require("./src/models/Contact");
require("dotenv").config();

async function checkContacts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
        console.log("Last 5 contacts:");
        console.log(JSON.stringify(contacts, null, 2));

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

checkContacts();
