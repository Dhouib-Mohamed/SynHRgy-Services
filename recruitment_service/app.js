const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());

// Mock database
const applications = [
  { id: '1', candidateName: 'John Doe', role: 'Software Engineer', status: 'Pending', offerId: '101' },
  { id: '2', candidateName: 'Jane Smith', role: 'Data Scientist', status: 'Pending', offerId: '102' },
];


// Create new application
app.post('/applications', (req, res) => {
  const { candidateName, role, status, offerId } = req.body;

  if (!candidateName || !role || !status || !offerId) {
    return res.status(400).json({ message: 'Missing required fields in the request body' });
  }

  const newApplication = {
    id: (applications.length + 1).toString(),
    candidateName,
    role,
    status,
    offerId,
  };

  applications.push(newApplication);

  res.status(201).json({ message: 'Application created successfully', application: newApplication });
});


// GET /applications with optional filter
app.get('/applications', (req, res) => {
  const { role, offerId, candidateName, status } = req.query;

  let filteredApps = applications;

  if (role) {
    filteredApps = filteredApps.filter(app => app.role === role);
  }

  if (offerId) {
    filteredApps = filteredApps.filter(app => app.offerId === offerId);
  }

  if (candidateName) {
    filteredApps = filteredApps.filter(app => app.candidateName.toLowerCase().includes(candidateName.toLowerCase()));
  }

  if (status) {
    filteredApps = filteredApps.filter(app => app.status === status);
  }

  res.status(200).json(filteredApps);
});

// Update applicant status 
app.put('/application/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = applications.find(app => app.id === id);
  if (!application) return res.status(404).json({ message: 'Application not found' });

  application.status = status;

  res.status(200).json({ message: 'Candidate status updated successfully', application });
});

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
