import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReviewList from './components/ReviewList';
import CreateReview from './components/CreateReview';
import UserManagement from './components/UserManagement';
import MovieList from './components/MovieList'; // Corrected import path
import CreateMovie from './components/CreateMovie'; // Adjusted import path as needed
import SignUpPage from './components/SignUpPage'; // Removed the space at the end of the path
import LoginForm from './components/LoginForm'; // Added import for the LoginForm component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/reviews">Review List</Link>
            </li>
            <li>
              <Link to="/create-review">Create Review</Link>
            </li>
            <li>
              <Link to="/reviews/1">Review Item</Link>
            </li>
            <li>
              <Link to="/usermanagement">User Management</Link>
            </li>
            <li>
              <Link to="/movielist">Movie List</Link>
            </li>
            <li>
              <Link to="/create-movie">Create Movie</Link>
            </li>
            <li>
              <Link to="/login">Login</Link> {/* Link to the LoginForm component */}
            </li>
            <li>
              <Link to="/signup">Sign Up</Link> {/* Link to the SignUpPage component */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/create-movie" element={<CreateMovie />} />
          <Route path="/signup" element={<SignUpPage />} /> {/* Route for SignUpPage */}
          <Route path="/login" element={<LoginForm />} /> {/* Route for LoginForm */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
