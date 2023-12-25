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
const port = 3000;

app.use(connectLivereload());

app.get("/", (_req, res) => {
  res.send(HomePage());
});

app.get("/:path", (req, res) => {
  if (req.params.path === "rss.xml") {
    res.header("Content-Type", "application/xml");
    res.send(RSSFeed());
  }

  Object.keys(redirects).forEach((key) => {
    if (key === req.params.path) {
      res.redirect(redirects[key]);
    }
  });

  res.send(Page(req.params.path));
});

app.get("/:parent/:child", (req, res) => {
  const { parent, child } = req.params;

  if (child.includes(".")) {
    res.sendFile(child, { root: join("public", parent) });
  } else {
    res.send(Page(`${parent}/${child}`));
  }
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
