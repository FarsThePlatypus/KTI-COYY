const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (for the HTML form)
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit-schedule', (req, res) => {
  const { month, year, ...scheduleData } = req.body;

  // Format the filename for storage: e.g., "2024-01.json"
  const fileName = `${year}-${month}.json`;
  const filePath = path.join(__dirname, 'data', fileName);

  // Organize data per day
  const schedule = {};
  Object.keys(scheduleData).forEach((key) => {
    const [day, role] = key.match(/day(\d+)_(\w+)/).slice(1, 3);
    if (!schedule[day]) schedule[day] = {};
    schedule[day][role] = scheduleData[key];
  });

  // Write schedule to file, overwriting if it already exists
  fs.writeFileSync(filePath, JSON.stringify(schedule, null, 2));
  res.send('Schedule submitted successfully!');
});

// Route for ESP32 to fetch today's schedule
app.get('/schedule', (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate());

  const filePath = path.join(__dirname, 'data', `${year}-${month}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath));
    // Send the schedule for the current day
    if (data[day]) {
      res.json(data[day]);
    } else {
      res.json({ imam: "No Data", muadzin: "No Data", duareader: "No Data" });
    }
  } else {
    res.json({ imam: "No Data", muadzin: "No Data", duareader: "No Data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
