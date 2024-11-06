
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// In-memory storage for the schedule data (replace with a database in production)
let scheduleData = {};

// Endpoint to get schedule data
app.get('/get_schedule', (req, res) => {
    const today = new Date().getDate(); // Get current day of the month
    const dataForToday = scheduleData[today] || {};
    res.json(dataForToday);
});

// Endpoint to update schedule data
app.post('/update_schedule', (req, res) => {
    const { day, imam, muadzin, duaReader } = req.body;
    if (!day || !imam || !muadzin || !duaReader) {
        return res.status(400).send('Missing required fields');
    }
    if (!scheduleData[day]) {
        scheduleData[day] = {};
    }
    scheduleData[day] = { imam, muadzin, duaReader };
    res.send('Schedule updated');
});

// Server startup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
