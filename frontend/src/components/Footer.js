import React, { useState } from 'react';
const Footer = () => {
    const [showEvents, setShowEvents] = useState(true);
  const [events] = useState([
    { title: "Branden", id: 1 },
    { title: "Grace", id: 2 },
    { title: "Joshua", id: 3 },
    { title: "Gabriel", id: 4 },
  ]);
    return ( 
        <>

{showEvents && (
        <div className="center-container">
          <button type="button" className="btn btn-info" onClick={() => setShowEvents(false)}>Hide Creators</button>
        </div>
      )}
      {!showEvents && (
        <div className="center-container">
          <button type="button" className="btn btn-primary" onClick={() => setShowEvents(true)}>Show Creators</button>
        </div>
      )}
      {showEvents && (
        <div className="card-container">
          {events.map((event) => (
            <div key={event.id} className="card">
              <div className="card-body">
                <p className="card-text">{event.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
     <footer className="bg-dark mt-2 text-white text-center">
      <p>&copy;2023.All Rights Reserved</p>
      <p>Email us at moviereviews@email.com</p>
      <p>call us @0938-2399-2399</p>
    </footer>
        </>
     );
}
 
export default Footer;