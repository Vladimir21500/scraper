"use client";

import { FC, useEffect } from "react";

export const Scraper: FC = () => {
  useEffect(() => {
    const init = async () => {
      const data = await fetch("/api/scrapeInstagram?url=https://www.instagram.com/p/Cs8t-YasL7y/").then(
        (res) => res.json()
      );

      console.log(data);
    };
    init();
  }, []);
  return <h1>Scraper</h1>;
};
