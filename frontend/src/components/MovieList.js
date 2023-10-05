import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

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
      <h2>List of Movies</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th>Creator ID</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.release_date}</td>
              <td>{movie.genre}</td>
              <td>{movie.creator_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MovieList;
