const { getAllVaccines, getVaccinesByAgeRange } = require('../services/vaccineService');

const getVaccines = async (req, res) => {
  try {
    const vaccines = await getAllVaccines();
    res.json(vaccines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVaccinesForAgeRange = async (req, res) => {
  try {
    const { age_range_id } = req.params;
    const vaccines = await getVaccinesByAgeRange(age_range_id);
    res.json(vaccines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getVaccines, getVaccinesForAgeRange };