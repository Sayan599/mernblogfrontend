import Carousel from 'react-bootstrap/Carousel';
import './uncontrolledexample.css'

function UncontrolledExample() {
  return (
    <Carousel fade interval={600}>
      <Carousel.Item>
        <img 
          className="imgCarasole d-block w-100"
          src="https://images.pexels.com/photos/1110659/pexels-photo-1110659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="imgCarasole d-block w-100"
          src="https://images.pexels.com/photos/462038/pexels-photo-462038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="imgCarasole d-block w-100"
          src="https://images.pexels.com/photos/410756/pexels-photo-410756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;