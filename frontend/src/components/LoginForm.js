import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showError, setShowError] = useState(false);
  const history = useHistory();

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
      const response = await fetch('http://127.0.0.1:5000/login', { // Update this URL to match your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        // Login successful, redirect to the dashboard
        history.push('/dashboard');
      } else {
        // Login failed, display an error message
        setShowError(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Your username"
            />
          </Form.Group>
          {showError && <Alert variant="danger">Invalid username or password</Alert>}
          <br />

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Your password"
            />
          </Form.Group>
          <br />

          <Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form.Group>
          <br />

          <Form.Group>
            <small>Don't have an account? <Link to="/register">Create One</Link></small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
