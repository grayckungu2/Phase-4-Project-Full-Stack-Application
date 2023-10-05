import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyCarousel() {
  const [showEvents, setShowEvents] = useState(true);
  const [events] = useState([
    { title: "Branden", id: 1 },
    { title: "Grace", id: 2 },
    { title: "Joshua", id: 3 },
    { title: "Gabriel", id: 4 },
  ]);

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
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
}

export default MyCarousel;
