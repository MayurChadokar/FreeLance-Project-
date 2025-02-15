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
    // try {
    //     let formdata = { ...req.body };
    
    //     if (!formdata.satsangDate) {
    //         return res.status(400).json({ success: false, message: "Satsang Date is required" });
    //     }
    
    //     // Convert "dd-mm-yyyy" to "yyyy-mm-dd" for MongoDB
    //     const [day, month, year] = formdata.satsangDate.split("-");
    //     const isoDate = new Date(`${year}-${month}-${day}`);
    
    //     if (isNaN(isoDate.getTime())) {
    //         return res.status(400).json({ success: false, message: "Invalid Date Format" });
    //     }
    
    //     formdata.satsangDate = isoDate; // Store in MongoDB as Date
    
    //     const satsangForm = await SatsangForm.create(formdata);
      
    
    //     return res.status(201).json({
    //         success: true,
    //         message: "Attendance Form created successfully",
    //         satsangForm,
    //     });
    
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({
    //         success: false,
    //         message: "Internal server error",
    //         error: err.message,
    //     });
    // }
    
    
};
const getSatsangForms = async (req, res) => {
    try {
        const { startDate, satsangPlace, satsangDay } = req.query; // Extract query parameters

        let query = {}; // Initialize query object

        if (satsangPlace) {
            query.satsangPlace = satsangPlace; // Filter by satsangPlace if provided
        }

         if(satsangDay){
            query.satsangDay = satsangDay; // Filter by satsangDay if provided
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

// const submittedSatsangGhar = async (req,res)=>{
//     try{
//        const {submitted, startDate} = req.query;
//        if(!Date ){
//            return res.status(400).json({success:false, message:"Please provide date status"});

//        }
//        const startDateobj = new Date(startDate);
    

//        const satsangforms= await SatsangForm.find({submitted:true, satsangDate:{$gte:startDateobj}});
       
//        const satsangGhar = satsangforms.map(form=>form.satsangPlace);
//        console.log(satsangGhar);
       

//        return res.status(200).json({
//            success:true,
//            count:satsangGhar.length,
//            data:satsangGhar
//     });
//     }
//     catch(error){
//       console.error(error);
//       return res.status(500).json({
//           success:false,
//           message:error.message || "Internal server error"
//     });

// }
// };
    

// module.exports = { createSatsangForm, getSatsangForms,submittedSatsangGhar };

const submittedSatsangGhar = async (req, res) => {
    try {
        const { startDate } = req.query;

        if (!startDate) {
            return res.status(400).json({ success: false, message: "Please provide a valid start date" });
        }

        const startDateObj = new Date(startDate);

        // Fetch all submitted Satsang Ghars after the given date
        const satsangForms = await SatsangForm.find({
            submitted: true,
            satsangDate: { $gte:startDateObj}
        });

        // Extract submitted Satsang Ghars with dates
        const submittedData = satsangForms.map(form => ({
            name: form.satsangPlace,
            date: form.satsangDate,
            status:"submitted"
        }));

        // List of all 27 Satsang Ghars (Replace with actual names from your database)
        const allSatsangGhars = ["Bagdi", "Banderi", "Barjar", "Bhimfaliya", "Bhulgaon", "Bidwal","Bhaktpura",
        "Dhamnod", "Dhar", "Indrapur", "Kanwan", "Kathiwada", "Khadki",
        "Khedi", "Kherwas","Karwad", "Meghnagar", "Nagda", "Pipliya", "Piprideb",
        "Pithampur", "Rajgarh", "Sakad", "Sandla", "Sendhwa", "Upari",
        "Wadlipada"];

        // Compute Not Submitted Satsang Ghars
        const submittedNames = submittedData.map(entry => entry.name);  
        const notSubmitted = allSatsangGhars.filter(ghar => !submittedNames.includes(ghar)).map(ghar =>({name:ghar, date:startDateObj.toISOString().split("T")[0] ,status:"not submitted"}));
        const finalstatus =[...submittedData,...notSubmitted];

        return res.status(200).json({
            success: true,
            count: submittedData.length,
            total_satsang_ghars: allSatsangGhars.length,
            data: finalstatus
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

module.exports = { createSatsangForm, getSatsangForms, submittedSatsangGhar };
// module.exports = { submittedSatsangGhar };
