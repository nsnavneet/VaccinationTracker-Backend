const { addSchedule, getScheduleByChildId } = require('../services/scheduleService');

const addScheduleController = async (req, res) => {
  try {
    const schedule = await addSchedule(req.body);
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScheduleController = async (req, res) => {
  try {
    const { childId } = req.params;
    const schedule = await getScheduleByChildId(childId);
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addScheduleController, getScheduleController };
