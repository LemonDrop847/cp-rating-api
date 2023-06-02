import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

const rankColors: { [key: string]: string } = {
  'legendary grandmaster': 'ff0000',
  'international grandmaster': 'ff0000',
  'master': 'ff8c00',
  'candidate master': '00a0a0',
  'expert': '0000ff',
  'specialist': '03a89e',
  'pupil': '008000',
  'newbie': '808080'
};

router.get('/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const apiUrl = `https://codeforces.com/api/user.info?handles=${username}`;

    const response = await axios.get(apiUrl);
    const userData = response.data;

    if (userData.status !== 'OK' || !userData.result || userData.result.length === 0) {
      throw new Error('Failed to retrieve user information');
    }

    const user = userData.result[0];
    const rating = user.rating.toString();
    const titlePhoto = user.titlePhoto;
    const rank = user.rank.toLowerCase();
    const handle = user.handle;
    const maxRating = user.maxRating.toString();
    const color = rankColors[rank] || '';

    res.json({ rating, titlePhoto, rank, handle, maxRating, color });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user information' });
  }
});

export default router;
