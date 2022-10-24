import React, { useState } from "react";
import "./MarkdownInput.css";

const MarkdownInput = (props) => {
  const [markdown, setMarkdown] = useState("");

  const onMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/createHTML", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markdown: markdown }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.html);
        props.setHtmlText(data.html);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form className="create-markdown">
      <div className="form-group markdownText">
        <textarea
          className="form-control"
          id="markdown"
          rows="5"
          placeholder="Enter markdown"
          onChange={onMarkdownChange}
          value={markdown}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Convert to HTML
      </button>
    </form>
  );
};

export default MarkdownInput;
