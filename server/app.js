import express from "express";
import Converter from "./converter.js";
const app = express();
app.use(express.json()); // allow json to be posted to server

app.post("/createHTML", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    res.sendStatus(400);
    return;
  }
  res.json({
    html: Converter.markdownToHtml(markdown),
  });
});

export default app;
