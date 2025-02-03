
const express = require('express');
const router = express.Router();
const { createSatsangForm, getSatsangForms } = require('../controllers/SatsangForm');


router.post('/form', createSatsangForm);
router.get('/satsangGhar', getSatsangForms);

module.exports = router;