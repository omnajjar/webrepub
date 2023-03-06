// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { createPDF } from '@/services/pdf';
import { generateProjectPagePrintURL } from '@/utils/projects/generateProjectPagePrintURL';
import { verifyProjectToken } from '@/utils/projects/verifyProjectToken';

export default async function generateProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  if (!isValidRequestBody(req.body)) {
    return res.status(400).send({ message: 'Invalid request body' });
  }

  const { projectId, fileName } = req.body;

  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  const token = req.headers.authorization.split(' ')[1]; // execlude 'Bearer' part.

  let decoded: JwtPayload;

  try {
    decoded = verifyProjectToken(token);

    if (decoded.projectId === projectId) {
      const pagePrintURL = generateProjectPagePrintURL(
        'v0',
        req.headers.host as string,
        projectId as string,
        token
      );
      const pdf = await createPDF(pagePrintURL);
      res.setHeader('Content-Type', 'application/pdf');
      if (fileName) {
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${fileName}.pdf`
        );
      }

      res.send(pdf);
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (err: unknown) {
    let msg = '';

    if (err instanceof Error) {
      msg += err.message;
    }
    res.status(401).send(`Unauthorized ${msg ? `: ${msg}` : ''}`);
  }
}

function isValidRequestBody(body: {
  projectId?: string;
  fileName?: string;
}): boolean {
  const { projectId, fileName } = body;

  // projectId is required
  if (!projectId || typeof projectId !== 'string') {
    return false;
  }

  // fileName is optional
  if (fileName && typeof fileName !== 'string') {
    return false;
  }

  return true;
}
