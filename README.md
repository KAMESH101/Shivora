# Shivora Fashion — E-Commerce Web Application

A full-stack fashion e-commerce website built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to browse products, manage a cart and wishlist, create accounts, and place orders — with email notifications on contact form submissions.

---

## What This Project Does

- Users can browse fashion products fetched from a database
- They can add items to a cart or wishlist
- They must log in before checking out (protected route)
- Orders are saved to the database on successful checkout
- A contact form sends an email notification using the Resend API
- All user passwords are securely hashed and inputs are validated

---

## Tech Stack

| Part | Technology Used |
|------|----------------|
| Frontend | React 18, React Router v6, Context API, CSS |
| Backend | Node.js with Express.js |
| Database | MongoDB (via Mongoose) |
| Authentication | JWT (JSON Web Tokens) + bcryptjs |
| Email | Resend API |
| Input Validation | express-validator |

---

## Before You Start — What You Need Installed

1. **Node.js** (version 16 or higher) — [Download here](https://nodejs.org)
2. **MongoDB** — either running locally on port `27017`, or a free cloud instance via [MongoDB Atlas](https://www.mongodb.com/atlas)
3. **A Resend account** — for email functionality — [Sign up at resend.com](https://resend.com)

---

## Setting Up Environment Variables

### Backend (`backend/.env`)

Create a file called `.env` inside the `backend/` folder and add the following:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shivora
JWT_SECRET=your_strong_secret_key_here
CLIENT_URL=http://localhost:3000
RESEND_API_KEY=re_your_resend_key_here
```

> If you're using MongoDB Atlas instead of a local database, replace the MONGO_URI line with your Atlas connection string:
> `MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shivora`

> **Important:** Never share or upload this file — it's already excluded from Git via `.gitignore`.

### Frontend (`frontend/.env`)

The frontend `.env` file is already set up for local development:

```
REACT_APP_API_URL=http://localhost:5000
```

Update this URL if you deploy the project to a live server.

---

## How to Run the Project

### Step 1 — Install Dependencies

Open a terminal and run these commands:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2 — Seed the Database

This step adds sample products and a test user account to MongoDB:

```bash
cd backend
node seed.js
```

You should see this output confirming it worked:
```
MongoDB connected
Products seeded successfully
```

### Step 3 — Start the Servers

You'll need two terminal windows open at the same time.

**Terminal 1 — Start the backend:**
```bash
cd backend
npm run dev
```
This runs on: `http://localhost:5000`

**Terminal 2 — Start the frontend:**
```bash
cd frontend
npm start
```
This runs on: `http://localhost:3000`

Now open your browser and go to **`http://localhost:3000`** to see the app.

---

## Test Credentials (Pre-Seeded Account)

| Field | Value |
|-------|-------|
| Email | `evaluator@shivora.com` |
| Password | `password123` |

This account is automatically created when you run `node seed.js`.

---

## Testing Each Feature

| Feature | How to Test |
|---------|-------------|
| Register | Go to `/register` and create a new account |
| Login | Go to `/login` and sign in |
| Protected Checkout | Visit `/checkout` while logged out — you'll be redirected to `/login` |
| Place an Order | Add items to your cart, log in, and complete checkout — the order saves to MongoDB |
| Contact Form | Fill in and submit the form at `/contact` — saved to DB and an email is triggered |
| Product Listing | Products load from MongoDB; if the API is offline, static fallback data is shown |

---

## Project Folder Structure

```
shivora/
├── backend/
│   ├── config/
│   │   └── db.js                 # Handles MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js     # Checks JWT token on protected routes
│   ├── models/
│   │   ├── User.js               # User data structure
│   │   ├── Product.js            # Product data structure
│   │   ├── Contact.js            # Contact form submissions
│   │   └── Order.js              # Order data structure
│   ├── routes/
│   │   ├── authRoutes.js         # Register, Login, Get current user
│   │   ├── productRoutes.js      # Fetch all products
│   │   ├── contactRoutes.js      # Contact form + Resend email trigger
│   │   └── orderRoutes.js        # Place order (requires login)
│   ├── server.js                 # Main Express app entry point
│   ├── seed.js                   # Populates DB with sample data
│   ├── .env                      # Your secret config (not committed to Git)
│   └── .env.example              # Template showing which variables are needed
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute/   # Redirects logged-out users away from checkout
│   │   ├── context/
│   │   │   ├── AuthContext.js    # Manages logged-in user state
│   │   │   ├── CartContext.js    # Manages cart items
│   │   │   ├── WishlistContext.js
│   │   │   └── ProductsContext.js
│   │   ├── pages/
│   │   │   ├── Checkout/         # Checkout page — saves order to DB
│   │   │   ├── Contact/          # Contact page — sends email via Resend
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   └── App.jsx               # Main routes file
│   └── .env                      # Frontend API URL config
│
└── README.md
```

---

## Security Measures Implemented

- `.env` files are excluded from Git so secrets are never exposed
- JWT secret is a 256-bit cryptographically random key
- Passwords are hashed using `bcryptjs` before being stored
- All form inputs are validated and sanitised using `express-validator`
- CORS is restricted to only allow requests from the configured frontend URL
- The order placement route is protected — only logged-in users can access it
