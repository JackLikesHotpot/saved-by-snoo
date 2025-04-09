import { Request, Response } from 'express';
import { initialiseReddit } from '../services/authService';

export const getAuthUrl = (req: Request, res: Response) => {
  const reddit = initialiseReddit();
  const authUrl = reddit.auth.url(
    ['identity', 'read', 'history'],{ state:'...', duration:'permanent'});
  res.json({ auth_url: authUrl })
}

export const authCallback = (req: Request, res: Response) => {
  const code = req.query.code;
  const reddit = initialiseReddit();
  const redditCode = reddit.auth.authorize(code)

  if (req.session) {
    req.session.access_token = redditCode;
  }

  const username = reddit.user.me().name;
  res.redirect(`http://localhost:3000/form?username=${username}`)
}