import React from "react";
import { useEffect } from "react";
import { fetchFilms } from "./filmSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner";
import { Link } from "react-router-dom";
import "../../styles/features/films/films.scss";

const Films = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const { isLoading, isError, data } = useSelector((state) => state.film);

  return (
    <div className="films-container">
      <div className="films-heading">
        <h2>Films</h2>
      </div>
      {isLoading && (
        <div className="films-result">
          <div className="films-loader">
            <Spinner />
          </div>
        </div>
      )}
      {isError && data && (
        <div className="films-result">
          <div className="films-error">{data.error}</div>
        </div>
      )}
      {data !== undefined && data.length !== 0 && !isLoading && !isError && (
        <div className="films-result">
          {data.map((film) => {
            return (
              <div className="films-result-film" key={film._id}>
                <div className="films-result-image">
                  <img src={film.image} alt={film.name + " image"} />
                </div>
                <div className="films-result-col2">
                  <div className="films-result-name">
                    <p>{film.name}</p>
                  </div>
                  <div className="films-result-release">
                    <p>Release: {film.release}</p>
                  </div>
                  <div className="films-result-duration">
                    <p>Duration: {film.duration}</p>
                  </div>
                  <div className="films-result-rating">
                    <p>Rating: {film.rating.$numberDecimal}</p>
                  </div>
                </div>

                <div className="films-result-col3">
                  <div className="films-result-directors">
                    <p>Directors: {film.directors}</p>
                  </div>
                  <div className="films-result-stars">
                    <p>Starring: {film.stars}</p>
                  </div>
                </div>
                <div className="films-result-desc">
                  <p>{film.desc}</p>
                </div>
                <div className="films-result-buy">
                  <Link to={`/films/${film.name}`}>Buy Tickets</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Films;
