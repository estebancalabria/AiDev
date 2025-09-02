# Overview

This is a classic Pacman-style arcade game built using Python and Pygame. The game features a player-controlled Pacman character navigating through a maze, collecting dots while avoiding AI-controlled ghosts. The project implements core game mechanics including collision detection, score tracking, and game state management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Game Engine Architecture
The project follows an object-oriented design with clear separation of concerns:

- **Game Loop Pattern**: The main `Game` class manages the central game loop, handling events, updates, and rendering in each frame
- **Entity-Component Pattern**: Each game entity (Player, Ghost, Maze) is implemented as a separate class with encapsulated behavior
- **State Management**: Game states ("playing", "game_over") are managed centrally in the Game class

## Core Components

### Display and Rendering
- **Pygame Framework**: Uses Pygame for graphics rendering, input handling, and display management
- **Fixed Window Size**: 800x600 pixel window with 60 FPS target
- **Grid-based Rendering**: Uses a cell-based system (20px cells) for precise positioning and collision detection

### Game Entities
- **Player Class**: Handles Pacman movement, animation (mouth opening/closing), and user input processing
- **Ghost Class**: Implements AI behavior with multiple modes (chase, scatter, random) and pathfinding
- **Maze Class**: Manages the game world layout, wall collision detection, and dot collection tracking

### Physics and Movement
- **Grid-aligned Movement**: All entities move on a pixel-perfect grid system
- **Collision Detection**: Wall and entity collision using grid-based boundary checking
- **Speed Differentiation**: Player moves faster than ghosts for balanced gameplay

## Audio System
- **Procedural Sound Generation**: Generates simple tones programmatically instead of loading audio files
- **Sound Manager**: Centralized audio handling with fallback to silent operation if sound generation fails
- **Event-based Audio**: Sounds triggered by game events (movement, dot collection, game over)

## Data Management
- **Static Maze Layout**: Hardcoded 2D array defines the maze structure with different cell types (walls, dots, spawn points)
- **In-memory State**: All game state maintained in memory without external persistence
- **Score Tracking**: Simple integer-based scoring system

## Design Patterns Used
- **Singleton-like Game Manager**: Single Game instance manages all subsystems
- **Component Composition**: Each entity composed of position, movement, and rendering components
- **Strategy Pattern**: Ghost AI behavior can switch between different movement strategies

# External Dependencies

## Core Framework
- **Pygame**: Primary game development framework for graphics, input, audio, and event handling

## Python Standard Library
- **sys**: System operations and program termination
- **math**: Mathematical operations for animations and sound generation
- **random**: Pseudo-random number generation for ghost AI behavior
- **os**: File system operations (imported but not actively used in current implementation)

## Audio Dependencies
- **pygame.mixer**: Audio subsystem for sound generation and playback
- No external audio files or music libraries required due to procedural sound generation