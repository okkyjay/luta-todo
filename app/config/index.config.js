require('dotenv').config()

module.exports = {
    db_url: process.env.DB_URL,
    token_secret: process.env.TOKEN_SECRET,
    token_lifetime: process.env.TOKEN_LIFE,
}