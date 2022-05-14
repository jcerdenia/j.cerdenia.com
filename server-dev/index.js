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

app.get("/:name", (req, res) => {
  const name = req.params.name;

  if (name.includes(".")) {
    res.sendFile(name, {
      root: path.join("docs", "public"),
    });
  } else {
    res.sendFile(`${name}.html`, {
      root: path.join("docs"),
    });
  }
});

app.get("/css/style.css", (req, res) => {
  res.sendFile("style.css", {
    root: path.join("docs", "css"),
  });
});

app.listen(PORT, () => {
  console.log(`Development server listening at port ${PORT}.`);
});
