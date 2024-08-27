const Schedule = require('../models/scheduleModel');

const ageRangeMapping = {
  1: "Birth",
  2: "6-8 Weeks",
  3: "10-16 Weeks",
  4: "14-20 Weeks",
  5: "6 Months",
  6: "7 Months",
  7: "6-9 Months",
  8: "9 Months",
  9: "12 Months",
  10: "15 Months",
  11: "16-18 Months",
  12: "18-19 Months",
  13: "2 Years",
  14: "4-6 Years",
  15: "10-12 Years",
  16: "Situational"
};
const ageRangeOrder = [
  "Birth",
  "6-8 Weeks",
  "10-16 Weeks",
  "14-20 Weeks",
  "6 Months",
  "7 Months",
  "6-9 Months",
  "9 Months",
  "12 Months",
  "15 Months",
  "16-18 Months",
  "18-19 Months",
  "2 Years",
  "4-6 Years",
  "10-12 Years",
  "Situational"
];

const addSchedule = async (schedule) => {
  try {
    return await Schedule.addSchedule(schedule);
  } catch (error) {
    throw new Error('Error adding schedule: ' + error.message);
  }
};

const getScheduleByChildId = async (childId) => {
  try {
    const schedule = await Schedule.getScheduleByChildId(childId);
    return groupVaccinesByAgeRange(schedule);
  } catch (error) {
    throw new Error('Error fetching schedule: ' + error.message);
  }
};

const groupVaccinesByAgeRange = (schedule) => {
  const grouped = {};

  // Initialize empty arrays for each age range to ensure the order
  ageRangeOrder.forEach(range => {
      grouped[range] = [];
  });

  schedule.forEach(vaccine => {
      const ageRange = ageRangeMapping[vaccine.age_range_id] || 'Situational';
      grouped[ageRange].push({
          id: vaccine.id,
          child_id: vaccine.child_id,
          vaccine_id: vaccine.vaccine_id,
          due_date: new Date(vaccine.due_date).toISOString(),
          reminder_sent: vaccine.reminder_sent,
          vaccine_name: vaccine.vaccine_name,
          vaccine_description: vaccine.vaccine_description,
          date_of_birth: new Date(vaccine.date_of_birth).toISOString()
      });
  });

  // Optional: Remove any age ranges that have no vaccines
  ageRangeOrder.forEach(range => {
      if (grouped[range].length === 0) {
          delete grouped[range];
      }
  });

  return grouped;
};

module.exports = { addSchedule, getScheduleByChildId };
