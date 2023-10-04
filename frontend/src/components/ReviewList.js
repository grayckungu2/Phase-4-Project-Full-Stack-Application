import React, { useState, useEffect } from 'react';

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user_id: '', rating: '', review_text: '' });

  // Fetch reviews for the specific movie
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/movies/${movieId}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data.reviews))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, [movieId]);

  // Handle form submission to create a new review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/movies/${movieId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh the reviews list after creating a new review
        fetch(`http://127.0.0.1:5000/movies/${movieId}/reviews`)
          .then((response) => response.json())
          .then((data) => setReviews(data.reviews))
          .catch((error) => console.error('Error fetching reviews:', error));
      })
      .catch((error) => console.error('Error creating review:', error));
  };

  return (
    <div>
      <h2>Movie Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review.review_text}</li>
        ))}
      </ul>
      <h3>Create a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <label>
          User ID:
          <input
            type="number"
            value={newReview.user_id}
            onChange={(e) => setNewReview({ ...newReview, user_id: e.target.value })}
            required
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            required
          />
        </label>
        <label>
          Review Text:
          <textarea
            value={newReview.review_text}
            onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
            required
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewList;
