import React, { useState } from 'react';
import { Card, Button, Modal, Form, Alert } from 'react-bootstrap';

function ReviewItem({ review, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [updatedReview, setUpdatedReview] = useState({
    rating: review.rating,
    review_text: review.review_text,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleUpdateReview = () => {
    fetch(`http://127.0.0.1:5000/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReview),
    })
      .then((response) => {
        if (response.status === 200) {
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 2000);
          onUpdate(updatedReview);
          setEditing(false);
        } else {
          console.error('Error updating review:', response.statusText);
        }
      })
      .catch((error) => console.error('Error updating review:', error));
  };

  const handleDeleteReview = () => {
    fetch(`http://127.0.0.1:5000/reviews/${review.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 2000);
          onDelete(review.id);
        } else {
          console.error('Error deleting review:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting review:', error));
  };

  return (
    <Card>
      <Card.Body>
        {showSuccessMessage && (
          <Alert variant="success">Action completed successfully!</Alert>
        )}
        {editing ? (
          <div>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rating"
                value={updatedReview.rating}
                onChange={(e) =>
                  setUpdatedReview({ ...updatedReview, rating: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formReviewText">
              <Form.Label>Review Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Review Text"
                value={updatedReview.review_text}
                onChange={(e) =>
                  setUpdatedReview({
                    ...updatedReview,
                    review_text: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateReview}>
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditing(false)} // Cancel editing
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Card.Title>Rating: {review.rating}</Card.Title>
            <Card.Text>Review Text: {review.review_text}</Card.Text>
            <Card.Text>Date Created: {review.date_created}</Card.Text>
            <Button
              variant="info"
              onClick={() => setEditing(true)} // Start editing
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteReview}
            >
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ReviewItem;
