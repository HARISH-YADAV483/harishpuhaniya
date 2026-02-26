const mongoose = require("mongoose");
const User = require("./src/models/user.model");
require("dotenv").config();

async function checkDB() {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/project2");
    const users = await User.find({ email: "test@example.com" });
    console.log("Users found:", JSON.stringify(users, null, 2));
    await mongoose.disconnect();
}

checkDB();
