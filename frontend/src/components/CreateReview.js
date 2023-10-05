import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function CreateReview() {
  const [formData, setFormData] = useState({
    user_id: '', // User ID
    rating: '',
    review_text: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/movies/5/reviews', { // Replace 5 with the actual movie ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setMessage('Review created successfully');
        setError('');
      } else if (response.status === 404) {
        const data = await response.json();
        setMessage('');
        setError(data.message);
      } else {
        setMessage('');
        setError('An error occurred while creating the review.');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred while creating the review.');
    }
  };

  return (
    <div>
      <h1>Create Review</h1>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formReviewText">
          <Form.Label>Review Text</Form.Label>
          <Form.Control
            as="textarea"
            name="review_text"
            value={formData.review_text}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Review
        </Button>
      </Form>
    </div>
  );
}

export default CreateReview;
