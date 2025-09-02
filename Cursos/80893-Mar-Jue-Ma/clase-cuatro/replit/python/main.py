#!/usr/bin/env python3
"""
Main entry point for the Pacman game.
"""

import pygame
import sys
from game import Game

def main():
    """Initialize pygame and start the game."""
    pygame.init()
    
    # Initialize the game
    game = Game()
    
    try:
        # Run the game
        game.run()
    except KeyboardInterrupt:
        print("\nGame interrupted by user")
    finally:
        # Clean up
        pygame.quit()
        sys.exit()

if __name__ == "__main__":
    main()
