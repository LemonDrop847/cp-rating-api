import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

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
    const rank = data.profile.ranking;
    const totalProblems = response.data.data.allQuestionsCount[0].count;
    const problemsSolved = data.submitStats.acSubmissionNum[0].count;
    const problems = problemsSolved+'/'+totalProblems;
    const badge = {
        schemaVersion: 1,
        label: 'LeetCode',
        message: problems,
        color: '#a0a',
        namedLogo: 'leetcode',
        labelColor: '#000000',
        logoColor:'#d16c06',
      };
    res.json(badge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve Leetcode rating" });
  }
});

export default router;
