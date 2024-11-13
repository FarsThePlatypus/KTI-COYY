const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let schedule = {}; // This will hold the schedule data in-memory

// POST endpoint to submit the schedule data
app.post('/api/schedule', (req, res) => {
  const { month, year, ...days } = req.body;
  const scheduleKey = `${year}-${month}`;
  schedule[scheduleKey] = days;
  console.log(`Schedule for ${scheduleKey} received:`, days);
  res.send('Schedule submitted successfully!');
});

// GET endpoint to retrieve the schedule data
app.get('/api/view-schedule', (req, res) => {
  const { month, year } = req.query;
  const scheduleKey = `${year}-${month}`;
  const monthSchedule = schedule[scheduleKey];
  if (monthSchedule) {
    res.json(monthSchedule);
  } else {
    res.status(404).send("Schedule not found for the specified month and year.");
  }
});

// Export the app for Vercel's serverless function
module.exports = app;
