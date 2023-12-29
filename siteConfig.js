const siteConfig = {
  assets: {
    postscripts: ["theme-toggle.js"],
    prescripts: ["theme-init.js"],
    stylesheets: ["index.css"],
  },
  linkMode: "icon",
  links: [
    ["GitHub", "https://github.com/jcerdenia", "bi bi-github"],
    // ["Music", "https://www.youtube.com/watch?v=YhaNa_622Wc", "bi bi-music-note"],
    // ["Twitter", "https://twitter.com/jc_erde", "bi bi-twitter"],
    ["Mailing List", `https://tinyletter.com/jcerdenia`, "bi bi-envelope-fill"],
    ["RSS", "/rss.xml", "bi bi-rss-fill"],
  ],
  metadata: {
    author: "Joshua Cerdenia",
    brand: "J. C.",
    // copyright: `&#169; ${new Date().getFullYear()} Joshua Cerdenia`,
    description: "A Website",
    email: "joshua@cerdenia.com",
    icon: "/images/pp_lake.jpeg",
    image: "/images/pp_lake.jpeg",
    siteUrl: "https://j.cerdenia.com",
  },
  redirects: {
    feed: "/rss.xml",
    music: "https://cerdenia.com",
  },
};

export const { assets, links, linkMode, metadata, redirects } = siteConfig;
