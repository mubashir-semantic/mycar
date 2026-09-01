# MyCar - Car Valuation API

A comprehensive NestJS-based REST API for car valuation reports and marketplace management. This application allows users to create car valuation reports, get price estimates, and manage a car marketplace with products and orders.

## Project Overview

MyCar is a full-stack car valuation platform built with:
- **Backend**: NestJS (TypeScript)
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: TypeORM
- **Authentication**: Cookie-based sessions
- **Testing**: Jest (Unit & E2E tests)

## Key Features

### 🚗 Car Valuation Reports
- Create detailed car valuation reports with vehicle specifications
- Include car make, model, year, mileage, and location (coordinates)
- Get automated price estimates based on vehicle properties and location proximity
- Admin approval workflow for published reports

### 👤 User Management
- User registration and authentication
- Role-based access control (Admin / Regular User)
- Secure password handling with encryption
- Session management with cookie-based authentication

### 🛍️ Marketplace Features
- Product catalog management
- Order management with status tracking
- User-specific order history

### 🔒 Security
- Authentication Guards for protected routes
- Admin-only authorization for sensitive operations
- Input validation using class-validator
- Password exclusion from API responses

## Project Structure

```
src/
├── users/               # User management & authentication
│   ├── auth.service.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── user.entity.ts
│   ├── dtos/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── middlewares/
│   └── decorators/
├── reports/             # Car valuation reports
│   ├── reports.service.ts
│   ├── reports.controller.ts
│   ├── report.entity.ts
│   └── dtos/
│       ├── create-report.dto.ts
│       ├── approve-report.dto.ts
│       ├── get-estimate.dto.ts
│       └── report.dto.ts
├── products/            # Product management
│   ├── products.service.ts
│   ├── products.controller.ts
│   ├── entities/
│   │   └── product.entity.ts
│   └── dtos/
├── orders/              # Order management
│   ├── orders.service.ts
│   ├── orders.controller.ts
│   ├── entities/
│   │   └── order.entity.ts
│   └── dtos/
├── guards/              # Authorization guards
│   ├── auth.guard.ts
│   └── admin.guard.ts
├── interceptors/        # Response serialization
│   └── serialize.interceptor.ts
├── migrations/          # Database migrations
├── app.module.ts        # Root application module
├── app.service.ts
├── app.controller.ts
└── main.ts              # Application entry point

test/                   # E2E and unit tests
├── jest-e2e.json
├── app.e2e-spec.ts
└── auth.e2e-spec.ts
```

## Core Entities

### User
- **ID**: Auto-generated primary key
- **Email**: User's email address
- **Password**: Encrypted password (excluded from responses)
- **Admin**: Boolean flag for admin privileges
- **Reports**: One-to-many relationship with car reports

### Report (Car Valuation)
- **ID**: Auto-generated primary key
- **Make**: Vehicle manufacturer
- **Model**: Vehicle model name
- **Year**: Manufacturing year
- **Mileage**: Current vehicle mileage
- **Price**: Estimated or provided price
- **Latitude/Longitude**: Location coordinates
- **Approved**: Admin approval status
- **User**: Many-to-one relationship with User

### Product
- **ID**: Auto-generated primary key
- **Name**: Product name
- **Description**: Product details
- **Price**: Product price (decimal)

