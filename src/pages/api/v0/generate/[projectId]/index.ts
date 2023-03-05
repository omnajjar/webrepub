// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

export default function hello(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'Hello' });
}
