import express, { Request, Response } from "express";
import codeforcesRouter from "./codeforces/codeforces";
import codechefRouter from "./codechef/codechef";
import leetcodeRouter from "./leetcode/leetcode";
import codechefBadge from "./badges/codechefbadge";
import codeforcesBadge from "./badges/codeforcesbadge";
import leetcodeBadge from "./badges/leetcodebadge";

const app = express();
const PORT = 3000;
app.get("/", (res: Response) => {
  res.sendFile(__dirname + "/static/home.html");
});

app.use("/codeforces", codeforcesRouter);
app.use("/codechef", codechefRouter);
app.use("/leetcode", leetcodeRouter);
app.use("/codechef/badge", codechefBadge);
app.use("/codeforces/badge", codeforcesBadge);
app.use("/leetcode/badge", leetcodeBadge);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
