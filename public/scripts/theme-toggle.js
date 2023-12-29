function updateThemeToggle() {
  const { theme } = document.body.dataset;
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  toggle.className = `btn btn-${theme}`;
  icon.className = theme === "light" ? "bi bi-moon" : "bi bi-sun";
}

// eslint-disable-next-line no-unused-vars
function toggleTheme() {
  const { dataset } = document.body;
  dataset.theme = dataset.theme === "light" ? "dark" : "light";
  window.localStorage.setItem("theme", dataset.theme);
  updateThemeToggle();
}

updateThemeToggle();
