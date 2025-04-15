import dotenv from "dotenv";
import express from "express";
import path from "path";
import { handleSSR } from "./handleSSR";

dotenv.config();

const PORT = 8000;
const app = express();
const clientPath = path.dirname(require.resolve("../package.json"));

// Media
app.use(
  "/static/media",
  express.static(path.join(clientPath, "build/static/media"))
);

// CSS
app.use("/static/css", (req, res, next) => {
  res.setHeader("Content-Type", "text/css");
  next();
});
app.use(
  "/static/css",
  express.static(path.join(clientPath, "build/static/css"))
);

// JS
app.use("/static/js", (req, res, next) => {
  res.setHeader("Content-Type", "text/javascript");
  next();
});
app.use("/static/js", express.static(path.join(clientPath, "build/static/js")));

// 1. Dynamic Robots.txt Route
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`
    User-agent: * 
    Allow: https://customer.shoplocal.digital
    Allow: https://customer.shoplocal.digital/signup

    Sitemap: https://customer.shoplocal.digital/sitemap.xml
  `);
});

// 2. Dynamic Sitemap.xml Route
app.get("/sitemap.xml", (req, res) => {
  // Set the content type to XML
  res.type("application/xml");

  // Send the XML content with no extra spaces or lines before the XML declaration
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      <url>
          <loc>https://customer.shoplocal.digital/</loc>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://customer.shoplocal.digital/signup</loc>
          <priority>1.0</priority>
      </url>
  </urlset>`);
});

// SSR rendering logic
app.use("/", async (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const html = await handleSSR(req, res);
  res.status(200).send(html);
});

// Serve static files (build folder)
app.use(express.static(path.resolve(__dirname, "..", "build")));

// Start the server
app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
