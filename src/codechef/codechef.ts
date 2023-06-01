import express, { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

router.get('/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = `https://www.codechef.com/users/${username}`;

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const rating = $('.rating-number').text();

    res.json({ rating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Codechef rating' });
  }
});

export default router;
