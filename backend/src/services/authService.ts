const snoowrap = require('snoowrap')
import dotenv from 'dotenv'
dotenv.config();

export const initialiseReddit = (accessToken: string) => {
  if (!accessToken) {
    throw new Error('Missing access token!')
  }

  return new snoowrap({
    userAgent: process.env.USER_AGENT!,
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    refreshToken: process.env.REFRESH_TOKEN!
  })
}
