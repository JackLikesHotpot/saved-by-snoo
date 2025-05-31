import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SECRET_KEY || '',  
  resave: false,
  saveUninitialized: true,
}))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(3001, () => {
  console.log(`Server running on 3001`);
})

// npx ts-node backend/src/app.ts