"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCallback = exports.getAuthUrl = void 0;
const authService_1 = require("../services/authService");
const getAuthUrl = (req, res) => {
    const reddit = (0, authService_1.initialiseReddit)();
    const authUrl = reddit.auth.url(['identity', 'read', 'history'], { state: '...', duration: 'permanent' });
    res.json({ auth_url: authUrl });
};
exports.getAuthUrl = getAuthUrl;
const authCallback = (req, res) => {
    const code = req.query.code;
    const reddit = (0, authService_1.initialiseReddit)();
    const redditCode = reddit.auth.authorize(code);
    req.session.access_token = redditCode;
    const username = reddit.user.me().name;
    res.redirect(`http://localhost:3000/form?username=${username}`);
};
exports.authCallback = authCallback;
