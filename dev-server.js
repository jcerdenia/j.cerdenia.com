import express from "express";
import { join } from "path";
import { getHomePage, getPage } from "./build.js";
import siteConfig from "./siteConfig.js";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send(getHomePage());
});

app.get("/:page/", (req, res) => {
  Object.keys(siteConfig.redirects).forEach((key) => {
    if (key === req.params.page) {
      res.redirect(siteConfig.redirects[key]);
    }
  });

  res.send(getPage(req.params.page));
});

app.get("/:dir/:file", (req, res) => {
  res.sendFile(req.params.file, {
    root: join("public", req.params.dir),
  });
});

app.listen(PORT, () => {
  console.log(`Development server listening at port ${PORT}.`);
});
