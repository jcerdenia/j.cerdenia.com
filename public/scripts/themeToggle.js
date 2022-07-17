function updateThemeToggle() {
  const theme = document.body.dataset.theme;
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  toggle.className = `btn btn-${theme}`;
  icon.className = theme === "light" ? "bi bi-moon" : "bi bi-sun";
}

function toggleTheme() {
  const dataset = document.body.dataset;
  dataset.theme = dataset.theme === "light" ? "dark" : "light";
  window.localStorage.setItem("theme", dataset.theme);
  updateThemeToggle();
}

updateThemeToggle();
