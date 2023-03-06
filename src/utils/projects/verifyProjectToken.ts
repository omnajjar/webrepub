import jwt, { JwtPayload } from 'jsonwebtoken';

export function verifyProjectToken(token: string): JwtPayload {
  return jwt.verify(
    token,
    process.env.PROJECT_TOKENS_SECRET as string
  ) as JwtPayload;
}
