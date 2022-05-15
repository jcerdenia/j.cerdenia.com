const express = require("express");
const path = require("path");
const { buildIndex, buildPage } = require("./build.js");

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send(buildIndex());
});

app.get("/:page", (req, res) => {
  res.send(buildPage(req.params.page));
});

app.get("/:dir/:file", (req, res) => {
  res.sendFile(req.params.file, {
    root: path.join("public", req.params.dir),
  });
});

app.listen(PORT, () => {
  console.log(`Development server listening at port ${PORT}.`);
});
