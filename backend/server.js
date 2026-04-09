const express = require('express');
const cors = require('cors');
const listings = require('./data/listings');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET all listings with optional filtering and sorting
app.get('/api/listings', (req, res) => {
  let result = [...listings];

  const { maxPrice, bedrooms, furnished, maxDistance, search, sort } = req.query;

  if (maxPrice) {
    result = result.filter((l) => l.price <= parseInt(maxPrice));
  }

  if (bedrooms !== undefined && bedrooms !== '') {
    const beds = parseInt(bedrooms);
    if (beds === 0) {
      result = result.filter((l) => l.bedrooms === 0);
    } else {
      result = result.filter((l) => l.bedrooms >= beds);
    }
  }

  if (furnished !== undefined && furnished !== '') {
    result = result.filter((l) => l.furnished === (furnished === 'true'));
  }

  if (maxDistance) {
    result = result.filter((l) => l.distanceToCampus <= parseFloat(maxDistance));
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.neighborhood.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }

  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  else if (sort === 'distance') result.sort((a, b) => a.distanceToCampus - b.distanceToCampus);
  else if (sort === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(result);
});

// GET single listing by ID
app.get('/api/listings/:id', (req, res) => {
  const listing = listings.find((l) => l.id === parseInt(req.params.id));
  if (!listing) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  res.json(listing);
});

// POST new listing (mock — adds to in-memory array)
app.post('/api/listings', (req, res) => {
  const newListing = {
    id: listings.length + 1,
    ...req.body,
    badge: null,
    createdAt: new Date().toISOString().split('T')[0],
  };
  listings.push(newListing);
  res.status(201).json({ success: true, message: 'Listing submitted for review.', listing: newListing });
});

app.listen(PORT, () => {
  console.log(`\n🏠 BuzzHome API running at http://localhost:${PORT}`);
  console.log(`   GET  /api/listings`);
  console.log(`   GET  /api/listings/:id`);
  console.log(`   POST /api/listings\n`);
});
