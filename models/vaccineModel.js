const pool = require('../config/database');

const getAllVaccines = async () => {
  const result = await pool.query('SELECT * FROM vaccines');
  return result.rows;
};

const getVaccinesByAgeRange = async (age_range_id) => {
  const result = await pool.query('SELECT * FROM vaccines WHERE age_range_id = $1', [age_range_id]);
  return result.rows;
};

module.exports = { getAllVaccines, getVaccinesByAgeRange };
