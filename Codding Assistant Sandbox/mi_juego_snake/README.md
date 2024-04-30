# Snake Game

This is a simple Snake game developed in Unity. The game allows the player to control a snake and eat food to grow longer. The objective is to avoid colliding with the walls or the snake's own body.

## Project Structure

```
mi_juego_snake
├── Assets
│   ├── Scripts
│   │   ├── SnakeController.cs
│   │   ├── FoodController.cs
│   │   └── GameController.cs
│   ├── Scenes
│   │   └── MainScene.unity
│   └── Prefabs
│       ├── Snake.prefab
│       └── Food.prefab
├── ProjectSettings
│   └── ProjectSettings.asset
└── README.md
```

## Scripts

### SnakeController.cs

This script handles the movement and behavior of the snake in the game.

### FoodController.cs

This script handles the spawning and behavior of the food in the game.

### GameController.cs

This script manages the game logic, such as score tracking and game over conditions.

## Scenes

### MainScene.unity

This is the main scene of the game, where the gameplay takes place. It includes the necessary components and references to the scripts.

## Prefabs

### Snake.prefab

This prefab represents the snake object in the game. It includes the necessary components and settings for the snake.

### Food.prefab

This prefab represents the food object in the game. It includes the necessary components and settings for the food.

## Project Settings

### ProjectSettings.asset

This file contains the project settings for Unity, such as editor preferences and import settings.

For more information on how to play the game and customize it, please refer to the documentation provided in the code comments of the scripts.

**Note:** This file is intentionally left blank.