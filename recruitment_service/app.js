const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());

// Mock database
const applications = [
  { id: '1', candidateName: 'John Doe', role: 'Software Engineer', status: 'Pending' },
  { id: '2', candidateName: 'Jane Smith', role: 'Data Scientist', status: 'Pending' },
];

// GET /applications
app.get('/applications', (req, res) => {
  const role = req.query.role;
  const filteredApps = role ? applications.filter(app => app.role === role) : applications;
  res.status(200).json(filteredApps);
});

// POST /application/:id
app.post('/application/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = applications.find(app => app.id === id);
  if (!application) return res.status(404).json({ message: 'Application not found' });

  application.status = status;

  // Simulate event publishing to ESB
  console.log(`Event sent to Document Processing: Application ${id} marked as ${status}`);

  res.status(200).json({ message: 'Application updated', applicationId: id, newStatus: status });
});

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});