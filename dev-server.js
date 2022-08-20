import connectLivereload from "connect-livereload";
import express from "express";
import livereload from "livereload";
import { join } from "path";

import { getHomePage, getPage } from "./build.js";
import siteConfig from "./siteConfig.js";

const app = express();
const liveReloadServer = livereload.createServer();
const PORT = 3000;

app.use(connectLivereload());

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
  console.log(`Dev server listening at port ${PORT}.`);
});

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
    console.log("Live reload triggered.");
  }, 100);
});
