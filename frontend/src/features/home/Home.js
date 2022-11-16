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
        <div>
          <h2>Events</h2>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar diam ac erat semper consequat eu nec justo. Morbi hendrerit
            feugiat purus eget porta. Pellentesque vulputate mollis augue, et
            tristique lectus fermentum sagittis. Maecenas arcu purus, vulputate
            pharetra sagittis eu, dapibus in nulla. Fusce commodo id nibh in
            malesuada. In sed augue eu risus volutpat pellentesque et nec nisi.
            Fusce facilisis dolor sit amet lacinia commodo. Etiam nec diam eu
            lacus tristique fermentum pretium nec nibh. Integer dapibus et ante
            quis lacinia. Vestibulum rutrum massa nisi, sed vulputate massa
            ultrices ut. Nullam tortor arcu, condimentum nec nibh vel, sagittis
            finibus tellus. Aenean sed nibh accumsan, auctor odio a, tincidunt
            tellus. Proin lectus eros, dapibus id tortor vel, accumsan aliquet
            nunc. Praesent a ligula congue, condimentum massa sed, porta dui.
          </p>
        </div>
        <div className="events-link">
          <Link to={"/films"}>Book Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
