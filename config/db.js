const mongoose = require("mongoose");
const colors = require("colors");

const connectedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conneted with MogoDB ${mongoose.connection.host}`.bgYellow.white);
    } catch (error) {
        console.log(`${error}: connection failed`.bgRed.white);
    }
}
module.exports = connectedDB;
