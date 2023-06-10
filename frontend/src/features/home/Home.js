import React, { useEffect, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link } from "react-router-dom";
import images from "./posters/posters";
import "../../styles/features/home/home.scss";
import { FaStepForward, FaStepBackward } from "react-icons/fa";
import Size from "../../components/windowSize";

const Home = () => {
  const [slides, setSlides] = useState("");
  const [total, setTotal] = useState(0);
  const width = Size();

  useEffect(() => {
    const changeTotalSlides = () => {
      if (width <= 640) {
        setTotal(parseInt(images.length));
      } else if (width <= 1007) {
        setTotal(Math.ceil(images.length / 2));
      } else {
        setTotal(Math.ceil(images.length / 3));
      }
    };
    changeTotalSlides();
  }, [width]);

  useEffect(() => {
    const changeSlideImages = () => {
      let list = [];
      let current = [];
      let n = Math.ceil(images.length / total);

      for (let i = 0; i < images.length; i++) {
        current.push(images[i]);
        if (current.length === n) {
          list.push(current);
          current = [];
        } else if (i === images.length - 1) {
          list.push(current);
          current = [];
        }
      }
      setSlides(list);
    };
    changeSlideImages();
  }, [total]);

  return (
    <div className="home-container">
      <div className="carousel">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={30}
          totalSlides={total}
          isPlaying={true}
          interval={5000}
          infinite={true}
          isIntrinsicHeight={true}
        >
          <Slider>
            {total !== 0 &&
              slides.map((slide, i) => {
                return (
                  <Slide index={i} key={`${i}`}>
                    <div className="img-container">
                      <div className="img-1">
                        <img
                          className="img-poster"
                          src={slide[0]}
                          alt="poster"
                        ></img>
                      </div>
                      {slide[1] && (
                        <div className="img-2">
                          <img
                            className="img-poster"
                            src={slide[1]}
                            alt="poster"
                          ></img>
                        </div>
                      )}
                      {slide[2] && (
                        <div className="img-3">
                          <img
                            className="img-poster"
                            src={slide[2]}
                            alt="poster"
                          ></img>
                        </div>
                      )}
                    </div>
                  </Slide>
                );
              })}
          </Slider>
          <div className="button-container">
            <ButtonBack className="button-slide">
              <FaStepBackward style={{ verticalAlign: "middle" }} />
            </ButtonBack>
            <ButtonNext className="button-slide">
              <FaStepForward style={{ verticalAlign: "middle" }} />
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
      <div className="events">
        <div className="events-container">
          <div>
            <h2>Superhero season</h2>
          </div>
          <div>
            <p>
              Time to suit up! The greatest action spectacles of our time await
              you this superhero season at Seatfiller. Watch with awe as mighty
              heroes save the earth from calamity and foil the schemes of mad
              villains. An adventure for the whole family - with awesome visual
              effects, dramatic stories and heroic values. Super deals available
              all season long!
            </p>
          </div>
          <div className="events-link">
            <Link to={"/films"}>Book Now</Link>
          </div>
        </div>
      </div>
      <div className="deals">
        
        <div className="deals-container">
          <div className="deal-1">
            <h2>Team Ticket Tuesday</h2>
            <p>
              United we stand! Every Tuesday, any group of 6 or more tickets are
              buy 5 get 1 free. Suitable for school and sports teams, friend
              groups, or assemble your own squad to save.
            </p>
          </div>
          <div className="deal-2">
            <h2>Family 4-pack</h2>
            <p>
              Bring the whole crew and save! Any group of 4 tickets only $40.
              Perfect for friends and family to enjoy superhero adventures
              together on the big screen.
            </p>
          </div>
          <div className="deal-3">
            <h2>Opening Night discount</h2>
            <p>
              The first to see the newest superhero movie will pay the lowest
              price. Tickets for opening night screenings are discounted by up
              to 30%. For the earliest audiences and die-hard fans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
