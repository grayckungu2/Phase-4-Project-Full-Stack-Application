import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Table, Message } from 'semantic-ui-react';

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchMovieId, setSearchMovieId] = useState('');
  const [searchedReviews, setSearchedReviews] = useState([]);
  const [notification, setNotification] = useState(null);

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

  const handleSearchReviewsByMovieId = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/movies/${searchMovieId}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setSearchedReviews(data.reviews);
      } else {
        console.error('Error fetching reviews by movie ID:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching reviews by movie ID:', error);
    }
  };

  const handleUpdateReview = async () => {
    if (!selectedReview) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews/${selectedReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedReview),
      });
      if (response.ok) {
        // Review updated successfully
        setNotification('Review updated successfully.');
        // Update the review in the reviews list
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === selectedReview.id ? selectedReview : review
          )
        );
        setShowModal(false);
      } else {
        const data = await response.json();
        console.error('Error updating review:', data.message);
        setNotification('An error occurred while updating the review.');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      setNotification('An error occurred while updating the review.');
    }
  };
  const handleDeleteReview = async () => {
    if (!selectedReview) {
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews/${selectedReview.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Review deleted successfully
        setNotification('Review deleted successfully.');
        // Remove the deleted review from the reviews list
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== selectedReview.id));
        setSelectedReview(null);
        setShowModal(false);
      } else {
        const data = await response.json();
        console.error('Error deleting review:', data.message);
        setNotification('An error occurred while deleting the review.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      setNotification('An error occurred while deleting the review.');
    }
  }
  

  return (
    <div>
      <h2>{movieId ? `Reviews for Movie ID ${movieId}` : 'All Reviews'}</h2>
      <Form>
        <Form.Field>
          <label>Search Reviews by Movie ID</label>
          <Form.Input
            type="number"
            placeholder="Movie ID"
            value={searchMovieId}
            onChange={(e) => setSearchMovieId(e.target.value)}
          />
        </Form.Field>
        <Button primary onClick={handleSearchReviewsByMovieId}>
          Search
        </Button>
      </Form>

      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell>Review Text</Table.HeaderCell>
            <Table.HeaderCell>Date Created</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {searchedReviews.length > 0
            ? searchedReviews.map((review) => (
                <Table.Row key={review.id}>
                  <Table.Cell>{review.rating}</Table.Cell>
                  <Table.Cell>{review.review_text}</Table.Cell>
                  <Table.Cell>{review.date_created}</Table.Cell>
                  <Table.Cell>
                    <Button
                      primary
                      onClick={() => handleReviewClick(review)}
                    >
                      View
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            : reviews.map((review) => (
                <Table.Row key={review.id}>
                  <Table.Cell>{review.rating}</Table.Cell>
                  <Table.Cell>{review.review_text}</Table.Cell>
                  <Table.Cell>{review.date_created}</Table.Cell>
                  <Table.Cell>
                    <Button
                      primary
                      onClick={() => handleReviewClick(review)}
                    >
                      View
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table>

      {/* Review Modal */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Modal.Header>Review Details</Modal.Header>
        <Modal.Content>
          <Card fluid>
            <Card.Content>
              {selectedReview ? (
                <>
                  <Form>
                    <Form.Field>
                      <label>Rating</label>
                      <input
                        type="number"
                        value={selectedReview.rating}
                        onChange={(e) => setSelectedReview({ ...selectedReview, rating: e.target.value })}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Review Text</label>
                      <textarea
                        value={selectedReview.review_text}
                        onChange={(e) => setSelectedReview({ ...selectedReview, review_text: e.target.value })}
                      />
                    </Form.Field>
                  </Form>
                </>
              ) : (
                <Message>
                  <Message.Header>No review selected.</Message.Header>
                </Message>
              )}
              {notification && <Message success>{notification}</Message>}
            </Card.Content>
          </Card>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={handleCloseModal}>
            Close
          </Button>
          <Button primary onClick={handleUpdateReview}>
            Update Review
          </Button>
          <Button negative onClick={handleDeleteReview}>
            Delete Review
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ReviewList;
