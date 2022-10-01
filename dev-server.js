import connectLivereload from "connect-livereload";
import express from "express";
import livereload from "livereload";
import { join } from "path";

import { buildRssFeed, getHomePage, getPage } from "./build.js";
import { redirects } from "./siteConfig.js";

const app = express();
const liveReloadServer = livereload.createServer();
const PORT = 3000;

app.use(connectLivereload());

app.get("/", (_req, res) => {
  res.send(getHomePage());
});

app.get("/rss.xml", (_req, res) => {
  res.header("Content-Type", "application/xml");
  res.send(buildRssFeed());
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
