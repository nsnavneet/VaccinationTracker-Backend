const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const vaccineRoutes = require('./routes/vaccineRoutes');
const childRoutes = require('./routes/childRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.use('/vaccines', vaccineRoutes);
app.use('/children', childRoutes);
app.use('/schedules', scheduleRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
