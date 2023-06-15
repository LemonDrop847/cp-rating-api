import express, { Request, Response } from "express";
import codeforcesRouter from "./codeforces/codeforces";
import codechefRouter from "./codechef/codechef";
import leetcodeRouter from "./leetcode/leetcode";
import badgeRouter from "./badges/badges";


const app = express();
const PORT = 3000;
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(__dirname + '/static/home.html');
});

app.use("/codeforces", codeforcesRouter);
app.use("/codechef", codechefRouter);
app.use("/leetcode", leetcodeRouter);
app.use("/badge",badgeRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
