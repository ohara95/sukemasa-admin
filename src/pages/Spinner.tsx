import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
      <span
        className="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
        style={{ top: "45%" }}
      >
        <i className="fas fa-redo fa-spin fa-5x"></i>
      </span>
    </div>
  );
};

export default Spinner;
