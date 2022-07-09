const express = require("express");
const path = require("path");
const { getHomePage, getPage } = require("./build.js");
const { redirects } = require("./siteConfig");

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send(getHomePage());
});

app.get("/:page/", (req, res) => {
  Object.keys(redirects).forEach((key) => {
    if (key === req.params.page) {
      res.redirect(redirects[key]);
    }
  });

  res.send(getPage(req.params.page));
});

app.get("/:dir/:file", (req, res) => {
  res.sendFile(req.params.file, {
    root: path.join("public", req.params.dir),
  });
});

app.listen(PORT, () => {
  console.log(`Development server listening at port ${PORT}.`);
});
