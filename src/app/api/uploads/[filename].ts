// pages/api/uploads/[filename].ts
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;
  if (typeof filename !== 'string') {
    return res.status(400).end('Invalid filename');
  }

  const filePath = path.join(process.cwd(), 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).end('File not found');
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filename).toLowerCase();

  // Define o content-type básico só para jpg e png, pode melhorar
  const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

  res.setHeader('Content-Type', contentType);
  res.send(fileBuffer);
}
