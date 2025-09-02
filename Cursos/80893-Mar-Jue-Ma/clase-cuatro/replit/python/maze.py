"""
Maze class that handles the game maze, walls, dots, and collision detection.
"""

import pygame

class Maze:
    def __init__(self, cell_size):
        """Initialize the maze."""
        self.cell_size = cell_size
        
        # Simple maze layout (1 = wall, 0 = empty, 2 = dot, 3 = player start, 4 = ghost start)
        self.layout = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,2,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,2,2,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,2,1,1,0,1,1,4,4,4,4,1,1,0,1,1,2,1,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,2,2,1],
            [1,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,1],
            [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1,1,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ]
        
        self.height = len(self.layout)
        self.width = len(self.layout[0])
        
        # Create a copy for dot tracking (2 = dot present)
        self.dots = []
        for row in range(self.height):
            dot_row = []
            for col in range(self.width):
                dot_row.append(self.layout[row][col] == 2)
            self.dots.append(dot_row)
    
    def is_wall(self, x, y):
        """Check if the given grid position is a wall."""
        if y < 0 or y >= self.height or x < 0 or x >= self.width:
            return True
        return self.layout[y][x] == 1
    
    def collect_dot(self, x, y):
        """Collect a dot at the given position. Returns True if a dot was collected."""
        if y < 0 or y >= self.height or x < 0 or x >= self.width:
            return False
        
        if self.dots[y][x]:
            self.dots[y][x] = False
            return True
        return False
    
    def count_dots(self):
        """Count the remaining dots in the maze."""
        count = 0
        for row in self.dots:
            for dot in row:
                if dot:
                    count += 1
        return count
    
    def get_player_start(self):
        """Get the player starting position."""
        for row in range(self.height):
            for col in range(self.width):
                if self.layout[row][col] == 3:
                    return (col, row)
        # Default position if not found
        return (14, 24)
    
    def get_ghost_starts(self):
        """Get the ghost starting positions."""
        positions = []
        for row in range(self.height):
            for col in range(self.width):
                if self.layout[row][col] == 4:
                    positions.append((col, row))
        
        # Ensure we have exactly 4 ghost positions
        while len(positions) < 4:
            positions.append((14, 10))  # Default ghost position
        
        return positions[:4]
    
    def draw(self, screen, wall_color, dot_color):
        """Draw the maze."""
        for row in range(self.height):
            for col in range(self.width):
                x = col * self.cell_size
                y = row * self.cell_size
                
                # Draw walls
                if self.layout[row][col] == 1:
                    pygame.draw.rect(screen, wall_color, 
                                   (x, y, self.cell_size, self.cell_size))
                
                # Draw dots
                elif self.dots[row][col]:
                    dot_x = x + self.cell_size // 2
                    dot_y = y + self.cell_size // 2
                    pygame.draw.circle(screen, dot_color, (dot_x, dot_y), 2)
