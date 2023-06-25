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
    ticket_price: 0,
    amount: 1,
    time: "13:00",
  });

  useEffect(() => {
    const selectedFilm = { film_name: params.film_name };
    dispatch(fetchTickets(selectedFilm));
  }, [dispatch, params]);

  useEffect(() => {
    if (params.film_name === data.name) {
      setTickets((tickets) => ({
        ...tickets,
        id: data._id,
        name: data.name,
        ticket_price: data.price["$numberDecimal"],
      }));
    }
  }, [data, params.film_name]);

  // change initial amount to selected amount
  const onSelectAmount = (e) => {
    setTickets((tickets) => ({ ...tickets, amount: e.target.value }));
  };

  // change initial time to selected time
  const onSelectTime = (e) => {
    setTickets((tickets) => ({ ...tickets, time: e.target.value }));
  };

  // confirm selected time and tickets and direct to checkout page
  const selectTickets = (e) => {
    localStorage.removeItem("basket");
    localStorage.setItem(
      "basket",
      JSON.stringify({
        ...tickets,
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
              <button type="button" value={"13:00"} onClick={onSelectTime}>
                13:00
              </button>
              <button type="button" value={"15:00"} onClick={onSelectTime}>
                15:00
              </button>
              <button type="button" value={"17:00"} onClick={onSelectTime}>
                17:00
              </button>
              <button type="button" value={"19:00"} onClick={onSelectTime}>
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
            <button className="checkout" type="button" onClick={selectTickets}>
              Checkout
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Film;
