# 🐝 BuzzHome

> **Affordable student subleases for Georgia Tech — built for incoming transfer students.**

BuzzHome is a full-stack mockup web application that simulates a student housing sublease marketplace near Georgia Tech's campus in Atlanta, GA. It is a concept demo/portfolio project.

> **Disclaimer:** BuzzHome is an independent student housing mockup and is not officially affiliated with Georgia Tech.

---

## ✨ Features

- **6 fully built pages**: Home, Listings, Listing Detail, Post a Listing, Transfer Student Guide, About
- **12 realistic mock listings** with full property details, images, badges, and commute info
- **Filtering & sorting**: by price, bedrooms, furnished status, distance to campus
- **Search bar** with keyword matching across listing titles and descriptions
- **"Budget Pick", "Best Value", "Near Campus", "Transfer Friendly"** listing badges
- **Detailed listing pages** with amenities, features, lister info, mock map, and similar listings
- **Polished contact form** with simulated submission flow
- **Full listing submission form** with validation and mock success state
- **Transfer Student Guide** with accordion FAQ, checklist, budgeting tips, and neighborhood guide
- **Georgia Tech–inspired color palette** (navy + gold + white) without implying official affiliation
- **Fully responsive** — works on mobile, tablet, and desktop
- **Graceful fallback**: the frontend uses local mock data if the backend is offline

---

## 🚀 Getting Started

### Prerequisites

- **Node.js v18+** — [Download here](https://nodejs.org/)
- **npm** (comes with Node)

---

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

The API will start at **http://localhost:5000**

You should see:
```
🏠 BuzzHome API running at http://localhost:5000
   GET  /api/listings
   GET  /api/listings/:id
   POST /api/listings
```

---

### 2. Start the Frontend

Open a **new terminal window** and run:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:3000**

---

## 📁 Project Structure

```
BuzzHome/
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js              # Express API server
│   └── data/
│       └── listings.js        # 12 mock listings
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api/
        │   └── listings.js    # API helpers with fallback
        ├── data/
        │   └── mockListings.js  # Frontend fallback data
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── ListingCard.jsx
        │   ├── FilterBar.jsx
        │   ├── Accordion.jsx
        │   └── ContactForm.jsx
        └── pages/
            ├── HomePage.jsx
            ├── ListingsPage.jsx
            ├── ListingDetailPage.jsx
            ├── PostListingPage.jsx
            ├── TransferStudentPage.jsx
            └── AboutPage.jsx
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/listings` | Get all listings (supports filters) |
| `GET` | `/api/listings/:id` | Get a single listing by ID |
| `POST` | `/api/listings` | Submit a new listing (in-memory mock) |

### Filter Query Parameters (GET /api/listings)

| Param | Type | Description |
|-------|------|-------------|
| `maxPrice` | number | Maximum monthly rent |
| `bedrooms` | number | Min bedrooms (0 = studio) |
| `furnished` | boolean | `true` or `false` |
| `maxDistance` | number | Max distance from campus (miles) |
| `search` | string | Keyword search (title, neighborhood, description) |
| `sort` | string | `price_asc`, `price_desc`, `distance`, `newest` |

**Example:**
```
GET /api/listings?maxPrice=1000&bedrooms=0&furnished=true&maxDistance=1&sort=price_asc
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `navy` | `#003057` | Primary backgrounds, headings |
| `navy-dark` | `#001a33` | Hero backgrounds, footer |
| `gold` | `#B3A369` | GT-inspired gold |
| `gold-bright` | `#C9A227` | Buttons, accents, badges |
| `gold-light` | `#EDD98A` | Subtle highlights |

Fonts: **Poppins** (headings) + **Inter** (body text)

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| Data | In-memory mock data (JSON) |

---

## 📝 Notes

- **This is a mockup only.** No real payments, no real authentication, no database.
- The frontend will function even without the backend running (uses local fallback data).
- Listing form submissions are simulated — data is added to the in-memory array (resets on server restart).
- All listing images are sourced from [Unsplash](https://unsplash.com) via stable URLs.

---

## 📄 Disclaimer

BuzzHome is an independent student housing mockup and is not officially affiliated with the Georgia Institute of Technology.
