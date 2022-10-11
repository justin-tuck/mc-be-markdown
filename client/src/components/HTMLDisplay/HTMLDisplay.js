import React from "react";
import "./HTMLDisplay.css";

const HTMLDisplay = (props) => {
  const htmlDisplay = props.htmlText.split("\n");
  return (
    <div>
      {htmlDisplay.map((line) => (
        <p>{line}</p>
      ))}
    </div>
  );
};

export default HTMLDisplay;
