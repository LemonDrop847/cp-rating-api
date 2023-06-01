import express from 'express';
import codeforcesRouter from './codeforces/codeforces';
import codechefRouter from './codechef/codechef';

const app = express();
const PORT = 3000;

app.use('/codeforces', codeforcesRouter);
app.use('/codechef', codechefRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
