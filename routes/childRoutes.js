const express = require('express');
const { addChildController } = require('../controllers/childController');
const router = express.Router();

router.post('/', addChildController);

module.exports = router;
