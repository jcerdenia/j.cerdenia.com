const siteConfig = {
  assets: {
    postscripts: ["theme-toggle.js"],
    prescripts: ["theme-init.js"],
    stylesheets: ["index.css"],
  },
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
  socialIcons: true,
  socials: [
    ["GitHub", "https://github.com/jcerdenia", "bi bi-github"],
    // ["X", "https://x.com/jc_erde", "bi bi-twitter-x"],
    ["Email", `mailto:joshua@cerdenia.com`, "bi bi-envelope-fill"],
    ["RSS", "/rss.xml", "bi bi-rss-fill"],
  ],
};

export const { assets, socials, socialIcons, metadata, redirects } = siteConfig;
