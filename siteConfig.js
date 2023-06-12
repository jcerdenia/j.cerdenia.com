const siteConfig = {
  links: [
    // eslint-disable-next-line prettier/prettier
    ["Source", "https://github.com/joshuacerdenia/j.cerdenia.com", "bi bi-github"],
    ["Music", "https://music.cerdenia.com", "bi bi-music-note"],
    ["Twitter", "https://twitter.com/jc_erde", "bi bi-twitter"],
    ["Mail", "mailto:joshua@cerdenia.com", "bi bi-envelope-fill"],
    ["RSS", "/feed", "bi bi-rss-fill"],
  ],
  metadata: {
    brand: "J. C.",
    copyright: `&#169; ${new Date().getFullYear()} Joshua Cerdenia`,
    description: "A Website",
    icon: "/images/icarus.jpeg",
    image: "/images/icarus.jpeg",
    siteUrl: "https://j.cerdenia.com",
  },
  redirects: {
    feed: "/rss.xml",
    music: "https://cerdenia.com",
  },
};

export const { links, metadata, redirects } = siteConfig;
