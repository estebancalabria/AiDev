using UnityEngine;

public class FoodController : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("SnakeHead"))
        {
            // Increase score
            GameController.Instance.IncreaseScore();

            // Spawn new food
            GameController.Instance.SpawnFood();

            // Destroy this food object
            Destroy(gameObject);
        }
    }
}