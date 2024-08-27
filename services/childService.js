const Child = require('../models/childModel');

const addChild = async (child) => {
  try {
    const newChild = await Child.addChild(child);
    return newChild;
  } catch (error) {
    throw new Error('Error adding child');
  }
};

module.exports = { addChild };
