<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# MyCar - Car Valuation API

## 📋 Description

MyCar is a comprehensive **NestJS-based REST API** for managing car valuations and reports. The application allows users to create, update, and retrieve car valuation reports with intelligent price estimation based on make, model, location, year, and mileage. It features user authentication, authorization with admin controls, and robust data validation.

## 🛠️ Tech Stack

### Core Framework & Runtime
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe development
- **NestJS 11.0.1** - Progressive Node.js framework for building efficient server-side applications

### Database & ORM
- **TypeORM 1.1.0** - Object-Relational Mapping
- **SQLite 3** - Development database (Better SQLite3 for faster performance)
- **PostgreSQL** - Production database
- **Database Migrations** - TypeORM-based schema management

### Authentication & Security
- **Cookie Session** - Session management
- **Crypto** - Password hashing with scrypt algorithm
- **Class Validator** - DTO validation
- **Class Transformer** - Entity serialization/deserialization

### Code Quality & Testing
- **Jest** - Unit and integration testing
- **Supertest** - HTTP assertion library
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript Strict Mode** - Type safety

### Additional Libraries
- **RxJS** - Reactive programming
- **Cross-env** - Cross-platform environment variable management
- **Reflect Metadata** - Decorator support


## ✨ Key Features

### User Management
- **User Registration & Authentication** - Secure signup and signin with email validation
- **Password Security** - Scrypt-based password hashing with salt
- **User Profiles** - Store user information and manage user accounts
- **Admin Control** - Admin flag for role-based access control

### Car Reports & Valuation
- **Create Reports** - Users can create car valuation reports with detailed specs
- **Report Approval** - Admin users can approve/reject reports
- **Price Estimation** - Intelligent price estimation algorithm based on:
  - Car make and model
  - Location (latitude/longitude)
  - Year of manufacture
  - Mileage
  - Similar approved reports (3 closest matches)
- **Report Management** - Update and retrieve car valuation reports

### Security & Authorization
- **Auth Guard** - Protected routes requiring authentication
- **Admin Guard** - Routes restricted to admin users only
- **Current User Decorator** - Access authenticated user in controllers
- **Current User Interceptor** - Serialize user data (exclude passwords)
- **Middleware** - Current user middleware for request processing

### Data Validation
- **DTOs (Data Transfer Objects)** - Validate incoming request data
- **Class Validator** - Automatic validation with decorators
- **Type Safety** - TypeScript strict mode for compile-time safety

## 📁 Project Structure

```
src/
├── app.module.ts                 # Root module
├── app.controller.ts             # Root controller
├── app.service.ts                # Root service
├── main.ts                        # Application entry point
├── data-source.ts                # TypeORM configuration
├── guards/
│   ├── admin.guard.ts            # Admin authorization guard
│   └── auth.guard.ts             # Authentication guard
├── interceptors/
│   ├── serialize.interceptor.ts   # Data serialization interceptor
│   └── current-user.interceptor.ts # Current user interceptor
├── migrations/
│   └── 1787896174922-initial-schema.ts # Database schema migration
├── users/
│   ├── user.entity.ts            # User database entity
│   ├── users.service.ts          # User business logic
│   ├── users.controller.ts       # User API endpoints
│   ├── users.module.ts           # User module configuration
│   ├── auth.service.ts           # Authentication logic (signup/signin)
│   ├── current-user.decorator.ts # Get current user from request
│   ├── current-user.interceptor.ts # Serialize current user
│   ├── middlewares/
│   │   └── current-user.middleware.ts # Extract user from session
│   └── dtos/
│       ├── create-user.dto.ts    # Validation for user creation
│       └── update-user.dto.ts    # Validation for user updates
├── reports/
│   ├── report.entity.ts          # Report database entity
│   ├── reports.service.ts        # Report business logic & estimation
│   ├── reports.controller.ts     # Report API endpoints
│   ├── reports.module.ts         # Report module configuration
│   └── dtos/
│       ├── create-report.dto.ts  # Validation for report creation
│       ├── approve-report.dto.ts # Validation for report approval
│       ├── get-estimate.dto.ts   # Validation for price estimation
│       └── report.dto.ts         # Report response DTO
└── app.controller.spec.ts        # Root controller tests

test/
├── app.e2e-spec.ts              # End-to-end tests
├── auth.e2e-spec.ts             # Authentication e2e tests
└── jest-e2e.json                # E2E test configuration

Configuration Files:
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.build.json          # Build-specific TS config
├── nest-cli.json                # NestJS CLI configuration
├── eslint.config.mjs            # ESLint rules
└── data-source.ts               # TypeORM database configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- SQLite 3 (for development) or PostgreSQL (for production)

### Project Setup

```bash
# Install dependencies
$ npm install
```

### Environment Configuration

Create environment files in the project root:

**`.env.development`**
```
DB_NAME=db.sqlite
NODE_ENV=development
```

**`.env.test`**
```
DB_NAME=test.sqlite
NODE_ENV=test
```

**`.env.production`**
```
DATABASE_URL=postgresql://user:password@host:port/dbname
NODE_ENV=production
```

### Database Setup

```bash
# Generate and run migrations
$ npm run migration:run

# Create a new migration (if needed)
$ npm run migration:generate -- ./src/migrations/migration-name
```

## 📦 Running the Application

```bash
# Development mode (with auto-reload)
$ npm run start:dev

# Production mode
$ npm run start:prod

# Debug mode
$ npm run start:debug
```

The application will start on `http://localhost:3000` by default.

## 🧪 Testing

```bash
# Run unit tests
$ npm run test

# Run tests in watch mode
$ npm run test:watch

# Run tests with coverage report
$ npm run test:cov

# Run end-to-end (e2e) tests
$ npm run test:e2e
```

## 🔧 Code Quality

```bash
# Format code with Prettier
$ npm run format

# Lint and fix code with ESLint
$ npm run lint
```

## 📚 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user

### Users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Reports
- `POST /reports` - Create car valuation report
- `GET /reports` - Get all reports
- `GET /reports/:id` - Get report by ID
- `PATCH /reports/:id/approve` - Approve report (admin only)
- `POST /reports/estimate` - Get price estimate for a car

## 🗄️ Database Schema

### User Entity
- `id` - Primary key
- `email` - Unique email address
- `password` - Hashed password
- `admin` - Admin flag (default: true)
- `reports` - One-to-many relationship with reports

### Report Entity
- `id` - Primary key
- `approved` - Approval status (default: false)
- `price` - Car price estimate
- `make` - Car manufacturer
- `model` - Car model
- `year` - Year of manufacture
- `lng` - Longitude of car location
- `lat` - Latitude of car location
- `mileage` - Car mileage
- `user` - Many-to-one relationship with User

## 📝 Development Notes

- Uses **Cookie-Session** for user session management
- Passwords are hashed using **Node.js Crypto** with scrypt algorithm
- Database is SQLite3 in development (better-sqlite3 for performance)
- Production uses PostgreSQL with migrations
- All entities use TypeORM decorators for database mapping
- DTOs use class-validator for input validation
- Interceptors for serialization (excluding passwords from responses)
