module.exports = {require('dotenv').config()
    database: process.env.MONGODB_URI || "mongodb://localhost:27017/chakra",
                }