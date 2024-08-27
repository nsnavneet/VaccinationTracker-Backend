const Vaccine = require('../models/vaccineModel');

const getAllVaccines = async () => {
  try {
    const vaccines = await Vaccine.getAllVaccines();
    return vaccines;
  } catch (error) {
    throw new Error('Error fetching vaccines');
  }
};

const getVaccinesByAgeRange = async (age_range_id) => {
  try {
    const vaccines = await Vaccine.getVaccinesByAgeRange(age_range_id);
    return vaccines;
  } catch (error) {
    throw new Error('Error fetching vaccines for the specified age range');
  }
};

module.exports = { getAllVaccines, getVaccinesByAgeRange };
