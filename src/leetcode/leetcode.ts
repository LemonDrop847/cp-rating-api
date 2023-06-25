import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const { load } = require("cheerio");

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = 'https://leetcode.com/graphql';
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

    const response = await axios.post(url, gqlBody);

    const data = response.data.data.matchedUser;

    const user = data.username;
    const avatar = data.profile.userAvatar;
    const rank = data.profile.ranking;
    const problemsSolved = data.submitStats.acSubmissionNum[0].count;
    const languages = data.languages;
    const totalProblems = response.data.data.allQuestionsCount[0].count;
    const submissions = data.submitStats.acSubmissionNum;

    const formattedData = {
      user,
      rank,
      avatar,
      problemsSolved,
      languages,
      totalProblems,
      submissions,
    };

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve LeetCode data' });
  }
});
export default router;
