# Railway Management System

This is a Railway Management System designed to manage trains, bookings, and user authentication. The system allows admins to add new trains, check seat availability, and book seats for users. It supports both regular users and admins, with secure user authentication and role-based access control.

## Features

- **User Authentication**: Register and login users with JWT token-based authentication.
- **Admin Features**: Add new trains and manage seat availability.
- **Booking System**: Users can book train seats if available, with proper transaction handling to avoid booking conflicts.
- **Seat Availability**: Check available trains between source and destination.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT for user authentication and role-based access control
- **Middleware**: Custom middleware for authentication and admin access

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/railway-management-system.git
   cd railway-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   #### The required dependencies are:

   - **express**: A fast, unopinionated, minimalist web framework for Node.js
   - **body-parser**: Middleware to parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.
   - **jsonwebtoken**: A library to issue JSON Web Tokens (JWT) for authentication.
   - **mysql2**: MySQL client for Node.js to interact with the MySQL database.
   - **bcrypt**: A library for hashing passwords securely.
   - **dotenv**: A zero-dependency module to load environment variables from a `.env` file into `process.env`.

   You can install these dependencies with the following command:

   ```bash
   npm install express body-parser jsonwebtoken mysql2 bcrypt dotenv
   ```

## Set up environment variables

Create a `.env` file and add the following configuration:

```bash
PORT=5000
JWT_SECRET=jwt_secret
ADMIN_API_KEY=WorkIndia
```

## Set up MySQL database

Create a `railway_management` database and run the provided SQL scripts to create the necessary tables.

## Start the server:

```bash
npm start
```

## The server will be running on [http://localhost:5000](http://localhost:5000).

## API Endpoints

### User Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login an existing user to get a JWT token
- `POST /api/bookings/book`: Book a seat on a train (requires authentication)

### Admin Endpoints (requires API key)

- `POST /api/trains/add`: Add a new train (requires admin authentication)
- `GET /api/trains/seatAvailability`: Get seat availability between source and destination

## Database Schema

The database consists of the following tables:

- `users`: Stores user information (username, password, role)
- `trains`: Stores train details (train_name, source, destination, available_seats)
- `bookings`: Stores booking details (user_id, train_id, seats)

## Middleware

### Authentication

- `authMiddleware`: Protects routes that require user authentication by checking the JWT token.
- `adminAuthMiddleware`: Protects routes that require admin authentication by checking the API key.
