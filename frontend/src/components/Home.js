import MyCarousel from "./MyCarousel";
import NavigationBar from "./NavigationBar";
import { useState } from "react";
import '../nav.css'; // Import the CSS file

const Home = () => {
  const [showEvents, setShowEvents] = useState(true);
  const [events] = useState([
    { title: "Branden", id: 1 },
    { title: "Grace", id: 2 },
    { title: "Joshua", id: 3 },
    { title: "Gabriel", id: 4 },
  ]);

  return (
    <>
      <NavigationBar />
      <MyCarousel />

      {showEvents && (
        <div className="center-container">
          <button type="button" class="btn btn-info" onClick={() => setShowEvents(false)}>Hide Creators</button>
        </div>
      )}
      {!showEvents && (
        <div className="center-container">
          <button  type="button" class="btn btn-primary" onClick={() => setShowEvents(true)}>Show Creators</button>
        </div>
      )}
      {showEvents && (
        <div className="card-container">
          {events.map((event, index) => (
            <div key={event.id} className="card">
              <img className="card-img-top" src="..." alt="creators" />
              <div className="card-body">
                <p className="card-text">{event.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
