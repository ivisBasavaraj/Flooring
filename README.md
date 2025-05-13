# Architecture Firm MERN Application with React Planner

A comprehensive MERN (MongoDB, Express.js, React, Node.js) stack application for architecture firms, integrating the React Planner tool for interactive 2D/3D floor planning.

![Project Preview](preview.png)

## Features

- **Interactive Floor Planner**: Create, edit, and visualize architectural designs in 2D and 3D
- **User Authentication**: Secure registration and login system with JWT authentication
- **Project Management**: Save, load, and manage architectural projects
- **Collaboration Tools**: Share projects with clients or team members with different access roles
- **Responsive Design**: Professional UI designed for both desktop and mobile devices
- **Custom Architecture Elements**: Specialized catalog of architectural components

## Architecture

This application follows a MERN stack architecture:

- **MongoDB**: Database for storing user information, projects, and collaboration data
- **Express.js**: Backend server for API routes and business logic
- **React**: Frontend user interface with Material UI components
- **Node.js**: JavaScript runtime for the server

The React Planner component is integrated directly into the frontend, with custom extensions for architectural use cases.

## Prerequisites

- Node.js (v14 or newer)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Project Structure

```
architecture-firm/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   └── src/                    # React source code
│       ├── components/         # Reusable components
│       │   ├── common/         # Shared UI components
│       │   ├── auth/           # Authentication-related components
│       │   └── planner/        # React Planner customizations
│       ├── pages/              # Page components
│       ├── features/           # Redux slices and logic
│       └── utils/              # Utility functions
│
├── server/                     # Backend Express application
│   ├── config/                 # Server configuration
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Express middleware
│   ├── models/                 # Mongoose data models
│   └── routes/                 # API route definitions
│
└── package.json                # Root dependencies and scripts
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd architecture-firm
```

### 2. Environment Variables

Create `.env` files in both the server and client directories:

#### Server (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/architecture-firm
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

#### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Database Setup

Make sure MongoDB is running locally, or use MongoDB Atlas.

### 5. Start the Development Servers

From the root directory:

```bash
# Run both client and server concurrently
npm run dev

# Or run them separately
npm run server  # Start backend server
npm run client  # Start frontend development server
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage Guide

### User Registration and Authentication

1. Create a new account using the registration page
2. Log in with your credentials
3. Access your dashboard and projects

### Creating a New Project

1. Navigate to the Projects page
2. Click "Create New Project"
3. Use the planner interface to design your floor plan
4. Save your project with a name and description

### Working with the Planner

The planner interface includes:

- **Toolbar**: Contains drawing tools and actions
- **Catalog**: Library of architectural elements to add to your plan
- **2D View**: For creating and editing the floor plan
- **3D View**: For visualizing the design in three dimensions

### Collaboration

1. Open a project and navigate to sharing options
2. Enter the email of the user you want to collaborate with
3. Assign appropriate permissions (viewer or editor)
4. Save to send an invitation

## Deployment

### Preparing for Production

1. Build the React client:
```bash
cd client
npm run build
```

2. Set up environment variables for production.

### Deployment Options

- **Heroku**: Use the provided `heroku-postbuild` script
- **Digital Ocean/AWS**: Set up Node.js hosting with MongoDB
- **Docker**: Containerize the application using the provided Dockerfile

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Planner (https://github.com/cvdlab/react-planner)
- Material UI for the component library
- All contributors and maintainers
