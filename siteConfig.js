const siteConfig = {
  assets: {
    postscripts: ["theme-toggle.js"],
    prescripts: ["theme-init.js"],
    stylesheets: ["index.css"],
  },
  linkMode: "icon",
  links: [
    ["GitHub", "https://github.com/jcerdenia", "bi bi-github"],
    ["Music", "https://cerdenia.com", "bi bi-music-note"],
    // ["Twitter", "https://twitter.com/jc_erde", "bi bi-twitter"],
    // ["Mailing List", `https://tinyletter.com/jcerdenia`, "bi bi-envelope-fill"],
    ["RSS", "/rss.xml", "bi bi-rss-fill"],
  ],
  metadata: {
    author: "Joshua Cerdenia",
    brand: "J. C.",
    // copyright: `&#169; ${new Date().getFullYear()} Joshua Cerdenia`,
    description: "a personal website",
    email: "joshua@cerdenia.com",
    icon: "/images/egret.jpeg",
    image: "/images/egret.jpeg",
    siteUrl: "https://j.cerdenia.com",
  },
  redirects: {
    feed: "/rss.xml",
    music: "https://cerdenia.com",
  },
};

export const { assets, links, linkMode, metadata, redirects } = siteConfig;
