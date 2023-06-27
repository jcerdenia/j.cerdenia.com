import { setState } from "./accessors.js";

setState({ browserOpened: false });

console.log("\x1b[36m%s\x1b[0m", "Initialized dev server state.");
