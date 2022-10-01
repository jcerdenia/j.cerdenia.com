const siteConfig = {
  links: [
    ["Source", "https://github.com/joshuacerdenia/j.cerdenia.com"],
    ["GitHub", "https://github.com/joshuacerdenia"],
    ["Music", "https://music.cerdenia.com"],
    ["Contact", "mailto:joshua@cerdenia.com"],
    ["RSS", "/feed"],
  ],
  metadata: {
    brand: "Joshua Cerdenia",
    copyright: "&#169; 2022 Joshua Cerdenia",
    description: "The online home of Joshua Cerdenia",
    icon: "/images/village.jpeg",
    image: "/images/village.jpeg",
    siteUrl: "https://j.cerdenia.com",
  },
  redirects: {
    feed: "/rss.xml",
    music: "https://cerdenia.com",
  },
};

export const { links, metadata, redirects } = siteConfig;
