import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchTickets } from "./bookingSlice";
import Spinner from "../../components/spinner";
import "../../styles/features/films/film.scss";

const Film = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { isLoading, isError, data, error } = useSelector(
    (state) => state.booking
  );

  const [tickets, setTickets] = useState({
    id: "",
    name: "",
    price: 0,
    amount: 1,
    time: "13:00",
  });

  useEffect(() => {
    const selectedFilm = { film_name: params.film_name };
    dispatch(fetchTickets(selectedFilm));
  }, [dispatch, params]);

  const onSelectAmount = (e) => {
    setTickets((prevState) => {
      return { ...prevState, amount: e.target.value };
    });
  };
  const onSelectTime = (e) => {
    setTickets((prevState) => {
      return { ...prevState, time: e.target.value };
    });
  };
  const selectTickets = (e) => {
    localStorage.removeItem("basket");
    localStorage.setItem(
      "basket",
      JSON.stringify({
        ...tickets,
        id: params.film_id,
        name: data.name,
        price: data.price.$numberDecimal,
      })
    );
    navigate("/films/" + params.film_id + "/checkout");
    e.preventDefault();
  };

  return (
    <div className="film-container">
      <div className="film-spinner">{isLoading && <Spinner />}</div>
      <div className="film-error">{isError && error}</div>
      {data !== undefined && data.length !== 0 && (
        <div className="film-form-container">
          <form className="film-form">
            <div className="film-form-name">{data.name}</div>
            <div className="film-form-time">
              <button value={"13:00"} onClick={onSelectTime}>
                13:00
              </button>
              <button value={"15:00"} onClick={onSelectTime}>
                15:00
              </button>
              <button value={"17:00"} onClick={onSelectTime}>
                17:00
              </button>
              <button value={"19:00"} onClick={onSelectTime}>
                19:00
              </button>
            </div>
            <div className="film-form-tickets">
              <label htmlFor="tickets">Number of tickets: </label>
              <select id="tickets" onChange={onSelectAmount}>
                {Array.from(
                  Array(data.stock >= 10 ? 10 : data.stock),
                  (e, i) => i + 1
                ).map((amount) => {
                  return (
                    <option key={amount} value={amount}>
                      {amount}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="film-form-price">
              Adult: {"£" + data.price.$numberDecimal + ".00"}
            </div>
            <button onClick={selectTickets}>Checkout</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Film;
