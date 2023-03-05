// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default function generateProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId } = req.query;

  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  const token = req.headers.authorization.split(' ')[1]; // execlude 'Bearer' part.

  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(
      token,
      process.env.PROJECT_TOKENS_SECRET as Secret
    ) as JwtPayload;

    if (decoded.projectId === projectId) {
      return res.status(200).json({ access: true });
    }
  } catch (err: unknown) {
    let msg = '';

    if (err instanceof Error) {
      msg += err.message;
    }
    res.status(401).send(`Unauthorized ${msg ? `: ${msg}` : ''}`);
  }
}
