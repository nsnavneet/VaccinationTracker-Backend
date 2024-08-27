const express = require('express');
const { addScheduleController, getScheduleController } = require('../controllers/scheduleController');
const router = express.Router();

router.post('/', addScheduleController);
router.get('/:childId', getScheduleController);

module.exports = router;
