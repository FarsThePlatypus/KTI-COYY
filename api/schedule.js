// /api/schedule.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request to fetch the schedule
    const { month, year } = req.query;
    // Here, you would get the schedule from wherever it's stored (in this case, a simple object)
    const schedule = {
      "2024-11": {
        "1": { imam: "Imam A", muadzin: "Muadzin A", duaReader: "DuaReader A" },
        "2": { imam: "Imam B", muadzin: "Muadzin B", duaReader: "DuaReader B" },
      }
    };
    const monthSchedule = schedule[`${year}-${month}`] || {};
    res.status(200).json(monthSchedule);
  } else if (req.method === 'POST') {
    // Handle POST request to submit the schedule
    const { month, year, ...days } = req.body;
    // You would typically save this to a database or a file
    console.log(`Schedule for ${month}/${year} received:`, days);
    res.status(200).json({ message: 'Schedule submitted successfully!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
