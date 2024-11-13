const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let schedule = {};

app.post('/api/schedule', (req, res) => {
  const { month, year, ...days } = req.body;
  schedule[`${year}-${month}`] = days;
  res.send('Schedule submitted successfully!');
});

app.get('/api/schedule', (req, res) => {
  const { month, year } = req.query;
  const monthSchedule = schedule[`${year}-${month}`];
  res.json(monthSchedule || {});
});

module.exports = app;
