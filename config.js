require('dotenv').config();
module.exports = {
    database: process.env.MONGODB_URI || "mongodb://localhost:27017/chakra",
}