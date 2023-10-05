
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyCarousel() {
  

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../assets/picone.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Movie Reviews</h3>
            <p>Looking forward to your feedback</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../assets/pictwo.jpg"
            alt="Movies"
          />
          <Carousel.Caption>
            <h3>Movies</h3>
            <p>Great Selection of movies</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../assets/picthree.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Talk to us today</h3>
            <p>Create a review Now</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
    </>
  );
}

export default MyCarousel;