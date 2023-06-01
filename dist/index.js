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
const cheerio_1 = __importDefault(require("cheerio"));
const app = (0, express_1.default)();
const PORT = 3000;
// Codeforces endpoint
app.get('/codeforces/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const url = `https://codeforces.com/profile/${username}`;
        // Fetch the user's profile page
        const response = yield axios_1.default.get(url);
        // Load the HTML content into cheerio
        const $ = cheerio_1.default.load(response.data);
        // Extract the rating from the profile page
        const rating = $('.user-rank').text();
        res.json({ rating });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve Codeforces rating' });
    }
}));
// Codechef endpoint
app.get('/codechef/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const url = `https://www.codechef.com/users/${username}`;
        // Fetch the user's profile page
        const response = yield axios_1.default.get(url);
        // Load the HTML content into cheerio
        const $ = cheerio_1.default.load(response.data);
        // Extract the rating from the profile page
        const rating = $('.rating-number').text();
        res.json({ rating });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve Codechef rating' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
