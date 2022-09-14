const mongoose = require('mongoose');
const app = require("./app");
const dotenv = require('dotenv').config();


const PORT = 3000;
const urlMongoDB = process.env.urlMongo;

mongoose.connect(urlMongoDB, (err,res) => {
    try {
        if(err) {
            throw err;
        }
        else {
            console.log("DB Connected!");
            app.listen(PORT, () => console.log(`API listening in http://localhost:${PORT}`));
        }
        
    } catch (error) {
        console.log("DB not connected :( ");
    }
});




