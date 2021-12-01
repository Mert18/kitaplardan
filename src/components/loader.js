import React from "react";
import "../App.css";

const Loader = () => {
  return (
    <div className="orange-spinner">
      <div className="orange-bubble"></div>
      <div className="black-bubble"></div>
    </div>
  );
};

export default Loader;
