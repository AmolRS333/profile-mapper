# Profile Mapper

A full-stack web application for managing and mapping user profiles with location data.

## Features

- **User Authentication**: Secure login and registration for both employees and administrators
- **Profile Management**: Create, view, update, and delete user profiles
- **Location Mapping**: Store and display geographical coordinates for each profile
- **Admin Dashboard**: Special interface for administrators to manage all profiles
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- React.js with Vite
- Tailwind CSS for styling
- Leaflet for map visualization
- Context API for state management

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/AmolRS333/profile-mapper.git
cd profile-mapper
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend/vite-project
npm install
```

4. Set up environment variables
   - Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/profile-mapper
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

### Running the Application

1. Start the backend server

```bash
cd backend
nodemon server.js
```

2. Start the frontend development server

```bash
cd frontend/vite-project
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

### For Employees

- Register an account or log in
- View all profiles on the home page
- Add your own profile with location data
- Click on any profile to view details

### For Administrators

- Log in with admin credentials
- Access the admin dashboard
- Manage all profiles (view, edit, delete)
- View detailed information about each profile

## Project Structure

```
profile-mapper/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
└── frontend/
    └── vite-project/
        ├── components/
        ├── context/
        ├── pages/
        ├── public/
        └── src/
```

## Acknowledgments

- Leaflet for the mapping functionality
- Tailwind CSS for the UI components
- MongoDB for the database
