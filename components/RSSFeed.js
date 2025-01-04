import { Feed } from "feed";

import getFiles, { unpackFile } from "../lib/files.js";
import toHtml from "../lib/markdown.js";
import { compareBy } from "../lib/utils.js";
import { metadata } from "../siteConfig.js";

const RSSFeed = () => {
  const posts = getFiles()
    .map((name) => {
      const { data, content } = unpackFile(name);

      if (!Object.keys(data).includes("feed")) {
        data.feed = true;
      }

      if (data.parent) {
        data.title = `[${data.parent.title}] ${data.title}`;
      }

      return {
        content: toHtml(content),
        ...data,
      };
    })
    .filter((post) => !post.draft && post.feed && post.content)
    .sort(compareBy("date"))
    .reverse()
    .slice(0, 20);

  const baseUrl = metadata.siteUrl;

  const author = {
    email: metadata.email,
    link: baseUrl,
    name: metadata.author,
  };

  const feed = new Feed({
    author,
    copyright: metadata.copyright,
    description: metadata.description,
    favicon: baseUrl + metadata.icon,
    id: baseUrl,
    image: baseUrl + metadata.image,
    language: "en",
    link: `${baseUrl}/rss.xml`,
    title: metadata.brand,
    updated: new Date(),
  });

  posts.forEach((post) => {
    feed.addItem({
      author: [author],
      content: post.content.replace(
        /<p><img src="\//g,
        `<p><img src="${baseUrl}/`,
      ),
      contributor: [author],
      date: new Date(post.date || post._date),
      description: post.description,
      id: `${baseUrl}/${post.slug}`,
      image: baseUrl + metadata.image,
      link: `${baseUrl}/${post.slug}`,
      title: post.title,
    });
  });

  return feed.rss2();
};

export default RSSFeed;
