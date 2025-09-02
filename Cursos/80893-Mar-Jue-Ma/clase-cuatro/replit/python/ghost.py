"""
Ghost class that handles ghost AI, movement, and rendering.
"""

import pygame
import random

class Ghost:
    def __init__(self, start_pos, cell_size, color, name):
        """Initialize the ghost."""
        self.grid_x, self.grid_y = start_pos
        self.cell_size = cell_size
        self.x = self.grid_x * cell_size + cell_size // 2
        self.y = self.grid_y * cell_size + cell_size // 2
        self.color = color
        self.name = name
        
        # Movement
        self.direction = (0, 0)
        self.speed = 1  # pixels per frame (slower than player)
        self.change_direction_timer = 0
        self.change_direction_delay = random.randint(30, 90)  # frames
        
        # AI behavior
        self.behavior_timer = 0
        self.behavior_mode = "chase"  # "chase", "scatter", "random"
        
    def get_valid_directions(self, maze):
        """Get all valid directions the ghost can move."""
        directions = []
        current_x = int(self.x // self.cell_size)
        current_y = int(self.y // self.cell_size)
        
        # Check all four directions
        for dx, dy in [(0, -1), (0, 1), (-1, 0), (1, 0)]:
            new_x = current_x + dx
            new_y = current_y + dy
            
            # Check bounds and walls
            if (0 <= new_x < maze.width and 0 <= new_y < maze.height and 
                not maze.is_wall(new_x, new_y)):
                directions.append((dx, dy))
        
        return directions
    
    def choose_direction(self, maze, player_pos=None):
        """Choose a new direction based on AI behavior."""
        valid_directions = self.get_valid_directions(maze)
        
        if not valid_directions:
            return (0, 0)
        
        # Remove opposite direction to avoid immediate backtracking
        opposite_dir = (-self.direction[0], -self.direction[1])
        if len(valid_directions) > 1 and opposite_dir in valid_directions:
            valid_directions.remove(opposite_dir)
        
        if self.behavior_mode == "chase" and player_pos:
            # Choose direction that gets closer to player
            player_x, player_y = player_pos
            best_direction = None
            best_distance = float('inf')
            
            for direction in valid_directions:
                dx, dy = direction
                new_x = self.grid_x + dx
                new_y = self.grid_y + dy
                distance = abs(new_x - player_x) + abs(new_y - player_y)
                
                if distance < best_distance:
                    best_distance = distance
                    best_direction = direction
            
            return best_direction if best_direction else random.choice(valid_directions)
        
        elif self.behavior_mode == "scatter":
            # Move towards corners
            corners = [(0, 0), (maze.width-1, 0), (0, maze.height-1), (maze.width-1, maze.height-1)]
            target = corners[hash(self.name) % len(corners)]
            
            best_direction = None
            best_distance = float('inf')
            
            for direction in valid_directions:
                dx, dy = direction
                new_x = self.grid_x + dx
                new_y = self.grid_y + dy
                distance = abs(new_x - target[0]) + abs(new_y - target[1])
                
                if distance < best_distance:
                    best_distance = distance
                    best_direction = direction
            
            return best_direction if best_direction else random.choice(valid_directions)
        
        else:  # random behavior
            return random.choice(valid_directions)
    
    def can_move(self, maze, dx, dy):
        """Check if the ghost can move in the given direction."""
        next_x = self.x + dx * self.speed
        next_y = self.y + dy * self.speed
        
        grid_x = int(next_x // self.cell_size)
        grid_y = int(next_y // self.cell_size)
        
        if grid_x < 0 or grid_x >= maze.width or grid_y < 0 or grid_y >= maze.height:
            return False
        
        return not maze.is_wall(grid_x, grid_y)
    
    def update(self, maze, player_pos=None):
        """Update ghost position and AI."""
        # Update behavior mode occasionally
        self.behavior_timer += 1
        if self.behavior_timer > 300:  # Change behavior every 5 seconds
            self.behavior_timer = 0
            behaviors = ["chase", "scatter", "random"]
            self.behavior_mode = random.choice(behaviors)
        
        # Check if we need to change direction
        self.change_direction_timer += 1
        
        # At intersections or when timer expires, choose new direction
        valid_directions = self.get_valid_directions(maze)
        current_dir_valid = self.can_move(maze, self.direction[0], self.direction[1])
        
        if (self.change_direction_timer >= self.change_direction_delay or 
            not current_dir_valid or 
            len(valid_directions) > 2):  # At intersection
            
            new_direction = self.choose_direction(maze, player_pos)
            if new_direction != (0, 0):
                self.direction = new_direction
                self.change_direction_timer = 0
                self.change_direction_delay = random.randint(30, 120)
        
        # Move in current direction
        if self.direction != (0, 0):
            dx, dy = self.direction
            if self.can_move(maze, dx, dy):
                self.x += dx * self.speed
                self.y += dy * self.speed
            else:
                # If can't move, stop and choose new direction next frame
                self.direction = (0, 0)
                self.change_direction_timer = self.change_direction_delay
        
        # Update grid position
        self.grid_x = int(self.x // self.cell_size)
        self.grid_y = int(self.y // self.cell_size)
    
    def draw(self, screen):
        """Draw the ghost."""
        # Ghost body (rounded rectangle)
        body_rect = pygame.Rect(
            self.x - self.cell_size // 3,
            self.y - self.cell_size // 3,
            self.cell_size // 3 * 2,
            self.cell_size // 3 * 2
        )
        pygame.draw.rect(screen, self.color, body_rect)
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y - self.cell_size // 6)), 
                          self.cell_size // 3)
        
        # Ghost "legs" (small triangles at bottom)
        leg_width = self.cell_size // 6
        leg_height = self.cell_size // 4
        legs_y = self.y + self.cell_size // 6
        
        for i in range(3):
            leg_x = self.x - self.cell_size // 3 + (i * leg_width * 2)
            points = [
                (leg_x, legs_y),
                (leg_x + leg_width, legs_y),
                (leg_x + leg_width // 2, legs_y + leg_height)
            ]
            pygame.draw.polygon(screen, self.color, points)
        
        # Eyes
        eye_radius = 3
        left_eye_pos = (int(self.x - self.cell_size // 8), int(self.y - self.cell_size // 8))
        right_eye_pos = (int(self.x + self.cell_size // 8), int(self.y - self.cell_size // 8))
        
        pygame.draw.circle(screen, (255, 255, 255), left_eye_pos, eye_radius)
        pygame.draw.circle(screen, (255, 255, 255), right_eye_pos, eye_radius)
        pygame.draw.circle(screen, (0, 0, 0), left_eye_pos, eye_radius - 1)
        pygame.draw.circle(screen, (0, 0, 0), right_eye_pos, eye_radius - 1)
    
    def get_grid_pos(self):
        """Get the current grid position."""
        return (self.grid_x, self.grid_y)
