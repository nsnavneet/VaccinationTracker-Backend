const express = require('express');
const { getVaccines, getVaccinesForAgeRange } = require('../controllers/vaccineController');
const router = express.Router();

router.get('/', getVaccines);
router.get('/age-range/:age_range_id', getVaccinesForAgeRange);

module.exports = router;
