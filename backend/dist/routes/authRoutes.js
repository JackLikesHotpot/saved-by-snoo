"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get('/api/auth_url', authController_1.getAuthUrl);
router.get('/auth_callback', authController_1.authCallback);
exports.default = router;
