"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
const { load } = require("cheerio");
function getRatingColor(backgroundColor) {
    if (backgroundColor) {
        return backgroundColor.replace("#", "");
    }
    return "";
}
router.get("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const url = `https://www.codechef.com/users/${username}`;
        const response = yield axios_1.default.get(url);
        const $ = load(response.data);
        const ratingSpan = $(".rating-star span");
        const backgroundColor = ratingSpan.css("background-color");
        const rating = $(".rating-number").text().substring(0, 4);
        const color = getRatingColor(backgroundColor);
        res.json({ rating, color });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve Codechef rating" });
    }
}));
exports.default = router;
