const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let schedule = {};

app.post('/submit-schedule', (req, res) => {
  const { month, year, ...days } = req.body;
  schedule[`${year}-${month}`] = days;
  console.log(`Schedule for ${year}-${month} received:`, days);
  res.send('Schedule submitted successfully!');
});

app.get('/schedule', (req, res) => {
  const { month, year } = req.query;
  const monthSchedule = schedule[`${year}-${month}`];
  res.json(monthSchedule || {});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});