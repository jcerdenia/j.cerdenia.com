const express = require("express");
const path = require("path");
const build = require("./build.js");

const app = express();
const PORT = 3000;

build();

app.get("/", (_req, res) => {
  res.sendFile("index.html", {
    root: path.join("docs"),
  });
});

app.get("/:page", (req, res) => {
  res.sendFile(`${req.params.page}.html`, {
    root: path.join("docs"),
  });
});

app.get("/:dir/:file", (req, res) => {
  res.sendFile(req.params.file, {
    root: path.join("docs", req.params.dir),
  });
});

app.listen(PORT, () => {
  console.log(`Development server listening at port ${PORT}.`);
});
