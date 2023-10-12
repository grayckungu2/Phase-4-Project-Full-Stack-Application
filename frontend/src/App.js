import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewList from './components/ReviewList';
import CreateReview from './components/CreateReview';
import MovieList from './components/MovieList';
import CreateMovie from './components/CreateMovie';
import UserList from './components/UserList';
import UserMovieList from './components/UserMovieList';
import RegisterLogin from './components/RegisterLogin';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterLogin  />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/ReviewList" element={<ReviewList/>} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/create-movie" element={<CreateMovie />} />
        <Route path="/user-movies" element={<UserMovieList />} />

      
      </Routes>
    </Router>
  );
}

export default App;
