import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Alert } from 'react-bootstrap';

function UserMovieList() {
  const [userMovies, setUserMovies] = useState([]);
  const [newUserMovie, setNewUserMovie] = useState({
    user_id: '',
    movie_id: '',
    favorite: false,
    watched: false,
    user_rating: null,
  });
  const [notification, setNotification] = useState(null);

  // Fetch the list of all user movie entries
  useEffect(() => {
    fetch('http://127.0.0.1:5000/usermovies', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user movies');
        }
      })
      .then((data) => {
        setUserMovies(data.user_movies);
      })
      .catch((error) => {
        console.error('Error fetching user movies:', error);
      });
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewUserMovie({ ...newUserMovie, [name]: newValue });
  };

  // Handle form submission to create a new user movie entry
  const handleCreateUserMovie = () => {
    fetch('http://127.0.0.1:5000/usermovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserMovie),
    })
      .then((response) => response.json())
      .then(() => {
        // Show success message
        setNotification('User movie entry created successfully');

        // Clear the form
        setNewUserMovie({
          user_id: '',
          movie_id: '',
          favorite: false,
          watched: false,
          user_rating: null,
        });

        // Fetch the updated list of user movies
        fetch('http://127.0.0.1:5000/usermovies', {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            setUserMovies(data.user_movies);
          })
          .catch((error) => {
            console.error('Error fetching user movies:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating user movie entry:', error);
      });
  };

  return (
    <div>
      <h2>User Movie List</h2>
      {notification && <Alert variant="success">{notification}</Alert>}
      <Form>
        <Form.Group controlId="formUserId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="number"
            name="user_id"
            value={newUserMovie.user_id}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formMovieId">
          <Form.Label>Movie ID</Form.Label>
          <Form.Control
            type="number"
            name="movie_id"
            value={newUserMovie.movie_id}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formFavorite">
          <Form.Check
            type="checkbox"
            name="favorite"
            label="Favorite"
            checked={newUserMovie.favorite}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formWatched">
          <Form.Check
            type="checkbox"
            name="watched"
            label="Watched"
            checked={newUserMovie.watched}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formUserRating">
          <Form.Label>User Rating</Form.Label>
          <Form.Control
            type="number"
            name="user_rating"
            value={newUserMovie.user_rating || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreateUserMovie}>
          Create User Movie Entry
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Movie ID</th>
            <th>Favorite</th>
            <th>Watched</th>
            <th>User Rating</th>
          </tr>
        </thead>
        <tbody>
          {userMovies.map((userMovie) => (
            <tr key={userMovie.id}>
              <td>{userMovie.id}</td>
              <td>{userMovie.user_id}</td>
              <td>{userMovie.movie_id}</td>
              <td>{userMovie.favorite ? 'Yes' : 'No'}</td>
              <td>{userMovie.watched ? 'Yes' : 'No'}</td>
              <td>{userMovie.user_rating || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserMovieList;
