const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
    try {
        const { name, lastname, email, number, message } = req.body;

        if (!name || !lastname || !email) {
            return res.status(400).json({ message: "Name, Lastname, and Email are required." });
        }

        const newContact = new Contact({
            name,
            lastname,
            email,
            number,
            message,
        });

        await newContact.save();

        res.status(201).json({ message: "Thanks for submission!" });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
