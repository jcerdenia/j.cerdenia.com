---
title: "Dark Mode: A Simple JavaScript Implementation"
draft: false
---

This is a quick and easy dark mode implementation with plain JavaScript that can be built on and adapted to other frameworks.

# Defining styles

I favor an approach that relies on CSS data attributes and variables. In my main CSS file, I define separate sets of styles that represent my site's themes (in this case, "light" and "dark"):

```css
body[data-theme="light"] {
  --color-bg: #fff;
  --color-text: rgb(33, 37, 41);
  --color-shadow: #bcbcbc;
}

body[data-theme="dark"] {
  --color-bg: #202022;
  --color-text: rgb(224, 226, 226);
  --color-shadow: #000;
}
```

These variables can then simply be referenced elsewhere in the document, like so:

```css
html,
body {
  ...
  color: var(--color-text);
  background-color: var(--color-bg);
  ...
}
```
# Initializing the theme

The variable that controls the theme can be accessed at `document.body.dataset.theme`, whose value is either `light` or `dark`. 

When a page first loads, that value has to be initialized to either a previous setting (from a previous session, stored in `window.localStorage`) or the system default. this can be done with JavaScript:

```js
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

setInitialTheme(); // Call the above function immediately
```

I put the above code in a file, e.g. `initialTheme.js` and reference at the top of the body of my main HTML file. It's important that the script goes before all other content to ensure that it is evaluated before anything is painted to the screen.

```html
<body>
    <script src="./scripts/initialTheme.js"></script>
    ...
</body>
```

At this point, as soon as the page loads, it checks `window.localStorage` for a stored theme value. If it finds anything, that value will decide which set of CSS styles to use. Otherwise, it defaults to the system setting.

# Creating a toggle

Next I need a UI element to enable toggling between light and dark states. For me, that means a simple button with an icon. 

While in light mode, the icon should be a moon; in dark mode, a sun. Defining that behavior requires JavaScript. For now, I just create a basic `div` element that contains an icon in the body of my main HTML file:

```html
<body>
  ...
  <div id="theme-toggle">
    <i id="theme-icon"></i>
  </div>
</body>
```

That button needs a function to update itself depending on the current theme. I'm using Bootstrap and Bootstrap icons, so I just reference pre-made classes such as `btn btn-dark` and `btn btn-light` to set the button's color, and `bi bi-moon` and `bi bi-sun` to set the icons.

```js
function updateThemeToggle() {
  const theme = document.body.dataset.theme;
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  toggle.className = `btn btn-${theme}`;
  icon.className = theme === "light" ? "bi bi-moon" : "bi bi-sun";
}
```

Next, a function to actually change the theme whenever it's called. The function must first check the current value of `document.body.dataset` and change it to the opposite value. Then, that value is saved to local storage so that it persists between sessions. Finally, the button is updated to reflect the new theme, simply by calling `updateThemeToggle()`.

```js
function toggleTheme() {
  const dataset = document.body.dataset;
  dataset.theme = dataset.theme === "light" ? "dark" : "light";
  window.localStorage.setItem("theme", dataset.theme);
  updateThemeToggle();
}
```

The above two functions go in their own JS file, e.g. `themeToggle.js`. `updateThemeToggle()` also has to be called immediately to set the button's appearance based on the initial theme.

```js
function updateThemeToggle() {
  ...
}

function toggleTheme() {
  ...
}

updateThemeToggle(); // Call immediately when script runs
```

Finally, this new script goes at the bottom of the body of my main HTML file. To trigger a theme change each time the toggle is clicked, its `onclick` attribute is set to `toggleTheme()`.

```html
<body>
  <script src="./scripts/initialTheme.js"></script>
  ...
  <div id="theme-toggle" onclick="toggleTheme()">
    <i id="theme-icon"></i>
  </div>
  ...
  <script src="./scripts/themeToggle.js"></script>
</body>
```

And that's it.

# References

[Josh W. Comeau's](https://www.joshwcomeau.com/react/dark-mode/) "Quest for the Perfect Dark Mode" is widely cited and offers an excellent overview of the technical challenges. His tutorial is for Gatsby but can be easily applied to a different JavaScript-based project. 

[Rob Morieson's](https://electricanimals.com/articles/next-js-dark-mode-toggle) tutorial is more specific to Next.js and emphasizes CSS variables.