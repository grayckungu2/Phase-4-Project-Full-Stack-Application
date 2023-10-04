import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchReviewId, setSearchReviewId] = useState('');
  const [searchedReview, setSearchedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let url = `http://127.0.0.1:5000/reviews`;
        if (movieId) {
          url = `http://127.0.0.1:5000/movies/${movieId}/reviews`;
        }

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews);
        } else {
          console.error('Error fetching reviews:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setShowModal(false);
  };

  const handleSearchReview = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews/${searchReviewId}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedReview(data); // Set the searched review
        setShowModal(true); // Show modal with the searched review
      } else {
        console.error('Error fetching review by ID:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching review by ID:', error);
    }
  };

  return (
    <div>
      <h2>{movieId ? 'Reviews for Movie' : 'All Reviews'}</h2>
      <Form>
        <Form.Group controlId="formReviewId">
          <Form.Label>Search Review by ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Review ID"
            value={searchReviewId}
            onChange={(e) => setSearchReviewId(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearchReview}>
          Search
        </Button>
      </Form>
      {reviews.map((review) => (
        <Card key={review.id} onClick={() => handleReviewClick(review)}>
          <Card.Body>
            <Card.Title>Rating: {review.rating}</Card.Title>
            <Card.Text>Review Text: {review.review_text}</Card.Text>
            <Card.Text>Date Created: {review.date_created}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      {/* Review Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              {searchedReview ? (
                <>
                  <Card.Title>Rating: {searchedReview.rating}</Card.Title>
                  <Card.Text>Review Text: {searchedReview.review_text}</Card.Text>
                  <Card.Text>Date Created: {searchedReview.date_created}</Card.Text>
                </>
              ) : (
                <p>No review found with the specified ID.</p>
              )}
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReviewList;
