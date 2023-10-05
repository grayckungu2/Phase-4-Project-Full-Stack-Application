import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';

function CreateMovie({ onMovieCreated }) {
  const [newMovie, setNewMovie] = useState({
    title: '',
    release_date: '',
    genre: '',
    creator_id: 1, // Set the creator_id as needed
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = () => {
    // Perform validation here if needed
    if (!newMovie.title || !newMovie.release_date || !newMovie.genre) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Submit the movie to the server
    fetch('http://127.0.0.1:5000/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to create movie listing');
        }
      })
      .then((data) => {
        // Show success message
        setShowSuccessMessage(true);

        // Notify the parent component (MovieList) that a new movie has been created
        onMovieCreated(data.movie);

        // Clear the form and error message
        setNewMovie({
          title: '',
          release_date: '',
          genre: '',
          creator_id: 1, // Reset the creator_id as needed
        });
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error creating movie:', error);
        setErrorMessage('An error occurred while creating the movie listing.');
      });
  };

  return (
    <div>
      <h3>Create a New Movie</h3>
      <Card>
        <Card.Body>
          {showSuccessMessage && (
            <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
              Movie listing created successfully
            </Alert>
          )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={newMovie.title}
                onChange={handleMovieChange}
              />
            </Form.Group>
            <Form.Group controlId="formReleaseDate">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="release_date"
                value={newMovie.release_date}
                onChange={handleMovieChange}
              />
            </Form.Group>
            <Form.Group controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Genre"
                name="genre"
                value={newMovie.genre}
                onChange={handleMovieChange}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSubmit}>
            Create Movie
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CreateMovie;
