# Shivora Fashion — Full-Stack E-Commerce Web Application

Shivora is a modern, responsive fashion e-commerce web application built on the MERN stack (MongoDB, Express, React, and Node.js). The platform delivers a premium shopping experience featuring interactive fashion catalogs, customer authentication, dynamic cart and wishlist management, checkout processing, and contact form handling with automated email notifications.

---

## Core Capabilities

- **Catalog and Shop Browsing**: Explore styled fashion categories, filterable collections, and dedicated product details pages loaded dynamically from a MongoDB database.
- **Cart and Wishlist Systems**: Manage selected items through a React Context-powered cart and wishlist with automatic state updates and local persistence options.
- **Authentication**: Customer registration, sign-in, and session management integrated with Clerk Authentication alongside custom backend route protection.
- **Transaction Processing**: Secure order checkout system that registers orders in the database for authenticated users.
- **Transactional Emails**: Submitting the contact form registers the message in the database and automatically triggers a notification email using the Resend API.
- **Data Integrity and Security**: Implement server-side input validation and sanitization using express-validator, password hashing via bcryptjs, and environment separation for secrets.

---

## Technical Architecture

### Tech Stack

| Component | Technologies | Description |
|-----------|--------------|-------------|
| Frontend | React 18, React Router v6, Context API, Vanilla CSS | Responsive UI, state management, and declarative routing |
| Backend | Node.js, Express.js (v5) | RESTful API routing, middleware integration, and business logic |
| Authentication | Clerk Authentication, JWT, bcryptjs | Hybrid identity verification and secure route containment |
| Database | MongoDB, Mongoose | Document-based schema definitions and data storage |
| Email Service | Resend API | Transactional mailing capabilities |
| Validation | express-validator | Request payload inspection and sanitation |

---

## Prerequisites

Before setting up the project locally, ensure you have the following software installed:

- **Node.js**: Version 18.0 or newer
- **MongoDB**: A local instance running on port 27017, or a connection string to a MongoDB Atlas cluster
- **Clerk Account**: Access keys for user authentication services
- **Resend Account**: An API key for dispatching notification emails

---

## Configuration

You must set up environment files for both the server and client components.

### Backend Configuration

Create a file named `.env` in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shivora
JWT_SECRET=your_jwt_signing_key_here
CLIENT_URL=http://localhost:3000
RESEND_API_KEY=re_your_resend_api_key_here
```

Adjust `MONGO_URI` to use your Atlas connection string if you are deploying to or testing on the cloud.

### Frontend Configuration

Create a file named `.env` in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

Ensure the Clerk key matches your project settings in the Clerk dashboard.

---

## Installation and Execution

Follow these steps to configure, populate, and run the project locally.

### 1. Install Dependencies

Install packages in both the backend and frontend directories:

```bash
# Install backend packages
cd backend
npm install

# Install frontend packages
cd ../frontend
npm install
```

### 2. Populate Sample Data

Run the database seed script to populate MongoDB with initial collections and products:

```bash
cd ../backend
node seed.js
```

Upon success, you should see confirmation logs indicating the connection was established and the database populated.

### 3. Run the Development Servers

Start the backend and frontend development servers in separate terminal windows.

#### Start Backend
```bash
cd backend
npm run dev
```
The server will boot on `http://localhost:5000`.

#### Start Frontend
```bash
cd frontend
npm start
```
The React development server will launch on `http://localhost:3000`. Open your browser and navigate to `http://localhost:3000` to interact with the application.

---

## Project Structure

```
shivora/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection management
│   ├── middleware/
│   │   └── authMiddleware.js     # Route protection and token validation
│   ├── models/
│   │   ├── User.js               # User profiles and credentials
│   │   ├── Product.js            # Product listings and inventory schemas
│   │   ├── Contact.js            # Contact submissions database log
│   │   └── Order.js              # Checkout orders record
│   ├── routes/
│   │   ├── authRoutes.js         # Register, Login, and Session management
│   │   ├── productRoutes.js      # Public product queries
│   │   ├── contactRoutes.js      # Contact logging and Resend integrations
│   │   └── orderRoutes.js        # Checkout handling
│   ├── seed.js                   # Mock data generation and insertion script
│   └── server.js                 # Express server configuration and middleware initialization
│
├── frontend/
│   ├── public/
│   │   └── index.html            # Core document template
│   └── src/
│       ├── assets/               # Styled product assets and graphics
│       ├── components/           # Reusable components (Navbar, Footer, Product Cards)
│       ├── context/              # Cart, Wishlist, Products, and Authentication state hooks
│       ├── pages/                # Application page views
│       │   ├── About             # Company bio and information
│       │   ├── Cart              # Active checkout basket
│       │   ├── Checkout          # Billing information and purchase finalization
│       │   ├── Collections       # Grouped style categories
│       │   ├── Contact           # Customer contact and query form
│       │   ├── Home              # Hero banner and featured item display
│       │   ├── Login             # Customer sign-in page
│       │   ├── MyOrders          # Historical order history tracking
│       │   ├── NotFound          # Custom 404 handler
│       │   ├── ProductDetail     # Detailed specification and cart actions
│       │   ├── Register          # New customer registration
│       │   ├── Shop              # Filterable search catalog
│       │   └── Wishlist          # Saved-for-later collection list
│       ├── App.jsx               # Client routes and navigation logic
│       └── index.js              # Application renderer and provider bindings
└── README.md                     # Documentation
```

---

## Feature Tour and Testing Verification

| Interface / Component | Verification Steps |
|-----------------------|--------------------|
| User Registration | Navigate to `/register` and submit the registration form. Check your database to verify the user entry was added. |
| User Login | Sign in via `/login`. Check that a valid session is registered. |
| Shop Catalog | Visit `/shop` to view loaded items. The shop reads dynamically from MongoDB, with visual fallbacks implemented if the backend is unreachable. |
| Cart and Wishlist | Click on product cards to add them to your wishlist or cart. The UI updates the counts instantly across the header navigation. |
| Protected Checkout | Attempt to access `/checkout` directly while signed out. The middleware will redirect you to the login screen. Log in to access the checkout and submit an order. |
| Order Auditing | After checking out, visit the `/my-orders` page to verify that your order has been saved and is listed in your order history. |
| Contact form and Emails | Fill out the form at `/contact` and submit. Confirm that a record is saved to the database and check your inbox for the notification email if Resend is configured. |

---

## Security Practices

- **Strict CORS Rules**: Configured to reject cross-origin requests outside the specified frontend origin domain.
- **Password Encryption**: Employs bcryptjs with auto-generated salts to hash credentials before database writes.
- **Access Token Verification**: Protected REST API endpoints require valid JSON Web Tokens (JWT) or Clerk credentials to fetch details.
- **Server-Side Sanitation**: Inputs undergo strict format checks and sanitation via `express-validator` to protect the backend from malicious payloads and injection vectors.
- **Environment Isolation**: Sensitive settings, ports, database URIs, and mail credentials reside purely in localized `.env` files, which are ignored by Git.
