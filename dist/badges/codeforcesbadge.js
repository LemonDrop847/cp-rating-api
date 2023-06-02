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
const rankColors = {
    'legendary grandmaster': '#ff0000',
    'international grandmaster': '#ff0000',
    'master': '#ff8c00',
    'candidate master': '#a0a',
    'expert': '#0000ff',
    'specialist': '#03a89e',
    'pupil': '#008000',
    'newbie': '#808080'
};
router.get("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const apiUrl = `https://codeforces.com/api/user.info?handles=${username}`;
        const response = yield axios_1.default.get(apiUrl);
        const userData = response.data;
        if (userData.status !== 'OK' || !userData.result || userData.result.length === 0) {
            throw new Error('Failed to retrieve user information');
        }
        const user = userData.result[0];
        const rating = user.rating.toString();
        const rank = user.rank.toLowerCase();
        const color = rankColors[rank] || '';
        const badge = {
            schemaVersion: 1,
            label: 'Codeforces',
            message: rating,
            color: color,
            namedLogo: 'codeforces',
        };
        res.json(badge);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve Codechef rating" });
    }
}));
exports.default = router;
