"""
Main game class that handles the game loop, states, and overall game logic.
"""

import pygame
import sys
from player import Player
from ghost import Ghost
from maze import Maze
from sounds import SoundManager

class Game:
    def __init__(self):
        """Initialize the game."""
        # Game constants
        self.WINDOW_WIDTH = 800
        self.WINDOW_HEIGHT = 600
        self.FPS = 60
        self.CELL_SIZE = 20
        
        # Colors
        self.BLACK = (0, 0, 0)
        self.WHITE = (255, 255, 255)
        self.YELLOW = (255, 255, 0)
        self.BLUE = (0, 0, 255)
        self.RED = (255, 0, 0)
        self.PINK = (255, 192, 203)
        self.ORANGE = (255, 165, 0)
        self.CYAN = (0, 255, 255)
        
        # Initialize pygame display
        self.screen = pygame.display.set_mode((self.WINDOW_WIDTH, self.WINDOW_HEIGHT))
        pygame.display.set_caption("Pacman Game")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        self.large_font = pygame.font.Font(None, 72)
        
        # Game state
        self.game_state = "playing"  # "playing", "game_over"
        self.score = 0
        self.total_dots = 0
        
        # Initialize game components
        self.sound_manager = SoundManager()
        self.maze = Maze(self.CELL_SIZE)
        self.player = Player(self.maze.get_player_start(), self.CELL_SIZE)
        
        # Initialize ghosts
        ghost_starts = self.maze.get_ghost_starts()
        self.ghosts = [
            Ghost(ghost_starts[0], self.CELL_SIZE, self.RED, "red"),
            Ghost(ghost_starts[1], self.CELL_SIZE, self.PINK, "pink"),
            Ghost(ghost_starts[2], self.CELL_SIZE, self.ORANGE, "orange"),
            Ghost(ghost_starts[3], self.CELL_SIZE, self.CYAN, "cyan")
        ]
        
        # Count total dots
        self.total_dots = self.maze.count_dots()
        
    def handle_events(self):
        """Handle pygame events."""
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            elif event.type == pygame.KEYDOWN:
                if self.game_state == "playing":
                    if event.key == pygame.K_UP or event.key == pygame.K_w:
                        self.player.set_direction((0, -1))
                    elif event.key == pygame.K_DOWN or event.key == pygame.K_s:
                        self.player.set_direction((0, 1))
                    elif event.key == pygame.K_LEFT or event.key == pygame.K_a:
                        self.player.set_direction((-1, 0))
                    elif event.key == pygame.K_RIGHT or event.key == pygame.K_d:
                        self.player.set_direction((1, 0))
                elif self.game_state == "game_over":
                    if event.key == pygame.K_r:
                        self.restart_game()
                    elif event.key == pygame.K_ESCAPE:
                        return False
        return True
    
    def update(self):
        """Update game logic."""
        if self.game_state != "playing":
            return
        
        # Update player
        old_pos = self.player.get_grid_pos()
        self.player.update(self.maze)
        new_pos = self.player.get_grid_pos()
        
        # Check if player moved and play sound
        if old_pos != new_pos:
            self.sound_manager.play_move()
        
        # Check for dot collection
        if self.maze.collect_dot(new_pos[0], new_pos[1]):
            self.score += 10
            self.sound_manager.play_dot_collect()
            
            # Check win condition
            if self.maze.count_dots() == 0:
                self.game_state = "game_over"
        
        # Update ghosts
        for ghost in self.ghosts:
            ghost.update(self.maze)
            
            # Check collision with player
            if ghost.get_grid_pos() == self.player.get_grid_pos():
                self.game_state = "game_over"
                self.sound_manager.play_game_over()
    
    def draw(self):
        """Draw the game."""
        self.screen.fill(self.BLACK)
        
        if self.game_state == "playing":
            # Draw maze
            self.maze.draw(self.screen, self.BLUE, self.YELLOW)
            
            # Draw player
            self.player.draw(self.screen, self.YELLOW)
            
            # Draw ghosts
            for ghost in self.ghosts:
                ghost.draw(self.screen)
            
            # Draw score
            score_text = self.font.render(f"Score: {self.score}", True, self.WHITE)
            self.screen.blit(score_text, (10, 10))
            
            # Draw dots remaining
            dots_remaining = self.maze.count_dots()
            dots_text = self.font.render(f"Dots: {dots_remaining}", True, self.WHITE)
            self.screen.blit(dots_text, (10, 50))
            
        elif self.game_state == "game_over":
            # Draw game over screen
            if self.maze.count_dots() == 0:
                game_over_text = self.large_font.render("YOU WIN!", True, self.YELLOW)
            else:
                game_over_text = self.large_font.render("GAME OVER", True, self.RED)
            
            text_rect = game_over_text.get_rect(center=(self.WINDOW_WIDTH // 2, self.WINDOW_HEIGHT // 2 - 50))
            self.screen.blit(game_over_text, text_rect)
            
            score_text = self.font.render(f"Final Score: {self.score}", True, self.WHITE)
            score_rect = score_text.get_rect(center=(self.WINDOW_WIDTH // 2, self.WINDOW_HEIGHT // 2))
            self.screen.blit(score_text, score_rect)
            
            restart_text = self.font.render("Press R to Restart or ESC to Quit", True, self.WHITE)
            restart_rect = restart_text.get_rect(center=(self.WINDOW_WIDTH // 2, self.WINDOW_HEIGHT // 2 + 50))
            self.screen.blit(restart_text, restart_rect)
        
        pygame.display.flip()
    
    def restart_game(self):
        """Restart the game."""
        self.score = 0
        self.game_state = "playing"
        
        # Reset maze
        self.maze = Maze(self.CELL_SIZE)
        
        # Reset player
        self.player = Player(self.maze.get_player_start(), self.CELL_SIZE)
        
        # Reset ghosts
        ghost_starts = self.maze.get_ghost_starts()
        self.ghosts = [
            Ghost(ghost_starts[0], self.CELL_SIZE, self.RED, "red"),
            Ghost(ghost_starts[1], self.CELL_SIZE, self.PINK, "pink"),
            Ghost(ghost_starts[2], self.CELL_SIZE, self.ORANGE, "orange"),
            Ghost(ghost_starts[3], self.CELL_SIZE, self.CYAN, "cyan")
        ]
    
    def run(self):
        """Main game loop."""
        running = True
        
        while running:
            running = self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(self.FPS)
