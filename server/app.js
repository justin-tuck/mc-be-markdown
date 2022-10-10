import express from "express";
const app = express();
app.use(express.json()); // allow json to be posted to server
app.post("/createHTML", (req, res) => {
  console.log("CREATING HTML!");
  console.log(req);
  const { markdown } = req.body;
  if (!markdown) {
    res.sendStatus(400);
    return;
  }
  res.json({
    html: "<html></html>",
  });
});

export default app;
