import remix from "@remix-run/express";
import express from "express";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const app = express();

// Resolve the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert path to a file:// URL
const buildPath = pathToFileURL(path.join(__dirname, "../build/server/index.js")).href;

// Dynamically import the build file as an ES module
const build = await import(buildPath);

app.all(
  "*",
  remix.createRequestHandler({
    build,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
