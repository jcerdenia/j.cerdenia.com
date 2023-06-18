const AUTHOR = "Joshua Cerdenia";
const EMAIL = "joshua@cerdenia.com";

const siteConfig = {
  linkMode: "icon",
  links: [
    // eslint-disable-next-line prettier/prettier
    ["Source", "https://github.com/joshuacerdenia/j.cerdenia.com", "bi bi-github"],
    ["Music", "https://music.cerdenia.com", "bi bi-music-note"],
    ["Twitter", "https://twitter.com/jc_erde", "bi bi-twitter"],
    ["Mail", `mailto:${EMAIL}`, "bi bi-envelope-fill"],
    ["RSS", "/rss.xml", "bi bi-rss-fill"],
  ],
  metadata: {
    author: AUTHOR,
    brand: "J. C.",
    copyright: `&#169; ${new Date().getFullYear()} ${AUTHOR}`,
    description: "A Website",
    email: EMAIL,
    icon: "/images/icarus.jpeg",
    image: "/images/icarus.jpeg",
    siteUrl: "https://j.cerdenia.com",
  },
  redirects: {
    feed: "/rss.xml",
    music: "https://cerdenia.com",
  },
};

export const { links, linkMode, metadata, redirects } = siteConfig;
