const pool = require('../config/database');

const addChild = async (child) => {
  const { name, date_of_birth, phone_number } = child;
  const result = await pool.query(
    'INSERT INTO children (name, date_of_birth, phone_number) VALUES ($1, $2, $3) RETURNING *',
    [name, date_of_birth, phone_number]
  );
  const newChild = result.rows[0];

  // Create vaccination chart for the new child
  const vaccines = await pool.query('SELECT * FROM vaccines');
  const vaccinationPromises = vaccines.rows.map(vaccine => {
    const dueDate = calculateDueDate(date_of_birth, vaccine.age_range_id); // Function to calculate due date
    return pool.query(
      'INSERT INTO vaccination_schedule (child_id, vaccine_id, due_date) VALUES ($1, $2, $3)',
      [newChild.id, vaccine.id, dueDate]
    );
  });
  await Promise.all(vaccinationPromises);

  return newChild;
};

const calculateDueDate = (dob, ageRangeId) => {
  const birthDate = new Date(dob);
  let dueDate = new Date(birthDate);

  switch (ageRangeId) {
    case 1: // Birth
      return dueDate;
    case 2: // 6-8 Weeks
      return addWeeks(birthDate, 6);
    case 3: // 10-16 Weeks
      return addWeeks(birthDate, 10);
    case 4: // 14-20 Weeks
      return addWeeks(birthDate, 14);
    case 5: // 6 Months
      return addMonths(birthDate, 6);
    case 6: // 7 Months
      return addMonths(birthDate, 7);
    case 7: // 6-9 Months
      return addMonths(birthDate, 9);
    case 8: // 9 Months
      return addMonths(birthDate, 9);
    case 9: // 12 Months
      return addMonths(birthDate, 12);
    case 10: // 15 Months
      return addMonths(birthDate, 15);
    case 11: // 16-18 Months
      return addMonths(birthDate, 18);
    case 12: // 18-19 Months
      return addMonths(birthDate, 19);
    case 13: // 24 Months (2 Years)
      return addMonths(birthDate, 24);
    case 14: // 4-6 Years
      return addYears(birthDate, 4);
    case 15: // 10-12 Years
      return addYears(birthDate, 10);
    default:
      return dueDate;
  }
};

const addWeeks = (date, weeks) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + weeks * 7);
  return newDate;
};

const addMonths = (date, months) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

const addYears = (date, years) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

module.exports = { addChild };
