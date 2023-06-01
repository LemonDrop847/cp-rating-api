import express, { Request, Response } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

router.get('/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const url = `https://codeforces.com/profile/${username}`;

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const rating = $('.info ul li span').first().text();

    res.json({ rating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Codeforces rating' });
  }
});

export default router;
