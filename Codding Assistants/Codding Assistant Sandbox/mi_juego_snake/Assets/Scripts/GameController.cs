using UnityEngine;
using UnityEngine.SceneManagement;

public class GameController : MonoBehaviour
{
    public SnakeController snakeController;
    public FoodController foodController;
    public int score;

    private bool gameOver;

    private void Start()
    {
        score = 0;
        gameOver = false;
    }

    private void Update()
    {
        if (gameOver)
        {
            if (Input.GetKeyDown(KeyCode.Space))
            {
                RestartGame();
            }
        }
    }

    public void IncreaseScore()
    {
        score++;
    }

    public void GameOver()
    {
        gameOver = true;
        Debug.Log("Game Over! Your score: " + score);
    }

    private void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}