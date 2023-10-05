import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReviewList from './components/ReviewList';
import CreateReview from './components/CreateReview';
import MovieList from './components/MovieList';
import CreateMovie from './components/CreateMovie';
import UserList from './components/UserList';
import UserMovieList from './components/UserMovieList';
import RegisterLogin from './components/RegisterLogin'; 

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
              <Link to="/movielist">Movie List</Link>
            </li>
            <li>
              <Link to="/create-movie">Create Movie</Link>
            </li>
            
            <li>
              <Link to="/user-list">User List</Link>
            </li>
            <li>
              <Link to="/user-movies">User Movie List</Link>
            </li>
            <li>
              <Link to="/register-login">Register/Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/create-review" element={<CreateReview />} />
      
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/create-movie" element={<CreateMovie />} />
      
          <Route path="/user-list" element={<UserList />} />
          <Route path="/user-movies" element={<UserMovieList />} />
          <Route path="/register-login" element={<RegisterLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
