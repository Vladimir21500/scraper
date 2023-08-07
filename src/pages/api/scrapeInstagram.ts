import { NextApiRequest, NextApiResponse } from "next";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.query.url as string;

  console.log(url);

  try {
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    });
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector("main");

    const content = await page.$eval("main span a span", (el) => el.textContent);

    console.log("main span a span", content);

    return res.status(200).json(content);
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ error: "Error parsing likes, location, comments" });
  }
};

export default handler;
