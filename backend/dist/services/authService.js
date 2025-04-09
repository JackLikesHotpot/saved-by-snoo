"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialiseReddit = void 0;
const snoowrap_1 = __importDefault(require("snoowrap"));
const initialiseReddit = () => {
    return new snoowrap_1.default({
        userAgent: process.env.USER_AGENT,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    });
};
exports.initialiseReddit = initialiseReddit;
