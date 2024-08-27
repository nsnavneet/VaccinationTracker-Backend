const { addChild } = require('../services/childService');

const addChildController = async (req, res) => {
  try {
    const child = await addChild(req.body);
    res.json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addChildController };
