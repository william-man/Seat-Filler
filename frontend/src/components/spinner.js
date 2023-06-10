import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "../styles/components/spinner.scss";

const Spinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <PulseLoader color="#05C8D1" />
      </div>
    </div>
  );
};

export default Spinner;
