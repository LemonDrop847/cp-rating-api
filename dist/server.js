"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeforces_1 = __importDefault(require("./codeforces/codeforces"));
const codechef_1 = __importDefault(require("./codechef/codechef"));
const codechefbadge_1 = __importDefault(require("./badges/codechefbadge"));
const codeforcesbadge_1 = __importDefault(require("./badges/codeforcesbadge"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use('/codeforces', codeforces_1.default);
app.use('/codechef', codechef_1.default);
app.use('/codechef/badge', codechefbadge_1.default);
app.use('/codeforces/badge', codeforcesbadge_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
