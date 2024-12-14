/* eslint-disable no-unused-vars */
import { promises as fs } from "fs";
import path from "path";

const GET = async (_request) => {
  try {
    // Ensure the 'content' directory exists
    const contentDir = path.resolve(process.cwd(), "content");
    await fs.mkdir(contentDir, { recursive: true });

    // Generate a random title
    const randomTitle = `Title-${Math.random().toString(36).substring(2, 8)}`;

    // Define the file content
    const fileContent = `---
title: ${randomTitle}
---

Test.`;

    // Write the markdown file
    const filePath = path.join(contentDir, `${randomTitle}.md`);
    await fs.writeFile(filePath, fileContent, "utf8");

    return new Response(`File created: ${filePath}`);
  } catch (error) {
    console.error(error);
    return new Response("Error creating file", { status: 500 });
  }
};

export default GET;
