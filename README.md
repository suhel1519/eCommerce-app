# eCommerce Dashboard - Business Analytics Platform

## Project Overview

A modern, responsive eCommerce dashboard built with React and TypeScript, featuring comprehensive business analytics, order management, and performance tracking capabilities.

## Features

- **Real-time Analytics**: Interactive charts and metrics for business insights
- **Dark/Light Theme**: Seamless theme switching with optimized performance
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern UI**: Clean, professional interface using shadcn-ui components
- **Performance Optimized**: Fast loading and smooth interactions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd pixel-perfect-craft-259

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui + Radix UI
- **Icons**: Lucide React
- **Theme Management**: next-themes
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (MetricCard, Charts, etc.)
│   └── ui/             # Base UI components (shadcn-ui)
├── pages/              # Page components
├── constants/          # Application constants and data
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
└── types/              # TypeScript type definitions
```

## Deployment

Build the project for production:

```sh
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.
