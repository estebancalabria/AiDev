# Task Management Application

## Overview

This is a full-stack task management application built with React, TypeScript, and Express. The application allows users to create, manage, and track tasks across different sprints with priority levels and completion status. It features a modern UI built with shadcn/ui components and Tailwind CSS, with local storage for data persistence on the frontend and PostgreSQL database support configured via Drizzle ORM on the backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **Data Storage**: Local storage implementation for client-side data persistence with a storage abstraction layer

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Development Setup**: Development server with hot reload and error overlay support
- **API Structure**: RESTful API design with `/api` prefix for all endpoints
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development and database implementation for production

### Data Models
- **Task Schema**: Defined with Zod validation including id, title, description, priority (low/medium/high), sprint assignment (backlog/sprint-1/sprint-2/sprint-3), completion status, and timestamps
- **Shared Types**: Type-safe data models shared between frontend and backend using TypeScript

### UI/UX Design
- **Design System**: Consistent design tokens with CSS custom properties for theming
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: ARIA-compliant components from Radix UI
- **Theme Support**: Light and dark theme support with CSS custom properties

### Build and Development
- **Build System**: Vite for frontend bundling with esbuild for backend compilation
- **Development Experience**: Hot module replacement, TypeScript checking, and runtime error overlays
- **Path Aliases**: Configured path mapping for cleaner imports (@/, @shared/, @assets/)

## External Dependencies

### Database
- **PostgreSQL**: Primary database with connection via Neon Database serverless driver
- **Drizzle ORM**: Type-safe database operations with schema migrations support
- **Connection Management**: Environment variable based database URL configuration

### UI Library Dependencies
- **Radix UI**: Comprehensive set of accessible, unstyled UI components
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting with internationalization support

### Development Tools
- **Replit Integration**: Specialized plugins for Replit development environment
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins
- **TypeScript**: Static type checking with strict configuration

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation for runtime type safety
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### State Management
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **Wouter**: Minimalist routing library for single-page application navigation

### Additional Libraries
- **nanoid**: Unique ID generation for client-side entities
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx & tailwind-merge**: Conditional class name utilities optimized for Tailwind CSS