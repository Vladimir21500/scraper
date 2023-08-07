const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, ".dist-puppeteer", "puppeteer"),
  browserRevision: "115.0.5790.170",
};
