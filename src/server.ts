import express from 'express';
import codeforcesRouter from './codeforces/codeforces';
import codechefRouter from './codechef/codechef';
import codechefBadge from './badges/codechefbadge';

const app = express();
const PORT = 3000;

app.use('/codeforces', codeforcesRouter);
app.use('/codechef', codechefRouter);
app.use('/codechef/badge',codechefBadge);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;