module.exports = {require('dotenv').config()
    database: process.env.MONGOHQ_URL || "mongodb://localhost:27017/chakra",
                }