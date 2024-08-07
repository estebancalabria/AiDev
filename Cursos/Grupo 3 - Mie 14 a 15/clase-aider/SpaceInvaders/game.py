import pygame
import random

from entities import Player, Bullet, Enemy

class Game:
    def __init__(self):
        self.screen = pygame.display.set_mode((800, 600))
        self.clock = pygame.time.Clock()
        self.player = Player(400, 550)
        self.bullets = []
        self.enemies = []
        self.enemy_bullets = []
        self.create_enemies(10)

    def create_enemies(self, count):
        for _ in range(count):
            x = random.randint(30, 770)
            y = random.randint(30, 100)
            self.enemies.append(Enemy(x, y))

    def run(self):
        running = True
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_LEFT:
                        self.player.move(-10)
                    elif event.key == pygame.K_RIGHT:
                        self.player.move(10)
                    elif event.key == pygame.K_SPACE:
                        self.bullets.append(Bullet(self.player.x + 25, self.player.y - 20, "up"))
            self.screen.fill((0, 0, 0))
            self.player.draw(self.screen)
            for bullet in self.bullets:
                bullet.draw(self.screen)
                bullet.update()
                if bullet.y < 0:
                    self.bullets.remove(bullet)
                for enemy in self.enemies:
                    if (
                        bullet.x >= enemy.x
                        and bullet.x <= enemy.x + 30
                        and bullet.y >= enemy.y
                        and bullet.y <= enemy.y + 30
                    ):
                        self.enemies.remove(enemy)
                        self.bullets.remove(bullet)
                        break
            for enemy in self.enemies:
                enemy.draw(self.screen)
                enemy_bullet = enemy.update()
                if enemy_bullet:
                    self.enemy_bullets.append(enemy_bullet)
                if enemy.y > 600:
                    self.enemies.remove(enemy)
            for bullet in self.enemy_bullets:
                bullet.draw(self.screen)
                bullet.update()
                if bullet.y > 600:
                    self.enemy_bullets.remove(bullet)
                if (
                    bullet.x >= self.player.x
                    and bullet.x <= self.player.x + 50
                    and bullet.y >= self.player.y
                    and bullet.y <= self.player.y + 50
                ):
                    running = False
            if not self.enemies:
                self.create_enemies(10)
            pygame.display.flip()
            self.clock.tick(60)
        pygame.quit()
