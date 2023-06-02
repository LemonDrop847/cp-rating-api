import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const { load } = require("cheerio");

function getRatingColor(backgroundColor): string {
  if (backgroundColor) {
    return backgroundColor.replace("#", "");
  }
  return "";
}

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = `https://www.codechef.com/users/${username}`;

    const response = await axios.get(url);
    const $ = load(response.data);
    const ratingSpan = $(".rating-star span");
    const backgroundColor = ratingSpan.css("background-color");

    const rating = $(".rating-number").text().substring(0, 4);
    const color = getRatingColor(backgroundColor);

    res.json({ rating, color });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve Codechef rating" });
  }
});

export default router;
