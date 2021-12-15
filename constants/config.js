require('dotenv').config();

module.exports = config = {
    PORT: process.env.PORT || 3000, // port to used for the app
    SECRET_KEY_FILE_PATH: process.env.SECRET_KEY_FILE_PATH // passport key file path used for authentication 
}