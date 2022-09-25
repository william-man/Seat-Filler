import React from "react";
import Layout from "../../components/layout/Layout";
import { useEffect } from "react";
import filmStore from "./film_store";
import { fetchFilms } from "./filmSlice";
import { useSelector } from "react-redux";

const Films = () => {
  useEffect(() => {
    filmStore.dispatch(fetchFilms());
  }, []);
  const isLoading = useSelector((state) => state.film.isLoading);
  const isError = useSelector((state) => state.film.isError);
  const errorMessage = useSelector((state) => state.film.error);
  const data = useSelector((state) => state.film.data);
  return (
    <Layout>
      <div>
        <h2>Films</h2>
      </div>
      <div>{isLoading && "Loading..."}</div>
      <div>{isError && errorMessage}</div>
      <div>
        {data !== undefined &&
          data.length !== 0 &&
          data.map((film) => {
            return (
              <div key={film._id}>
                <img src={film.image} alt={film.name + " image"} />
                <p>{film.name}</p>
                <p>{film.desc}</p>
                <p>{film.duration}</p>
                <p>{film.directors}</p>
                <p>{film.stars}</p>
                <p>{film.rating.$numberDecimal}</p>
                <p>{film.release}</p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Films;
