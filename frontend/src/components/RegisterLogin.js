import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import '../login.css'

function RegisterLogin() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isRegistering: false, // To determine whether it's a registration or login
    message: '', // To display success or error messages
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, isRegistering } = formData;

    if (isRegistering) {
      // Registration logic
      if (password !== confirmPassword) {
        setFormData({ ...formData, message: 'Passwords must match' });
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.status === 200) {
          // Registration successful, display a success message
          setFormData({
            ...formData,
            message: 'Registration successful. You can now log in.',
          });
        } else {
          // Registration failed, display an error message
          const data = await response.json();
          setFormData({ ...formData, message: data.message });
        }
      } catch (error) {
        console.error('Error:', error);
        setFormData({ ...formData, message: 'Registration failed' });
      }
    } else {
      // Login logic
      try {
        const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
          // Login successful, display a success message
          setFormData({
            ...formData,
            message: 'Login successful. Redirecting to dashboard...',
          });

          // Redirect to the dashboard after a delay
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 3000);
        } else {
          // Login failed, display an error message
          const data = await response.json();
          setFormData({ ...formData, message: data.message });
        }
      } catch (error) {
        console.error('Error:', error);
        setFormData({ ...formData, message: 'Login failed' });
      }
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1>{formData.isRegistering ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {formData.isRegistering && (
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {formData.isRegistering && (
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit">
            {formData.isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>
        {formData.message && (
          <Alert variant="info">{formData.message}</Alert>
        )}
        <div>
          {formData.isRegistering
            ? 'Already have an account? '
            : "Don't have an account? "}
          <button
            onClick={() =>
              setFormData({
                ...formData,
                isRegistering: !formData.isRegistering,
                message: '', // Clear any previous message
              })
            }
          >
            {formData.isRegistering ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterLogin;
