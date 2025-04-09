"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const getProfile = (req, res) => {
    const username = req.session.username;
    if (!username) {
        res.status(401).json({ message: 'not authenticated' });
    }
    res.json({ username });
};
exports.getProfile = getProfile;
