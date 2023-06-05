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
    const ratingRanksSection = $(".rating-ranks");
    const country=$(".user-country-name").text();
    const rankItems = ratingRanksSection.find("li");
    let countryRank = null;
    let globalRank = null;

    rankItems.each((index, element) => {
      const rankText = $(element).text().trim();
      if (rankText.includes("Country Rank")) {
        countryRank = parseInt($(element).find("strong").text());
      } else if (rankText.includes("Global Rank")) {
        globalRank = parseInt($(element).find("strong").text());
      }
    });
    const rating = $(".rating-number").text().substring(0, 4);
    const contestct = parseInt($(".contest-participated-count b").text());
    const problemsSolvedSection = $(".rating-data-section.problems-solved");
    const fullySolvedCount = parseInt(
      problemsSolvedSection
        .find('h5:contains("Fully Solved")')
        .text()
        .match(/\((\d+)\)/)[1]
    );
    const partialSolvedCount = parseInt(
      problemsSolvedSection
        .find('h5:contains("Partially Solved")')
        .text()
        .match(/\((\d+)\)/)[1]
    );
    const contests = [];
    problemsSolvedSection.find("strong").each((index, element) => {
      const contest = $(element).text().replace(":", "");
      contests.push(contest);
    });
    const gamesRatingBoxes = $(".games-rating-boxes");
    const puzzleRating = parseInt(
      gamesRatingBoxes
        .find('.games-rating-box-head-text:contains("Puzzle Rating")')
        .closest(".games-rating-box")
        .find(".games-rating-box-body-text")
        .text()
    );
    const oneVsRating = parseInt(
      gamesRatingBoxes
        .find('.games-rating-box-head-text:contains("1v1 Rating")')
        .closest(".games-rating-box")
        .find(".games-rating-box-body-text")
        .text()
    );
    const info = {
      rating: rating,
      country:country,
      globalRank: globalRank,
      countryRank: countryRank,
      puzzleRating:puzzleRating,
      onevsoneRating: oneVsRating,
      participation: contestct,
      color: backgroundColor,
      problemsSolved: fullySolvedCount,
      partialProblems: partialSolvedCount,
      contests: contests,
    };
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve Codechef rating" });
  }
});

export default router;
