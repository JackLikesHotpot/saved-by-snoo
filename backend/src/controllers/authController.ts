import { Request, Response } from 'express';
import snoowrap from 'snoowrap'

export const getAuthUrl = (req: Request, res: Response) => {

  const authUrl = snoowrap.getAuthUrl({
    clientId: process.env.CLIENT_ID!,
    scope: ['identity', 'read', 'history'],
    redirectUri: process.env.REDIRECT_URI!,
    permanent: true,
    state: crypto.randomUUID() 
  });

  res.json({ auth_url: authUrl });
};
export const authCallback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code;
  if (typeof code !== 'string') {
    res.status(400).send('Invalid or missing code');
    return
  }

  try {
    const r = await snoowrap.fromAuthCode({
      code,
      userAgent: process.env.USER_AGENT!,
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      redirectUri: process.env.REDIRECT_URI!
    });


const refreshToken = r.refreshToken

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    path: '/', 
  });

  res.redirect(`http://localhost:3000/output`);
 } 
 catch (err) {
  console.error('Auth error:', err);
  res.status(500).send(`Authentication failed: ${(err as Error).message || err}`);
}
};