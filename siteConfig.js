const siteConfig = {
  links: [
    // eslint-disable-next-line prettier/prettier
    ["GitHub", "https://github.com/joshuacerdenia", "bi bi-github"],
    ["Music", "https://music.cerdenia.com", "bi bi-music-note"],
    ["Gram", "https://instagram.com/joshuatopia", "bi bi-instagram"],
    ["Contact", "mailto:joshua@cerdenia.com", "bi bi-envelope-fill"],
    ["RSS", "/feed", "bi bi-rss-fill"],
  ],
  metadata: {
    brand: "J. C.",
    copyright: `&#169; ${new Date().getFullYear()} Joshua Cerdenia`,
    description: "A website",
    icon: "/images/marsh.jpeg",
    image: "/images/marsh.jpeg",
    siteUrl: "https://j.cerdenia.com",
  },
  redirects: {
    feed: "/rss.xml",
    music: "https://cerdenia.com",
  },
};

export const { links, metadata, redirects } = siteConfig;