### Order
- **ID**: Auto-generated primary key
- **Status**: Order status (default: 'pending')
- **CreatedAt**: Order creation timestamp
- **User**: Many-to-one relationship with User

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for production) or SQLite (included for development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mycar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create `.env.development` for development:
   ```env
   NODE_ENV=development
   DB_NAME=mycar.db
   PORT=3000
   COOKIE_KEY=your-secret-cookie-key
   ```

   Create `.env.production` for production:
   ```env
   NODE_ENV=production
   DATABASE_URL=postgresql://user:password@host:port/dbname
   PORT=3000
   COOKIE_KEY=your-secret-cookie-key
   ```

4. **Database Setup**
   ```bash
   # Run migrations
   npm run migration:run
   
   # Generate new migrations
   npm run migration:generate -- ./src/migrations/migration-name
   ```

5. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run start:dev
   
   # Debug mode
   npm run start:debug
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## API Endpoints

### Authentication (Users)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/auth/signup` | Create new user account | No |
| POST | `/auth/signin` | Login user | No |
| POST | `/auth/signout` | Logout user | Yes |
| GET | `/auth/whoami` | Get current user info | Yes |
| GET | `/auth/:id` | Get user by ID | Yes |
| PATCH | `/auth/:id` | Update user details | Yes |
| DELETE | `/auth/:id` | Delete user account | Yes |

### Reports (Car Valuations)

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---|---|
| POST | `/reports` | Create valuation report | Yes | No |
| GET | `/reports` | Get price estimates | No | No |
| PATCH | `/reports/:id` | Approve/reject report | Yes | Yes |

**Create Report Payload:**
```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2022,
  "mileage": 15000,
  "price": 25000,
  "lng": -73.935242,
  "lat": 40.730610
}
```

**Get Estimate Query:**
```
GET /reports?make=Toyota&model=Camry&year=2022&mileage=15000&lng=-73.935242&lat=40.730610
```

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/products` | Create product | Yes |
| GET | `/products` | List all products | No |
| GET | `/products/:id` | Get product details | No |
| PATCH | `/products/:id` | Update product | Yes |
| DELETE | `/products/:id` | Delete product | Yes |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/orders` | Create order | Yes |
| GET | `/orders` | Get user's orders | Yes |
| GET | `/orders/:id` | Get order details | Yes |
| PATCH | `/orders/:id` | Update order status | Yes |
| DELETE | `/orders/:id` | Cancel order | Yes |

## Available Scripts

```bash
# Development
npm run start              # Start development server
npm run start:dev         # Start with auto-reload
npm run start:debug       # Start in debug mode
npm run start:prod        # Start production build

# Building
npm run build             # Compile TypeScript to JavaScript

# Testing
npm test                  # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:cov         # Run tests with coverage
npm run test:debug       # Debug tests
npm run test:e2e         # Run end-to-end tests

# Code Quality
npm run lint             # Run ESLint and fix issues
npm run format           # Format code with Prettier

# Database
npm run typeorm          # Run TypeORM CLI commands
npm run migration:generate  # Generate new migration
npm run migration:run    # Run pending migrations
```

## Technology Stack

### Core Framework
- **@nestjs/core**: NestJS core framework
- **@nestjs/common**: Common utilities and decorators
- **@nestjs/platform-express**: Express adapter

### Database & ORM
- **typeorm**: Object-Relational Mapping
- **@nestjs/typeorm**: NestJS TypeORM integration
- **sqlite3** / **better-sqlite3**: SQLite driver
- **pg**: PostgreSQL driver

### Validation & Serialization
- **class-validator**: DTO validation
- **class-transformer**: Data transformation and serialization

### Authentication & Security
- **cookie-session**: Cookie-based session management

### Development & Testing
- **@nestjs/cli**: NestJS CLI
- **jest**: Testing framework
- **@nestjs/testing**: NestJS testing utilities
- **ts-node**: TypeScript execution for Node.js
- **typescript**: TypeScript compiler
- **eslint**: Code linting
- **prettier**: Code formatting

## Authentication & Authorization

### Session Management
The application uses cookie-based sessions for authentication:
- Users can sign up or sign in
- Session ID is stored in HTTP-only cookies
- Middleware automatically deserializes the current user

### Guards

**AuthGuard**: Protects routes requiring authentication
- Checks if `session.userId` exists
- Returns 403 if user is not authenticated

**AdminGuard**: Restricts routes to admin users only
- Extends AuthGuard
- Verifies user's admin role

## Error Handling

The application includes comprehensive error handling:
- `NotFoundException`: Resource not found
- `BadRequestException`: Invalid request data
- `UnauthorizedException`: Authentication failed
- `ForbiddenException`: Authorization failed
- Global validation pipe for DTO validation

## Testing

### Unit Tests
Run individual test suites:
```bash
npm test src/users/users.service.spec.ts
npm test src/reports/reports.service.spec.ts
```

### E2E Tests
Comprehensive integration tests:
```bash
npm run test:e2e
```

Test files:
- `test/app.e2e-spec.ts` - Application integration tests
- `test/auth.e2e-spec.ts` - Authentication flow tests

## Database Migrations

The project uses TypeORM migrations for schema management:

```bash
# Generate a new migration after entity changes
npm run migration:generate

# Run all pending migrations
npm run migration:run

# Revert last migration
npm run typeorm migration:revert
```

Migrations are stored in `src/migrations/`.

## Environment Variables

### Development (.env.development)
```env
NODE_ENV=development
DB_NAME=mycar.db
PORT=3000
COOKIE_KEY=dev-cookie-secret
```

### Production (.env.production)
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/mycar
PORT=3000
COOKIE_KEY=prod-cookie-secret
```

## Best Practices Implemented

✅ **Clean Architecture**: Separation of concerns with modules, controllers, services  
✅ **Type Safety**: Full TypeScript support with strict types  
✅ **Validation**: DTO-based request validation  
✅ **Security**: Guards for authentication and authorization  
✅ **Testing**: Comprehensive unit and E2E tests  
✅ **Code Quality**: ESLint and Prettier configuration  
✅ **Database**: Migrations and ORM best practices  
✅ **Error Handling**: Consistent exception handling  
✅ **Documentation**: Detailed code comments and this README

## Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Create or modify entities in `src/[module]/entities/`
   - Define DTOs in `src/[module]/dtos/`
   - Implement business logic in services
   - Expose APIs through controllers

3. **Generate Migration** (if entities changed)
   ```bash
   npm run migration:generate
   ```

4. **Test Your Changes**
   ```bash
   npm run lint
   npm test
   npm run test:e2e
   ```

5. **Format Code**
   ```bash
   npm run format
   ```

6. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: description of changes"
   git push origin feature/your-feature-name
   ```

## Deployment

### Prerequisites
- Node.js runtime environment
- PostgreSQL database instance
- Environment variables configured

### Production Build
```bash
npm install --production
npm run build
npm run migration:run
npm run start:prod
```

### Docker Deployment (Example Dockerfile)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

## Troubleshooting

### Database Connection Issues
- Verify database URL in environment variables
- Ensure database server is running
- Check database credentials and permissions

### TypeScript Compilation Errors
```bash
npm run build -- --skipLibCheck
```

### Test Failures
```bash
npm run test -- --detectOpenHandles
npm run test:debug  # Debug mode
```

### Port Already in Use
```bash
PORT=3001 npm run start:dev
```

## Contributing

1. Follow the existing code structure and style
2. Write tests for new features
3. Update documentation
4. Run `npm run lint` and `npm run format` before committing
5. Ensure all tests pass

## License

This project is licensed under the UNLICENSED license.

## Support & Questions

For issues, questions, or feature requests, please open an issue in the repository or contact the development team.

---

**Last Updated**: 2026-09-01  
**Version**: 0.0.1
