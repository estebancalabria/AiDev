# Overview

This is a full-stack web application for project management and task tracking, built with a modern tech stack. The application provides a Kanban-style interface for managing tasks and sprints, featuring drag-and-drop functionality, task filtering, and comprehensive CRUD operations. It's designed as a collaborative tool for agile development teams to organize their work through sprints and track task progress.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side is built with React 18 using TypeScript and follows a component-based architecture:

- **UI Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with a comprehensive design system using shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Component Library**: Radix UI primitives with custom styling via shadcn/ui
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a modular structure with reusable UI components, custom hooks for shared logic, and a clear separation between business logic and presentation layers.

## Backend Architecture

The server-side uses Node.js with Express in a RESTful API pattern:

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js for HTTP server and routing
- **Database Integration**: Configured for PostgreSQL with Drizzle ORM
- **Data Storage**: Currently using in-memory storage with interface-based design for easy database migration
- **API Design**: RESTful endpoints with proper HTTP status codes and error handling
- **Development**: Hot reloading with Vite integration for seamless full-stack development

The backend is designed with a repository pattern through the IStorage interface, making it database-agnostic and easily testable.

## Data Architecture

The application manages two main entities:

- **Tasks**: Core work items with properties like title, description, status (todo/inprogress/done), priority levels, assignees, story points, and sprint associations
- **Sprints**: Time-boxed work periods with planning/active/completed statuses, date ranges, and task collections

Data validation is handled through Zod schemas shared between client and server, ensuring type safety across the full stack.

## Development Architecture

The project uses a monorepo structure with shared types and schemas:

- **Shared Directory**: Common TypeScript types and Zod schemas used by both client and server
- **Path Aliases**: Configured for clean imports (@/ for client, @shared/ for shared code)
- **TypeScript Configuration**: Strict mode enabled with proper module resolution
- **Build Process**: Separate build steps for client (Vite) and server (esbuild)

## UI/UX Architecture

The interface is built around a tabbed navigation system:

- **Kanban Board**: Visual task management with drag-and-drop between status columns
- **Backlog Management**: Task organization outside of active sprints
- **Sprint Management**: Sprint creation, editing, and task assignment
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: Proper ARIA labels and keyboard navigation support

# External Dependencies

## Database Technology

- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **PostgreSQL**: Primary database system (configured but may be added during development)
- **Neon Database**: Serverless PostgreSQL provider for cloud deployment

## UI and Styling

- **shadcn/ui**: Comprehensive component library built on Radix UI primitives
- **Radix UI**: Unstyled, accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for managing component variants

## Development and Build Tools

- **Vite**: Fast build tool and development server with HMR support
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for server-side code
- **PostCSS**: CSS processing with Tailwind CSS integration

## Data Management

- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting utilities

## Development Experience

- **Replit Integration**: Custom plugins for Replit development environment
- **Hot Module Replacement**: Real-time updates during development
- **Error Overlay**: Runtime error display for better debugging experience