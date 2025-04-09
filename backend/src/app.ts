import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'

dotenv.config();

const app = express();

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