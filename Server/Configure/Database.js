const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;

exports.dbConnect = () => {
    mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((error) => {
        console.log("DB connection failed");
        console.log("error : ", error);
        process.exit(1);
    })
}