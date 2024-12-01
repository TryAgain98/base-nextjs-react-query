# Project Name

A web application built with Next.js, React Query, and Tailwind CSS.

## Setup and Run Application

### 1. Backend (BE)

- **json-server** is used to create the server.
- To run the backend application:
  1. Navigate to the `server` folder from the root directory.
  2. Run `pnpm i` to install the necessary dependencies (You can also use `yarn` or `npm i`).
  3. Start the server with the command `npm run dev` (or `yarn dev`).
  4. Access [http://localhost:3000/products](http://localhost:3000/products) to check the server.

### 2. Frontend (FE)

- To run the frontend application:
  1. Run `pnpm i` to install the necessary dependencies (You can also use `yarn` or `npm i`).
  2. Start the frontend server with the command `npm run dev` (or `yarn dev`).
  3. Access [http://localhost:3001](http://localhost:3001) to check the frontend.

## Development Guidelines

### Branch Naming Convention

- Main branches: `master`, `develop`, `staging`, `product`
- Feature branches: `feat/feature-name`
- Bug fix branches: `fix/bug-name`

### Commit Message Convention

Project uses commitlint to standardize commit messages:

- feat: new feature
- fix: bug fix
- docs: documentation updates
- style: code style changes (formatting, etc.)
- refactor: code refactoring
- test: adding/modifying tests
- chore: maintenance tasks

## Technology Stack

### Frontend

- **Next.js**: React framework with SSR/SSG capabilities, routing, and performance optimizations
- **React Query**: Server state management, caching, and data synchronization
- **React Hook Form**: High-performance form handling and validation
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TypeScript**: Enhanced type safety and developer experience

### Backend

- **JSON Server**: Rapid API mocking for development

### Development Tools

- **ESLint**: Code style checking and error detection
- **Husky**: Automated pre-commit/pre-push hooks
- **Commitlint**: Commit message standardization

## Libraries and Frameworks in Use

### Dependencies

- **@heroicons/react**: Provides SVG icons for React
- **@tanstack/react-query**: Manages and fetches data from APIs
- **axios**: Makes HTTP requests
- **next**: Framework for building React applications with SSR and SSG
- **react-hook-form**: Manages and handles forms in React
- **swiper**: Modern touch slider library for creating carousels and sliders

### DevDependencies

- **@commitlint/cli**: Checks commit message convention
- **eslint & eslint-config-next**: Linting and code quality maintenance
- **husky**: Sets up Git hooks
- **tailwindcss**: Utility-first CSS framework
- **typescript**: Adds type safety to JavaScript
