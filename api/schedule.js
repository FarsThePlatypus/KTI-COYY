// This is the Vercel serverless function handler
export default function handler(req, res) {
  // Handle different HTTP methods
  if (req.method === 'POST') {
    const { month, year, ...days } = req.body;
    
    // Store schedule data in an in-memory object (temporary storage)
    schedule[`${year}-${month}`] = days;

    console.log(`Schedule for ${year}-${month} received:`, days);
    return res.status(200).send('Schedule submitted successfully!');
  } else if (req.method === 'GET') {
    const { month, year } = req.query;
    
    // Return the stored schedule for the given month and year
    const monthSchedule = schedule[`${year}-${month}`];
    return res.status(200).json(monthSchedule || {});
  } else {
    // Handle other HTTP methods (if needed, e.g., PUT, DELETE)
    return res.status(405).send('Method Not Allowed');
  }
}

// Schedule object to temporarily store data
let schedule = {};
