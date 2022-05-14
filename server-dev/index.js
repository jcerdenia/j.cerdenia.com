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

app.get("/:path", (req, res) => {
  res.sendFile(`${req.params.path}.html`, {
    root: path.join("docs"),
  });
});

app.get("/public/:path", (req, res) => {
  res.sendFile(req.params.path, {
    root: path.join("docs", "public"),
  });
});

app.get("/css/style.css", (req, res) => {
  res.sendFile("style.css", {
    root: path.join("docs", "css"),
  });
});

app.listen(PORT, () => {
  console.log(`Development server listening at port ${PORT}.`);
});
