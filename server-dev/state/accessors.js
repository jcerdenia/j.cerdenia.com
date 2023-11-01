import fs from "fs";

const STATE_FILE_PATH = "./server-dev/state/state.json";

const ENCODING = "utf8";

export const getState = () => {
  try {
    const data = fs.readFileSync(STATE_FILE_PATH, ENCODING);
    return JSON.parse(data);
  } catch {
    return {};
  }
};

export const setState = (data) => {
  const state = { ...getState(), ...data };
  fs.writeFileSync(STATE_FILE_PATH, JSON.stringify(state), ENCODING);
};
