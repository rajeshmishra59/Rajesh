# Hostel Management System

## Overview

This is a full-stack hostel management system designed for managing students, payments, expenses, and room allocations. The application provides real-time dashboard KPIs and comprehensive reporting capabilities for hostel operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom dashboard theme variables
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Style**: RESTful API with JSON responses
- **Validation**: Zod schemas shared between frontend and backend
- **Session Management**: PostgreSQL-based session storage

### Development Stack
- **Development Server**: Vite development server with HMR
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Type System**: TypeScript with strict configuration
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### Database Schema
- **Students**: Student records with personal information, course details, and status
- **Payments**: Payment transactions linked to students with methods and status tracking
- **Expenses**: Expense records categorized by type with descriptions
- **Rooms**: Room management with availability status and student assignments

### API Endpoints
- **Students**: CRUD operations for student management
- **Payments**: Payment recording and retrieval by student
- **Expenses**: Expense tracking and categorization
- **Rooms**: Room allocation and status management
- **Dashboard**: KPI calculations and metrics aggregation

### Frontend Pages
- **Dashboard**: Real-time KPIs and metrics overview
- **Students**: Student enrollment and management
- **Payments**: Payment processing and history
- **Expenses**: Expense recording and categorization
- **Rooms**: Room allocation and availability management
- **Reports**: Comprehensive reporting and analytics

## Data Flow

### Form Submissions
1. User fills out forms with Zod validation
2. React Hook Form handles form state and validation
3. TanStack Query mutations send data to API endpoints
4. Express routes validate and process requests
5. Drizzle ORM interacts with PostgreSQL database
6. Success/error responses trigger UI updates

### Data Fetching
1. TanStack Query manages API calls with caching
2. Express routes handle GET requests
3. Drizzle ORM executes database queries
4. Data is returned and cached on the frontend
5. React components consume cached data with automatic updates

### Real-time Updates
1. Mutations automatically invalidate related queries
2. UI components re-render with fresh data
3. Dashboard KPIs update after data changes
4. Toast notifications provide user feedback

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **connect-pg-simple**: PostgreSQL session store

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **ESLint**: Code linting
- **PostCSS**: CSS processing

## Deployment Strategy

### Production Build
1. Vite builds optimized frontend assets
2. esbuild bundles backend code for Node.js
3. Static assets are served from dist/public
4. Backend serves API routes and static files

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment mode (development/production)
- **Session configuration**: PostgreSQL-based sessions

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database access
- Static file serving capabilities
- Environment variable support

## Changelog

Changelog:
- July 04, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.