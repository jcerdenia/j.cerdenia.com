# j.cerdenia.com

A bare-bones markdown-based static site powered by a custom static site generator.

Served at [j.cerdenia.com](https://j.cerdenia.com) (deployed with Vercel).

## Getting Started

To run locally, after cloning, install dependencies and run the development server:

```
npm i
npm run dev
```

When building, the sites's files are generated in the `public` folder. To build, run the build command:

```
npm run build
```

Then use a static file server like `serve` to serve the generated files:

```
npm i -g serve
serve public
```

## Creating Pages

To create a new page, run the following command:

```
npm run new <slug>
```

This will generate a new page in the `content` folder with the file name `<slug>.md`.

The system also supports parent and child pages. To create a parent page:

```
npm run new <slug> -
```

This will generate a folder `content/<slug>` which contains an `index.md` file.

To create a child page, simply run the same command, which will generate a file named `1.md` under `content/<slug>`. Subsequent runs of the same command will create files `2.md`, `3.md`, and so on. 

Child pages are automatically listed on the parent page, much like how the home page works. 

## Frameworks/Libraries

- [Express](https://expressjs.com/) development server to build individual pages on demand
- [`nodemon`](https://nodemon.io/), [`livereload`](https://www.npmjs.com/package/livereload) and [`connect-livereload`](https://www.npmjs.com/package/connect-livereload) for hot reloading in development
- [`gray-matter`](https://www.npmjs.com/package/gray-matter) and [`markdown-it`](https://www.npmjs.com/package/markdown-it) for parsing YAML front matter and markdown
- [`html-minifier`](https://www.npmjs.com/package/html-minifier) for minifying HTML output
- [Bootstrap](https://getbootstrap.com/) CSS and icons
