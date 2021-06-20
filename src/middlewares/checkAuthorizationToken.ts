import { NextFunction, Request, Response } from 'express';

export function checkAuthorizationToken(request: Request, response: Response, next: NextFunction) {
  const access_token = request.headers.access_token as string;
  
  if(!access_token) {
    return response.status(403).json({ message: 'Missing access token!' });
  }

  const [, token] = access_token.split(' ');  

  if(token !== process.env.ACCESS_TOKEN) {
    return response.status(403).json({ message: 'Invalid access token!' });
  }

  return next();
}