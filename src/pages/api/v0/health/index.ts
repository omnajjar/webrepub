import { NextApiRequest, NextApiResponse } from 'next';

export default function health(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json('OK');
}
