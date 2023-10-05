import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function UserManagement() {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [notification, setNotification] = useState(null);

  // Function to handle changes in the form fields
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Function to create a new user
  const createUser = () => {
    fetch('http://127.0.0.1:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.status === 201) {
          setNotification('User created successfully.');
        } else if (response.status === 400) {
          setNotification('Username already exists. Please choose a different username.');
        } else {
          setNotification('An error occurred while creating the user.');
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  // JSX for the UserManagement component
  return (
    <div>
      <h2>User Management</h2>
      {notification && <Alert variant="info">{notification}</Alert>}
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={newUser.username}
            onChange={handleUserChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleUserChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={newUser.password}
            onChange={handleUserChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={createUser}>
          Create User
        </Button>
      </Form>
    </div>
  );
}

export default UserManagement;
