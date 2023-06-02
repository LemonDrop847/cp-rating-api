import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const { load } = require("cheerio");

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = `https://www.codechef.com/users/${username}`;

    const response = await axios.get(url);
    const $ = load(response.data);
    const ratingSpan = $(".rating-star span");
    const backgroundColor = ratingSpan.css("background-color");
    const rating = $(".rating-number").text().substring(0, 4);
    const badge = {
        schemaVersion: 1,
        label: 'CodeChef',
        message: rating,
        color: backgroundColor,
        namedLogo: 'codechef',
        logoColor: '#f5f5dc',
        labelColor: '#7b5e47',
      };
    res.json(badge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve Codechef rating" });
  }
});

export default router;
