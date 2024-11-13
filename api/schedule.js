const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Object to store the schedules
let schedule = {};

// Endpoint to submit schedule data
app.post('/api/schedule', (req, res) => {
  const { month, year, ...days } = req.body;
  schedule[`${year}-${month}`] = days;
  console.log(`Schedule for ${year}-${month} received:`, days); // Log received data
  res.send('Schedule submitted successfully!');
});

// Endpoint to view all stored schedule data
app.get('/api/view-schedule', (req, res) => {
  res.json(schedule); // Responds with all stored schedules
});

// Endpoint to view a specific schedule for a month and year
app.get('/api/view-schedule/specific', (req, res) => {
  const { month, year } = req.query;
  const monthSchedule = schedule[`${year}-${month}`];
  res.json(monthSchedule || {}); // Respond with specific month's schedule if available
});

module.exports = app;
