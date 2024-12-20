// Import required modules
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Set up middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection using Neon
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:o64zPMFCRtaN@ep-steep-cake-a1znrkld.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

// Endpoint to submit schedule data
app.post('/api/schedule', async (req, res) => {
  const { month, year, ...days } = req.body;

  try {
    // Insert or update schedule for the given month and year
  const query = `
  INSERT INTO schedules (month, year, days)
  VALUES ($1, $2, $3)
  ON CONFLICT (month, year)
  DO UPDATE SET days = $3;
  `;
  await pool.query(query, [month, year, JSON.stringify(days)]);

    console.log(`Schedule for ${year}-${month} saved:`, days);
    res.send('Schedule submitted successfully!');
  } catch (err) {
    console.error('Error saving schedule:', err);
    res.status(500).send('Failed to save schedule.');
  }
});

// Endpoint to view all stored schedule data
app.get('/api/view-schedule', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schedules;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching schedules:', err);
    res.status(500).send('Failed to fetch schedules.');
  }
});

// Endpoint to view a specific schedule for a month and year
app.get('/api/view-schedule/specific', async (req, res) => {
  const { month, year } = req.query;

  try {
    const query = 'SELECT days FROM schedules WHERE month = $1 AND year = $2;';
    const result = await pool.query(query, [month, year]);

    if (result.rows.length > 0) {
      res.json(result.rows[0].days);
    } else {
      res.status(404).send('Schedule not found.');
    }
  } catch (err) {
    console.error('Error fetching specific schedule:', err);
    res.status(500).send('Failed to fetch schedule.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

