
const express = require('express');
const router = express.Router();
const { createSatsangForm, getSatsangForms,submittedSatsangGhar } = require('../controllers/SatsangForm');
const protect = require('../middlewares/protect');


router.post('/form',createSatsangForm);
router.get('/satsangGhar',protect,  getSatsangForms);
router.get('/status',protect,submittedSatsangGhar);


module.exports = router;