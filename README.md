# Legal SaaS Lawyer Portal

A web-based portal for lawyers to manage clients, matters, and legal cases.
This react app is designed to be used with this api: https://github.com/andrew-turner-dev/CustomerAndMatterManagementAPI

## A quick note about TailWind
I have never worked with tailwind css before. However, it was specified in the prompt for the front end. I did my best to get it to fully work and give the front end a nicer look but was unsuccessful within the timeframe. 

## Features

- User authentication (login/signup) with admin capabilities
- Client management
- Matter/case tracking
- Secure API integration
- Responsive design with Tailwind CSS (see note)

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
Or use .env file in the repo. It is included for ease of use.

4. Start the development server:
```bash
npm run start
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

- `npm run start` - Runs the app in development mode
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

  ## TODO
  1. Get a better understanding of UI wanted
  2. Add ability to edit customer and matter data
  3. Add ability to manage firms
  4. Role based operations(admin and non admin)
