const mongoose= require('mongoose');


const satsangDetailsSchema = new mongoose.Schema({
    satsangKarta: {
      type: String,
      trim: true,

      required: function() {
        return this.typeofSatsang === "Satsang Karta";
      }
    },
    satsangReader: {
      type: String,
      trim: true,
     
      required: function() {
        return this.typeofSatsang === "Satsang Reader";
      }
    },
    pathi: {
      type: String,
      trim: true,
      
      required: function() {
        return ["Satsang Karta", "Satsang Reader"].includes(this.typeofSatsang);
      }
    },
    shabad: {
      type: String,
      required: true,
      trim: true
    }
  });
  
  const satsangFormSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    satsangDay:{
         type:String,
         required:true,
         enum: ["Sunday","Thursday"],
          trim:true 
    },
    satsangDate: {
      type: Date,
      required: true
    },
    satsangPlace: {
      type: String,
      required: true,
      enum: [
        "Bagdi", "Banderi", "Barjar", "Bhimfaliya", "Bhulgaon", "Bidwal","Bakhatpura",
        "Dhamnod", "Dhar", "Indrapur", "Kanwan", "Kathiwada", "Khadki",
        "Khedi", "Kherwas", "Karwad","Meghnagar", "Nagda", "Pipliya", "Piprideb",
        "Pithampur", "Rajgarh", "Sakad", "Sandla", "Sendhwa", "Upari",
        "Wadlipada"
      ],
      trim: true
    },
    sangatmale: {
      type: Number,
      required: true,
      min: 0
    },
    sangatfemale: {
      type: Number,
      required: true,
      min: 0
    },
    totalsangat: {
      type: Number,
      required: true,
      min: 0
    },
    children: {
      type: Number,
      required: true,
      min: 0
    },
    totalsangatMaleFemaleChildren: {
      type: Number,
      required: true,
      min: 0
    },
    twowheeler: {
      type: Number,
      required: true,
      min: 0
    },
    fourwheeler: {
      type: Number,
      required: true,
      min: 0
    },
    cycle:{
      type:Number,
      required:true,
    },
    other: {
      type: Number,
      required: true,
      min: 0
    },
    sewadarMale: {
      type: Number,
      required: true,
      min: 0
    },
    sewadarfemale: {
      type: Number,
      required: true,
      min: 0
    },
    submitted:{
      type: Boolean,
      default: false
    },

    typeofSatsang: {
      type: String,
      required: true,
      enum: [
        "Satsang Karta",
        "Satsang Reader",
        "Audio CD Punjabi",
        "Audio CD Hindi",
        "Video CD"
      ],
      trim: true
    
    },
    
    satsangDetails: satsangDetailsSchema
  }, {
    timestamps: true
  });


  satsangFormSchema.pre('save', function(next) {
   
    if (this.totalsangat !== (this.sangatmale + this.sangatfemale)) {
      throw new Error('Total sangat must equal sum of male and female sangat');
    }
  
    
    if (this.totalsangatMaleFemaleChildren !== (this.totalsangat + this.children)) {
      throw new Error('Total sangat with children must equal sum of total sangat and children');
    }

   next();
  })
  
 module.exports = mongoose.model("SatsangForm", satsangFormSchema);