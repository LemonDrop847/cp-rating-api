import express from "express";
import codechefBadge from "./codechefbadge";
import codeforcesBadge from "./codeforcesbadge";
import leetcodeBadge from "./leetcodebadge";

const router = express.Router();

router.use("/codechef", codechefBadge);
router.use("/codeforces", codeforcesBadge);
router.use("/leetcode", leetcodeBadge);

export default router;
