import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = 'https://leetcode.com/graphql';
    let headersList = {
      accept: "*/*",
      "User-Agent": "CP-API",
      "content-type": "application/json",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "random-uuid": process.env.UUID,
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
      url: url,
      method: "POST",
      headers: headersList,
      data: JSON.stringify(gqlBody),
    };

    const response = await axios.request(reqParams);

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
