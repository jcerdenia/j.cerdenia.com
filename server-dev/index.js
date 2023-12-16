import { exec } from "child_process";
import connectLivereload from "connect-livereload";
import express from "express";
import livereload from "livereload";
import { join } from "path";

import HomePage from "../components/HomePage.js";
import Page from "../components/Page.js";
import RSSFeed from "../components/RSSFeed.js";
import { redirects } from "../siteConfig.js";
import { getState, setState } from "./state/accessors.js";

const app = express();
const liveReloadServer = livereload.createServer();
const port = 3300;

app.use(connectLivereload());

app.get("/", (_req, res) => {
  res.send(HomePage());
});

app.get("/rss.xml", (_req, res) => {
  res.header("Content-Type", "application/xml");
  res.send(RSSFeed());
});

app.get("/:page/", (req, res) => {
  Object.keys(redirects).forEach((key) => {
    if (key === req.params.page) {
      res.redirect(redirects[key]);
    }
  });

  res.send(Page(req.params.page));
});

app.get("/:dir/:file", (req, res) => {
  res.sendFile(req.params.file, {
    root: join("public", req.params.dir),
  });
});

app.listen(port, () => {
  console.log(`Dev server listening at port ${port}.`);

  if (!getState().browserOpened) {
    exec(`open http://localhost:${port}`, (error) => {
      if (error) {
        console.error(`Failed to open browser: ${error}`);
      } else {
        setState({ browserOpened: true });
      }
    });
  }
});

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
    console.log("Live reload triggered.");
  }, 100);
});
