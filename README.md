# PropIntel Web Application

## Project Overview

PropIntel is a modern web application built with React and TypeScript, designed to provide intelligent property analysis and insights. The application leverages cutting-edge technologies and follows best practices in web development to deliver a robust and user-friendly experience.

## Technical Stack

### Core Technologies

- **Frontend Framework**: React 18.2.0
- **Language**: TypeScript
- **Build Tool**: Vite 5.1.4
- **Package Manager**: Yarn/NPM

### Key Dependencies

- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **Routing**: React Router DOM 6.22.3
- **UI Components**:
    - Radix UI (Dialog, Dropdown, Tabs, etc.)
    - Tailwind CSS 3.4.1
    - Heroicons
    - Lucide React
- **Data Visualization**:
    - Chart.js
    - ECharts
    - Recharts
- **Form Handling**: React Hook Form with Zod validation
- **Date Management**: date-fns
- **Styling**: Tailwind CSS with custom configurations

### Development Tools

- **Code Quality**:
    - ESLint
    - Prettier
    - TypeScript
- **Build & Development**:
    - Vite
    - PostCSS
    - Autoprefixer

## Project Structure

```
src/
├── assets/         # Static assets and resources
├── components/     # Reusable UI components
├── constants/      # Application constants
├── contexts/       # React context providers
├── helpers/        # Utility functions
├── hooks/          # Custom React hooks
├── icons/          # Icon components
├── lib/           # Core library functions
├── store/         # Redux store configuration
├── types/         # TypeScript type definitions
├── views/         # Page components
└── styles.css     # Global styles
```

## Features

- Modern, responsive user interface
- Advanced data visualization capabilities
- Form validation and handling
- State management with Redux
- Type-safe development with TypeScript
- Component-based architecture
- Custom hooks for reusable logic
- Context-based state management
- Toast notifications
- Dialog and modal systems
- Dropdown menus and navigation
- Tab-based interfaces
- Tooltip system
- Scroll area management

## Development Setup

1. Install dependencies:

    ```bash
    yarn install
    # or
    npm install
    ```

2. Start development server:

    ```bash
    yarn dev
    # or
    npm run dev
    ```

3. Build for production:
    ```bash
    yarn build
    # or
    npm run build
    ```

## Code Quality

The project maintains high code quality standards through:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Strict TypeScript configuration
- Modern React patterns and practices

## Performance Considerations

- Optimized build process with Vite
- Efficient state management with Redux Toolkit
- Component-based architecture for better code splitting
- Modern CSS with Tailwind for optimized styling
- Responsive design principles

## Browser Support

The application is built with modern web standards and supports:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project - All rights reserved

## Version

Current version: 0.0.0
