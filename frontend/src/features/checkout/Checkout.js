import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmPayment, resetPayment } from "./checkoutSlice";
import "../../styles/features/checkout/checkout.scss";
import Spinner from "../../components/spinner";

const Checkout = () => {
  const basket = JSON.parse(localStorage.getItem("basket"));
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.payment
  );

  const [order, setOrder] = useState({
    email: localStorage.getItem("user")
      ? localStorage.getItem("user").email
      : "",
    card: "",
    basket: basket,
    total: basket.price * basket.amount,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const cardChange = (e) => {
    setOrder((prevState) => {
      return { ...prevState, card: e.target.value };
    });
  };

  const payment = (e) => {
    e.preventDefault();
    dispatch(resetPayment());
    dispatch(confirmPayment(order));
  };

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess) {
      setSuccess(message);
    }
  }, [isError, isSuccess, message, dispatch]);

  return (
    <div className="checkout-container">
      <div className="checkout-heading">
        <h1>Checkout</h1>
      </div>
      {isLoading && <div className="loader">{Spinner}</div>}
      {isError && <div className="error">{error}</div>}
      {isSuccess && <div className="success">{success}</div>}
      <div className="checkout-film">{basket.name}</div>
      <div className="checkout-tickets">Number of tickets: </div>
      <div className="checkout-time">Time: </div>
      <div className="checkout-price">Adult: </div>
      <div className="checkout-total">total:</div>
      <div className="checkout-tickets-number">{basket.amount}</div>
      <div className="checkout-time-selected">{basket.time}</div>
      <div className="checkout-price-number">£{basket.price}.00</div>
      <div className="checkout-total-number"> £{order.total}.00</div>
      <form className="checkout-form">
        <label htmlFor="card">Please enter your 12-digit card number.</label>
        <input id="card" type={"text"} onChange={cardChange} />
        <button onClick={payment}>Confirm payment</button>
      </form>
    </div>
  );
};

export default Checkout;
