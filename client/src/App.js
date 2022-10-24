import React, { useState } from "react";
import "./App.css";
import MarkdownInput from "./components/MarkdownInput/MarkdownInput";
import HTMLDisplay from "./components/HTMLDisplay/HTMLDisplay";
function App() {
  const [htmlText, setHtmlText] = useState("");
  return (
    <div className="App">
      <h1>Markdown to HTML Converter</h1>
      <MarkdownInput setHtmlText={setHtmlText} />
      <HTMLDisplay htmlText={htmlText} />
    </div>
  );
}

export default App;
