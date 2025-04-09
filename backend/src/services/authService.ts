const snoowrap = require('snoowrap')

export const initialiseReddit = () => {

  return new snoowrap({
    userAgent: process.env.USER_AGENT!,
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    redirectUri: process.env.REDIRECT_URI!
  })
}

// need to get refresh token, was done in flask