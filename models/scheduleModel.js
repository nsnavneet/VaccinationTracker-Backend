const pool = require('../config/database');

const addSchedule = async (schedule) => {
  const { child_id, vaccine_id, due_date } = schedule;
  const result = await pool.query(
    'INSERT INTO vaccination_schedule (child_id, vaccine_id, due_date) VALUES ($1, $2, $3) RETURNING *',
    [child_id, vaccine_id, due_date]
  );
  return result.rows[0];
};

const getScheduleByChildId = async (childId) => {
  const result = await pool.query(
    `SELECT vs.*, v.name as vaccine_name, v.description as vaccine_description, v.age_range_id, c.date_of_birth 
     FROM vaccination_schedule vs 
     JOIN vaccines v ON vs.vaccine_id = v.id 
     JOIN children c ON vs.child_id = c.id 
     WHERE vs.child_id = $1`,
    [childId]
  );
  return result.rows;
};
module.exports = { addSchedule, getScheduleByChildId };
