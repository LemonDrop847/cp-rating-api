import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const { load } = require("cheerio");

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = 'https://leetcode.com/graphql';

    
    const response = await axios.get(url, {
        params: {
          operationName: 'getUserProfile',
          query: `{
            matchedUser(username: "${username}") {
              username
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
        },
      });
  
      const data = response.data.data.matchedUser;
  
      const languages = data.languages.map((language) => ({
        languageName: language.languageName,
        problemsSolved: language.problemsSolved,
      }));
  
      const submitStats = data.submitStats.acSubmissionNum;
  
      const problemsSolved = submitStats.reduce((total, stat) => total + stat.count, 0);
  
      const totalProblems = problemsSolved + submitStats.reduce((total, stat) => total + stat.submissions - stat.count, 0);
  
      const formattedData = {
        username: data.username,
        rank: data.rank,
        problemsSolved,
        totalProblems,
        submissions: submitStats.reduce((total, stat) => total + stat.submissions, 0),
        languages,
      };
  
      res.json(formattedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve LeetCode data' });
    }
  });
export default router;
