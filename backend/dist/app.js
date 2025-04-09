"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_KEY || '',
    resave: false,
    saveUninitialized: true,
}));
app.use('/api/user', userRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.listen(3001, () => {
    console.log(`Server running on 3001`);
});
