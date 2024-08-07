import pygame
import random

class Entity:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def update(self):
        pass

    def draw(self, screen):
        pass


class Bullet(Entity):
    def __init__(self, x, y, direction):
        super().__init__(x, y)
        self.direction = direction

    def update(self):
        if self.direction == "up":
            self.y -= 10
        else:
            self.y += 10

    def draw(self, screen):
        pygame.draw.rect(screen, (255, 0, 0), (self.x, self.y, 10, 20))


class Enemy(Entity):
    def __init__(self, x, y):
        super().__init__(x, y)
        self.speed = 2
        self.direction = 1
        self.shoot_timer = 0

    def update(self):
        self.x += self.speed * self.direction
        if self.x < 0 or self.x > 800 - 30:
            self.direction *= -1
            self.y += 30
        self.shoot_timer += 1
        if self.shoot_timer >= 60:
            self.shoot_timer = 0
            return Bullet(self.x + 15, self.y + 30, "down")

    def draw(self, screen):
        pygame.draw.rect(screen, (0, 255, 0), (self.x, self.y, 30, 30))

class Player(Entity):
    def __init__(self, x, y):
        super().__init__(x, y)

    def move(self, dx):
        self.x += dx
        self.x = max(0, min(self.x, 800 - 50))

    def draw(self, screen):
        pygame.draw.rect(screen, (255, 255, 255), (self.x, self.y, 50, 50))
