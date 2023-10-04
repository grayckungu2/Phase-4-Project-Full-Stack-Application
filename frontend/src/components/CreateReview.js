import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';

function CreateReview({ movieId, onReviewCreated }) {
  const [newReview, setNewReview] = useState({
    user_id: 1, // Set the user ID as needed
    rating: '',
    review_text: '',
  });
  const [notification, setNotification] = useState(null);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = () => {
    // Perform validation here if needed
    if (!newReview.rating || !newReview.review_text) {
      setNotification('Please fill in all fields.');
      return;
    }

    // Submit the review to the server
    fetch(`http://127.0.0.1:5000/movies/${movieId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then(() => {
        // Notify parent component of successful review creation
        onReviewCreated(newReview);

        // Reset the form and clear the notification
        setNewReview({
          user_id: 5, // Reset the user ID as needed
          rating: '',
          review_text: '',
        });
        setNotification('Review created successfully.');
      })
      .catch((error) => {
        console.error('Error creating review:', error);
        setNotification('An error occurred while creating the review.');
      });
  };

  return (
    <Card>
      <Card.Body>
        <h3>Create a New Review</h3>
        {notification && <Alert variant="success">{notification}</Alert>}
        <Form>
          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              name="rating"
              value={newReview.rating}
              onChange={handleReviewChange}
            />
          </Form.Group>
          <Form.Group controlId="formReviewText">
            <Form.Label>Review Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Review Text"
              name="review_text"
              value={newReview.review_text}
              onChange={handleReviewChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateReview;
