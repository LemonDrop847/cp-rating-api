import express, { Request, Response } from "express";
import axios from "axios";
import "dotenv/config";

const router = express.Router();
const { load } = require("cheerio");

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = "https://leetcode.com/graphql";
    let headersList = {
      accept: "*/*",
      "User-Agent": "CP-API",
      "content-type": "application/json",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "random-uuid": "80e12f5a-e1f3-623e-192e-bcd1a6f25fe3",
      authorization: "",
      "sec-ch-ua":
        '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      Referer: process.env.URL,
      cookie: process.env.COOKIE,
    };

    const gqlBody = {
      query: `query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          username
          profile {
            reputation
            ranking
            userAvatar
          }
          tagProblemCounts {
            advanced{
              tagName
              problemsSolved
            }
            intermediate{
              tagName
              problemsSolved
            }
            fundamental{
              tagName
              problemsSolved
            }
          }
          languages: languageProblemCount {
            languageName
            problemsSolved
          }
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }`,
      variables: { username },
    };
    let reqParams = {
      url: "https://leetcode.com/graphql",
      method: "POST",
      headers: headersList,
      data: JSON.stringify(gqlBody),
    };

    const response = await axios.request(reqParams);

    const data = response.data.data.matchedUser;

    const user = data.username;
    const avatar = data.profile.userAvatar;
    const rank = data.profile.ranking;
    const problemsSolved = data.submitStats.acSubmissionNum[0].count;
    const languages = data.languages;
    const totalProblems = response.data.data.allQuestionsCount[0].count;
    const submissions = data.submitStats.acSubmissionNum;
    const topics = data.tagProblemCounts;

    const formattedData = {
      user,
      rank,
      avatar,
      problemsSolved,
      languages,
      totalProblems,
      submissions,
      topics,
    };

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve LeetCode data" });
  }
});
export default router;
