import express, { Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";

const router = express.Router();

function calculateStars(rating: number): number {
  if (rating < 1400) {
    return 1;
  } else if (rating < 1600) {
    return 2;
  } else if (rating < 1800) {
    return 3;
  } else if (rating < 2000) {
    return 4;
  } else if (rating < 2200) {
    return 5;
  } else if (rating < 2500) {
    return 6;
  } else {
    return 7;
  }
}

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = `https://www.codechef.com/users/${username}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const ratingSpan = $(".rating-star span");
    const avatar = $("img.profileImage").attr("src");
    const backgroundColor = ratingSpan.css("background-color");
    const country = $(".user-country-name").text();

    let countryRank: number | null = null;
    let globalRank: number | null = null;

    $(".rating-ranks li").each((index, element) => {
      const rankText = $(element).text().trim();
      if (rankText.includes("Country Rank")) {
        countryRank = parseInt($(element).find("strong").text());
      } else if (rankText.includes("Global Rank")) {
        globalRank = parseInt($(element).find("strong").text());
      }
    });

    const rating = $(".rating-number").text().substring(0, 4);
    const contestCount = parseInt($(".contest-participated-count b").text());

    const fullySolvedCount = parseInt(
      $(".rating-data-section.problems-solved")
        .find('h5:contains("Fully Solved")')
        .text()
        .match(/\((\d+)\)/)[1]
    );

    const partialSolvedCount = parseInt(
      $(".rating-data-section.problems-solved")
        .find('h5:contains("Partially Solved")')
        .text()
        .match(/\((\d+)\)/)[1]
    );

    const contests: string[] = [];
    $(".rating-data-section.problems-solved strong").each((index, element) => {
      const contest = $(element).text().replace(":", "");
      contests.push(contest);
    });

    const puzzleRating = parseInt(
      $(".games-rating-boxes")
        .find('.games-rating-box-head-text:contains("Puzzle Rating")')
        .closest(".games-rating-box")
        .find(".games-rating-box-body-text")
        .text()
    );

    const oneVsOneRating = parseInt(
      $(".games-rating-boxes")
        .find('.games-rating-box-head-text:contains("1v1 Rating")')
        .closest(".games-rating-box")
        .find(".games-rating-box-body-text")
        .text()
    );

    const stars = calculateStars(parseFloat(rating));

    const info = {
      username,
      avatar,
      rating,
      stars,
      country,
      globalRank,
      countryRank,
      puzzleRating,
      oneVsOneRating,
      participation: contestCount,
      color: backgroundColor,
      problemsSolved: fullySolvedCount,
      partialProblems: partialSolvedCount,
      contests,
    };

    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve Codechef rating" });
  }
});

export default router;
