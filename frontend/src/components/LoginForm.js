import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        // Login successful, show a success message and redirect after a few seconds
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard'); // Use navigate to redirect to the dashboard route
        }, 3000); // Redirect after 3 seconds
      } else {
        // Login failed, you can display an error message here
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your username"
              {...register('username', { required: true, maxLength: 25 })}
            />
          </Form.Group>
          {errors.username && <p style={{ color: 'red' }}><small>Username is required</small></p>}
          {errors.username?.type === "maxLength" && <p style={{ color: 'red' }}><small>Username should be 25 characters</small></p>}
          <br />

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              {...register('password', { required: true })}
            />
          </Form.Group>
          {errors.password && <p style={{ color: 'red' }}><small>Password is required</small></p>}
          <br />

          <Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form.Group>
          <br />

          <Form.Group>
            <small>Don't have an account? <a href="/signup">Sign Up</a></small>
          </Form.Group>
          <br />

          {showSuccess && (
            <Alert variant="success">
              Logged in successfully! Redirecting to the dashboard...
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
