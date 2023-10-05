import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ReviewItem from './components/ReviewItem';
import ReviewList from './components/ReviewList';
import CreateReview from './components/CreateReview';
import Home from './components/Home'
function App() {
  return (
    <Router>
      <div>
        <Home />
        <nav>
          <ul>
            <li>
              <Link to="/reviews">Review List</Link>
            </li>
            <li>
              <Link to="/create-review">Create Review</Link>
            </li>
            {/* Add a link to ReviewItem with a dynamic ID */}
            <li>
              <Link to="/reviews/1">Review Item</Link>
            </li>
          </ul>
        </nav>

        {/* Use the 'Routes' component to define your routes */}
        <Routes>
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/:id" element={<ReviewItem />} />
          <Route path="/create-review" element={<CreateReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
