# Expense Tracker Frontend

This repository contains the frontend code for the Expense Tracker application, aimed at providing an intuitive user interface for tracking expenses and managing budgets. The `kalyan` branch contains a specific version or set of features currently under development or maintained by the contributor.

## Features

- User authentication and authorization
- Expense and category management
- Interactive dashboard with charts and summaries
- Responsive design for mobile and desktop
- Integration with the backend API

**Note:** This branch may differ from the default branch in functionality or stability.

## Prerequisites

Before running this project, ensure the following are installed:

- **Node.js** (version 16 or higher)
- **npm** (Node Package Manager)
- A backend server (configured with the corresponding API endpoints)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```
git clone -b kalyan https://github.com/Kalyana-Sudheer-p/expense-tracker-frontend.git
cd expense-tracker-frontend
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and define the following variables:

```
REACT_APP_API_URL=<backend_api_url>
REACT_APP_AUTH_SECRET=<auth_secret_key>
```

Replace `<backend_api_url>` with the base URL of your backend server.

### 4. Run the Application

Start the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

### 5. Build for Production

To create an optimized production build:

```
npm run build
```

The production-ready files will be available in the `build/` directory.

## Folder Structure

```
src/
	├── components/       # Reusable React components
    ├── pages/            # Application pages
    ├── services/         # API service calls
    ├── utils/            # Utility functions and helpers
    ├── assets/           # Static files like images and icons
    └── styles/           # Global and component-specific styles
```

## Scripts

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Runs tests for the application.
- **`npm run build`**: Builds the app for production.

## Contributing

1. Fork the repository and create a new branch.
2. Make your changes and test them thoroughly.
3. Submit a pull request to the `kalyan` branch for review.

## Issues

If you encounter any issues while using this application, please open an issue in the repository with a detailed description of the problem.

## License

This project is licensed under the [MIT License](LICENSE).