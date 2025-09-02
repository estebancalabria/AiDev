"""
Player (Pacman) class that handles player movement and rendering.
"""

import pygame
import math

class Player:
    def __init__(self, start_pos, cell_size):
        """Initialize the player."""
        self.grid_x, self.grid_y = start_pos
        self.cell_size = cell_size
        self.x = self.grid_x * cell_size + cell_size // 2
        self.y = self.grid_y * cell_size + cell_size // 2
        
        # Movement
        self.direction = (0, 0)  # (dx, dy)
        self.next_direction = (0, 0)
        self.speed = 2  # pixels per frame
        
        # Animation
        self.mouth_angle = 0
        self.mouth_speed = 8
        self.radius = cell_size // 3
        
    def set_direction(self, direction):
        """Set the next direction for the player."""
        self.next_direction = direction
    
    def can_move(self, maze, dx, dy):
        """Check if the player can move in the given direction."""
        # Calculate next grid position
        next_x = self.x + dx * self.speed
        next_y = self.y + dy * self.speed
        
        # Convert to grid coordinates
        grid_x = int(next_x // self.cell_size)
        grid_y = int(next_y // self.cell_size)
        
        # Check bounds
        if grid_x < 0 or grid_x >= maze.width or grid_y < 0 or grid_y >= maze.height:
            return False
        
        # Check for walls
        return not maze.is_wall(grid_x, grid_y)
    
    def update(self, maze):
        """Update player position and animation."""
        # Try to change direction if requested
        if self.next_direction != (0, 0):
            dx, dy = self.next_direction
            if self.can_move(maze, dx, dy):
                self.direction = self.next_direction
                self.next_direction = (0, 0)
        
        # Move in current direction
        if self.direction != (0, 0):
            dx, dy = self.direction
            if self.can_move(maze, dx, dy):
                self.x += dx * self.speed
                self.y += dy * self.speed
            else:
                # Stop if hit a wall
                self.direction = (0, 0)
        
        # Update grid position
        self.grid_x = int(self.x // self.cell_size)
        self.grid_y = int(self.y // self.cell_size)
        
        # Animate mouth
        if self.direction != (0, 0):
            self.mouth_angle += self.mouth_speed
            if self.mouth_angle > 45:
                self.mouth_speed = -8
            elif self.mouth_angle < 0:
                self.mouth_speed = 8
        else:
            self.mouth_angle = 0
    
    def draw(self, screen, color):
        """Draw the player (Pacman)."""
        # Calculate mouth direction
        mouth_start_angle = 0
        mouth_end_angle = 360
        
        if self.direction == (1, 0):  # Right
            mouth_start_angle = -self.mouth_angle
            mouth_end_angle = self.mouth_angle
        elif self.direction == (-1, 0):  # Left
            mouth_start_angle = 180 - self.mouth_angle
            mouth_end_angle = 180 + self.mouth_angle
        elif self.direction == (0, -1):  # Up
            mouth_start_angle = 90 - self.mouth_angle
            mouth_end_angle = 90 + self.mouth_angle
        elif self.direction == (0, 1):  # Down
            mouth_start_angle = 270 - self.mouth_angle
            mouth_end_angle = 270 + self.mouth_angle
        
        # Draw Pacman circle
        if self.direction == (0, 0) or self.mouth_angle <= 0:
            # Draw full circle when not moving or mouth closed
            pygame.draw.circle(screen, color, (int(self.x), int(self.y)), self.radius)
        else:
            # Draw Pacman with mouth
            rect = pygame.Rect(self.x - self.radius, self.y - self.radius, 
                             self.radius * 2, self.radius * 2)
            
            # Draw the pac-man shape using arc
            start_angle = math.radians(mouth_start_angle)
            end_angle = math.radians(mouth_end_angle)
            
            # Create points for the pac-man shape
            points = [(self.x, self.y)]  # Center point
            
            # Add arc points
            num_points = 20
            if mouth_start_angle < mouth_end_angle:
                angle_step = (end_angle - start_angle) / num_points
                for i in range(num_points + 1):
                    angle = start_angle + i * angle_step
                    x = self.x + self.radius * math.cos(angle)
                    y = self.y + self.radius * math.sin(angle)
                    points.append((x, y))
            else:
                # Handle wrap-around case
                angle_step = (2 * math.pi - (start_angle - end_angle)) / num_points
                for i in range(num_points + 1):
                    angle = start_angle + i * angle_step
                    if angle > 2 * math.pi:
                        angle -= 2 * math.pi
                    x = self.x + self.radius * math.cos(angle)
                    y = self.y + self.radius * math.sin(angle)
                    points.append((x, y))
            
            # Draw the polygon
            if len(points) > 2:
                pygame.draw.polygon(screen, color, points)
    
    def get_grid_pos(self):
        """Get the current grid position."""
        return (self.grid_x, self.grid_y)
