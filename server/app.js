import express from "express";
import Converter from "./converter/converter.js";
const app = express();
app.use(express.json()); // allow json to be posted to server

app.post("/createHTML", (req, res) => {
  const { markdown } = req.body;
  let convertedHtml;
  if (!markdown) {
    res.sendStatus(400);
    return;
  }

  try {
    convertedHtml = Converter.markdownToHtml(markdown);
  } catch (e) {
    res.sendStatus(500);
    return;
  }

  res.json({
    html: convertedHtml,
  });
});

export default app;
