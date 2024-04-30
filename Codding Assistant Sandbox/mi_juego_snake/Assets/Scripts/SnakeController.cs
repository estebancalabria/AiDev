using UnityEngine;

public class SnakeController : MonoBehaviour
{
    public float moveSpeed = 5f;
    public float rotationSpeed = 180f;

    private Rigidbody2D rb;

    private void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");

        // Move the snake
        Vector2 movement = new Vector2(horizontalInput, verticalInput);
        rb.velocity = movement * moveSpeed;

        // Rotate the snake based on movement direction
        if (movement != Vector2.zero)
        {
            float angle = Mathf.Atan2(movement.y, movement.x) * Mathf.Rad2Deg;
            rb.rotation = angle - 90f;
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Food"))
        {
            // Handle food collision logic here
        }
        else if (collision.CompareTag("Obstacle"))
        {
            // Handle obstacle collision logic here
        }
    }
}