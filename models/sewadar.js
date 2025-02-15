const mongoose = require('mongoose');

const sewadarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
   grNumber:{
         type:String,
         required:true,
         unique:true
   },   
   department:{
         type:String,
         required:true
   },
   Gender:{
            type:String,
            required:true,
            enum:[Male,female],
   }
   
})