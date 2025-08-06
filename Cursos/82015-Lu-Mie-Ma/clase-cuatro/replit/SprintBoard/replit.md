# Project Management Application

## Overview

This is a Flask-based project management application inspired by Jira, featuring a Kanban board interface for ticket management. The application provides a dashboard with project metrics, a drag-and-drop Kanban board for workflow visualization, and comprehensive ticket management capabilities. It includes user management, project organization, and real-time status tracking with an intuitive web interface built using Bootstrap and custom CSS styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Flask web framework with Python
- **Session Management**: Flask-Session with filesystem-based storage for user sessions
- **Data Storage**: In-memory data structures (dictionaries) for MVP implementation using custom model classes
- **Application Structure**: Modular design with separate files for routes, models, and application configuration
- **Logging**: Built-in Python logging configured for debug level

### Frontend Architecture
- **Template Engine**: Jinja2 templating with Flask
- **UI Framework**: Bootstrap 5.3.0 for responsive design and components
- **Typography**: Google Fonts (Inter) for modern, clean text rendering
- **Icons**: Font Awesome 6.4.0 for consistent iconography
- **Interactive Elements**: SortableJS for drag-and-drop Kanban board functionality
- **Custom Styling**: Jira-inspired color scheme with CSS custom properties

### Data Model Design
- **User Model**: ID, name, email, role, and creation timestamp
- **Ticket Model**: UUID-based identification, title, description, assignee, priority levels, status tracking, project association
- **Project Model**: UUID-based identification, name, description, and creation timestamp
- **Status Workflow**: Three-stage Kanban workflow (To Do, In Progress, Done)
- **Priority System**: Four-level priority classification (Low, Medium, High, Critical)

### User Interface Components
- **Dashboard**: Project metrics overview with statistics cards and recent activity
- **Kanban Board**: Drag-and-drop interface for visual workflow management
- **Ticket Management**: Comprehensive CRUD operations with filtering capabilities
- **User Management**: Team member administration with role-based organization
- **Navigation**: Responsive navigation bar with active page indicators

## External Dependencies

### Frontend Libraries
- **Bootstrap 5.3.0**: CSS framework for responsive design and UI components
- **Font Awesome 6.4.0**: Icon library for consistent visual elements
- **Google Fonts**: Web fonts service for Inter font family
- **SortableJS 1.15.0**: JavaScript library for drag-and-drop functionality

### Python Packages
- **Flask**: Core web framework for application routing and request handling
- **Flask-Session**: Session management extension for user state persistence

### Development Tools
- **Python Logging**: Built-in logging system for debugging and monitoring
- **Environment Variables**: Configuration management for session secrets and deployment settings

### Browser APIs
- **Local Storage**: Client-side storage for user preferences and temporary data
- **Drag and Drop API**: Native browser support enhanced by SortableJS for Kanban functionality
- **Fetch API**: Modern HTTP client for asynchronous server communication