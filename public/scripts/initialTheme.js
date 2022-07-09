function setInitialTheme() {
  const dataset = document.body.dataset;
  const theme = window.localStorage.getItem("theme");

  if (theme) {
    dataset.theme = theme;
  } else {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    dataset.theme = query.matches ? "dark" : "light";
  }
}

setInitialTheme();
