import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

const capabilities = {
  "tb:options": {
    key: "39f7b0fcbe91d6768e67f730dcec0c74",
    secret: "569c082858cb8a7cd5c8ae72ba720b67",
  },
  browserName: "chrome",
  browserVersion: "latest",
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.query.url as string;

  console.log(url);

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://cloud.testingbot.com/puppeteer?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities)
      )}`,
    });
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector("main");

    const content = await page.$eval("main span a span", (el) => el.textContent);

    console.log("main span a span", content);

    await browser.close();

    return res.status(200).json(content);
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ error: "Error parsing likes, location, comments" });
  }
};

export default handler;
