import { NextApiRequest, NextApiResponse } from 'next';

import { createPDF } from '@/services/pdf';

export default async function print(req: NextApiRequest, res: NextApiResponse) {
  const url = `http://${req.headers.host}/print`;

  const pdf = await createPDF(url);

  res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=dummy.pdf');
  res.send(pdf);
}
