# Architecture Firm Floor Planner - Frontend

This is the frontend application for the Architecture Firm Floor Planner, built with React and Redux.

## Project Structure

The application follows a standard React application structure with Redux for state management:

```
client/
├── public/                  # Static files
├── src/                     # Source code
│   ├── app/                 # Application setup
│   │   └── store.js         # Redux store configuration
│   ├── components/          # Reusable components
│   │   ├── auth/            # Authentication components
│   │   ├── common/          # Common UI components
│   │   └── planner/         # Planner-specific components
│   ├── features/            # Redux slices and features
│   │   ├── alert/           # Alert notifications
│   │   ├── auth/            # Authentication
│   │   └── projects/        # Project management
│   ├── pages/               # Page components
│   ├── utils/               # Utility functions
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## Dependencies

The application uses the following main dependencies:

- React 18 and React Router v6 for UI and routing
- Redux Toolkit for state management
- Material UI for component library
- Axios for API communication
- JWT for authentication

## Features

The application includes the following features:

- User authentication (login/register)
- Project management (create, view, update, delete)
- Interactive floor planner interface
- Collaboration tools
- Responsive design

## Development

### Installation

```
npm install --legacy-peer-deps
```

We use `--legacy-peer-deps` due to some dependency conflicts with the React Planner library.

### Running the application

```
npm start
```

### Building for production

```
npm run build
```

## Known Issues and Fixes

1. **React Icons ESM Import Issue**: Fixed by creating a mock implementation in `utils/patches/react-icons-patch.js`

2. **React Planner Dependencies**: Since React Planner has some complex dependencies, we've created simplified mock components in:
   - `components/planner/MyCatalog.js`
   - `components/planner/ToolbarButtons.js`
   - `pages/PlannerPage.js`

3. **Webpack Configuration**: We've adjusted the webpack configuration to handle ESM modules properly.

## Future Improvements

- Complete integration with the actual React Planner library
- Implement more detailed 3D rendering capabilities
- Add more architectural elements to the catalog
- Improve collaboration features with real-time updates 