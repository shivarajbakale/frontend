# Rocketship Frontend Micro App

A modern, feature-rich frontend application built with React, Vite, and Mantine UI framework. This is part of the Rocketship full-stack boilerplate, designed to provide a robust starting point for web applications.

## 🚀 Features

- **Modern Tech Stack**
  - React 18 with TypeScript
  - Vite for lightning-fast development
  - Mantine UI v7 for beautiful, accessible components
  - TanStack Query (React Query) for efficient data fetching
  - React Router v7 for routing
  - Tailwind CSS for utility-first styling

- **Developer Experience**
  - TypeScript for type safety
  - ESLint and Prettier for code quality
  - Vitest for unit testing
  - MSW (Mock Service Worker) for API mocking
  - Storybook for component development
  - Hot Module Replacement (HMR)

- **Development Tools**
  - JSON Server for mock API development
  - Faker.js for generating mock data
  - Concurrent development server setup

## 📦 Installation

```bash
# Install dependencies
yarn install

# Generate mock data
yarn generate:mock

# Start development server with mock API
yarn dev:all

# Or start only the frontend
yarn dev
```

## 🛠️ Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run all tests and type checks
- `yarn storybook` - Start Storybook development server
- `yarn server` - Start JSON Server for mock API
- `yarn generate:mock` - Generate mock data
- `yarn dev:all` - Start both frontend and mock API servers

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components and routes
├── utils/
│   ├── api/         # API client and endpoints
│   ├── queries/     # React Query hooks
│   └── types/       # TypeScript type definitions
├── mocks/           # MSW handlers and mock data
└── App.tsx          # Application entry point
```

## 🧪 Testing

The project includes a comprehensive testing setup:

- Unit tests with Vitest
- React Testing Library for component testing
- MSW for API mocking in tests
- Storybook for component development and testing

## 📚 Storybook

Component documentation and development environment is available through Storybook:

```bash
yarn storybook
```

## 🔧 Configuration

- TypeScript configuration in `tsconfig.json`
- Vite configuration in `vite.config.ts`
- ESLint and Prettier configurations for code style
- MSW setup for API mocking
- Mantine UI theming in `src/theme.ts`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.
