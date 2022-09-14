const mongoose = require('mongoose');
const app = require("./app");

const PORT = 3000;
const urlMongoDB = "mongodb+srv://admin:1234@taskdb.3boyenr.mongodb.net/?retryWrites=true&w=majority";

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




