import React from "react";
import "./HTMLDisplay.css";

const HTMLDisplay = (props) => {
  const htmlDisplay = props.htmlText.split("\n");
  return (
    <div className="htmlDisplay">
      {htmlDisplay.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};

export default HTMLDisplay;
