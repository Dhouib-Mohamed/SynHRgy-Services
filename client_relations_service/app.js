const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());

const offers = [
  {
    id: 1,
    companyId: "123",
    companyName: "TechCorp Inc.",
    role: "Software Engineer",
    degree: "Bachelor's in Computer Science",
    experience: "2+ years",
    workLocation: "Remote",
    workMethod: "Full-Time",
    description: "Develop and maintain cutting-edge software solutions in a collaborative team environment.",
    startDate: "2024-01-15",
    status: "pending",
  },
  {
    id: "2",
    companyId: "456",
    companyName: "Innovatech Solutions",
    role: "Data Analyst",
    degree: "Master's in Data Science",
    experience: "3+ years",
    workLocation: "New York, NY",
    workMethod: "Hybrid",
    description: "Analyze data trends and provide actionable insights to drive business decisions.",
    startDate: "2024-02-01",
    status: "pending",
  },
];

// POST /add_offer/:company_id
// Adds a new offer with a status of "pending"
app.post('/add_offer/:company_id', (req, res) => {
  const { company_id } = req.params;
  const {
    companyName,
    role,
    degree,
    experience,
    workLocation,
    workMethod,
    description,
    startDate,
  } = req.body;

  // Validate required fields
  if (!companyName || !role || !degree || !experience || !workLocation || !workMethod || !description || !startDate) {
    return res.status(400).json({ message: 'Missing required fields in the body' });
  }

  const newOffer = {
    id: offers.length + 1,
    companyId: company_id,
    companyName,
    role,
    degree,
    experience,
    workLocation,
    workMethod,
    description,
    startDate,
    status: "pending",
  };

  offers.push(newOffer);

  res.status(201).json({
    message: 'Offer added successfully',
    offer: newOffer,
  });
});

// POST /accept_offer/:company_id
// Updates an offer with a status of "searching"
app.post('/change_offer_status/:company_id', (req, res) => {
  const { company_id } = req.params;
  const {status} = req.body;

  // Find an offer for the given company_id and status "pending"
  const offer = offers.find(o => o.id === company_id);
  if (!offer) {
    return res.status(404).json({ message: 'Pending offer not found for the specified company' });
  }

  offer.status = status;

  res.status(200).json({
    message: 'Offer status updated to searching',
    offer,
  });
});

// Endpoint to retrieve offers by company ID with optional status filtering
app.get('/get_offer/:company_id', (req, res) => {
  const { company_id } = req.params;
  const { status } = req.query; // Extract optional status from query params

  // Filter offers by company_id
  let companyOffers = offers.filter(o => o.company_id === company_id);

  // If a status is provided, further filter by status
  if (status) {
    companyOffers = companyOffers.filter(o => o.status === status);
  }

  if (companyOffers.length === 0) {
    return res.status(404).json({
      message: 'No offers found for the specified criteria',
    });
  }

  res.status(200).json({
    message: 'Offers retrieved successfully',
    offers: companyOffers,
  });
});


// Start the server
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
