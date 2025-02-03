const SatsangForm = require("../models/SatsangForm");

const createSatsangForm = async (req, res) => {
    try {
        const formdata = { ...req.body };

        if (formdata.satsangDate) {
            formdata.satsangDate = new Date(formdata.satsangDate);
        }

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
    

module.exports = { createSatsangForm, getSatsangForms };
