# Legal SaaS Lawyer Portal

A web-based portal for lawyers to manage clients, matters, and legal cases.

## Features

- User authentication (login/signup) with admin capabilities
- Client management
- Matter/case tracking
- Secure API integration
- Responsive design with Tailwind CSS
  -Note: I did my best to get Tailwind CSS to work with this project and I could not. 

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- .NET 8.0 SDK (for the backend API, if running locally)

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd lawyer-portal
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=https://localhost:7291
```

4. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
lawyer-portal/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── customers/     # Customer management
│   │   ├── matters/       # Matter/case management
│   │   └── layout/        # Common layout components
│   ├── App.js
│   └── index.js
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## API Integration

The frontend connects to a .NET Core API running on `https://localhost:7291`. Ensure the API is running before starting the frontend application.

## Authentication

The application uses JWT token-based authentication. Tokens are stored in localStorage and automatically included in API requests.

## Styling

- Built with Tailwind CSS
- Custom components follow consistent styling patterns
- Responsive design for all screen sizes