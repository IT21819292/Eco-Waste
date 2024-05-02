import React,{useState, useEffect} from 'react';
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slide1 from '../images/slid1.jpg';
import Slide2 from '../images/slid2.jpg';
import Slide3 from '../images/slid3.jpg';

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide3}
            alt="First slide"
            style={{ width:'100vw',objectFit:'contain' }}
          />
          <Carousel.Caption>
            <h3>First Slide Label</h3>
            <p>Some description for the first slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide2}
            alt="Second slide"
            style={{ width:'100vw',objectFit:'contain' }}

          />
          <Carousel.Caption>
            <h3>Second Slide Label</h3>
            <p>Some description for the second slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slide1}
            alt="Third slide"
            style={{ width:'100vw',objectFit:'contain' }}
          />
          <Carousel.Caption>
            <h3>Third Slide Label</h3>
            <p>Some description for the third slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Home;