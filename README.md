# Joshua Cerdenia's Digital Garden

A frameworkless poor man's static site generator building a bare-bones static site from markdown.

Served at [garden.cerdenia.com](https://garden.cerdenia.com) (deployed with Vercel).

To run locally, after cloning, install dependencies and run the development server:

```
npm i
npm run dev
```

When building, the sites's HTML files are generated in the `public` folder. To build:

```
npm run build
```

## Features

- Express.js development server building individual pages on demand
- Dark mode using vanilla JS trickery
- CSS assitance from Bootstrap