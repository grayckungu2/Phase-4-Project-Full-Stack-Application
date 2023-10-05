import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import the Link component
import NavigationBar from './NavigationBar';

function MovieList() {
  const [movies, setMovies] = useState([]);

  // Fetch the list of all available movies
  useEffect(() => {
    fetch('http://127.0.0.1:5000/movies', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch movies');
        }
      })
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div>
      <NavigationBar/>
      <h2 style={{ textAlign: 'center' }}>LIST OF MOVIES</h2>
      <div className="card-container">
        {movies.map((movie) => (
          <Card key={movie.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movie.imageUrl} alt={movie.title} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>ID: {movie.id}</ListGroup.Item>
              <ListGroup.Item>Release Date: {movie.release_date}</ListGroup.Item>
              <ListGroup.Item>Genre: {movie.genre}</ListGroup.Item>
              <ListGroup.Item>Creator ID: {movie.creator_id}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Link to="/create-review">
                <Button variant="primary">Create Review</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
