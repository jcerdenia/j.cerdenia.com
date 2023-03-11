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
    brand: "Joshua Cerdenia",
    copyright: "&#169; 2022 Joshua Cerdenia",
    description: "The online home of Joshua Cerdenia",
    icon: "/images/hkg.jpeg",
    image: "/images/hkg.jpeg",
    siteUrl: "https://j.cerdenia.com",
  },
  redirects: {
    feed: "/rss.xml",
    music: "https://cerdenia.com",
  },
};

export const { links, metadata, redirects } = siteConfig;
