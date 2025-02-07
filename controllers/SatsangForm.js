const SatsangForm = require("../models/SatsangForm");

const createSatsangForm = async (req, res) => {
    try {
        const formdata = { ...req.body };

        if (formdata.satsangDate) {
            formdata.satsangDate = new Date(formdata.satsangDate);
        }

        formdata.submitted=true;
        const satsangForm = await SatsangForm.create(formdata);
        return res.status(201).json({
            success: true,
            message: "Attendance Form created successfully",
            satsangForm,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};
const getSatsangForms = async (req, res) => {
    try {
        const { startDate, satsangPlace, typeofSatsang } = req.query; // Extract query parameters

        let query = {}; // Initialize query object

        if (satsangPlace) {
            query.satsangPlace = satsangPlace; // Filter by satsangPlace if provided
        }

        if (typeofSatsang) {
            query.typeofSatsang = typeofSatsang; // Filter by typeofSatsang if provided
        }

        if (startDate) {
            query.satsangDate = { $gte: new Date(startDate) }; // Filter by date if provided
        }
      

        const forms = await SatsangForm.find(query).sort({ satsangDate: -1 });

        res.status(200).json({
            success: true,
            count: forms.length,
            data: forms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch satsang forms"
        });
    }
};

const submittedSatsangGhar = async (req,res)=>{
    try{
       const {submitted, startDate} = req.query;
       if(!Date ){
           return res.status(400).json({success:false, message:"Please provide date status"});

       }
       const startDateobj = new Date(startDate);
    

       const satsangforms= await SatsangForm.find({submitted:true, satsangDate:{$gte:startDateobj}});
       
       const satsangGhar = satsangforms.map(form=>form.satsangPlace);
       console.log(satsangGhar);
       

       return res.status(200).json({
           success:true,
           count:satsangGhar.length,
           data:satsangGhar
    });
    }
    catch(error){
      console.error(error);
      return res.status(500).json({
          success:false,
          message:error.message || "Internal server error"
    });

}
};
    

module.exports = { createSatsangForm, getSatsangForms,submittedSatsangGhar };

