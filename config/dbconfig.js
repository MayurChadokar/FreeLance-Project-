const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const dbconnect = async () => {
    try{
        await mongoose.connect(process.env.DATABASEURL);
                console.log("DB connected successfully");
    }
    catch(error){
        console.log("Error in connecting to DB");
        console.log(error);
        process.exit(1);


    }
};

module.exports = dbconnect;