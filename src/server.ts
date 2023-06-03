import express from 'express';
import codeforcesRouter from './codeforces/codeforces';
import codechefRouter from './codechef/codechef';
import leetcodeRouter from './leetcode/leetcode';
import codechefBadge from './badges/codechefbadge';
import codeforcesBadge from './badges/codeforcesbadge';

const app = express();
const PORT = 3000;

app.use('/codeforces', codeforcesRouter);
app.use('/codechef', codechefRouter);
app.use('/leetcode',leetcodeRouter)
app.use('/codechef/badge',codechefBadge);
app.use('/codeforces/badge',codeforcesBadge);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;