import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import NavigationBar from "./components/NavigationBar";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes> {/* Use Routes instead of Switch */}
          {/* Define your routes here */}
          {/* Example: */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/Login" element={<Login />} /> */}
          {/* <Route path="/Movies" element={<Movies />} /> */}
          {/* <Route path="/Reviews" element={<Reviews />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
