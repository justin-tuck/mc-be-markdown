import React from "react";
import "./HTMLDisplay.css";

const HTMLDisplay = (props) => {
  const htmlDisplay = props.htmlText.split("\n");
  return (
    <div className="htmlDisplay">
      {htmlDisplay.map((line, i) => (
        <pre key={i}>{line}</pre>
      ))}
    </div>
  );
};

export default HTMLDisplay;
