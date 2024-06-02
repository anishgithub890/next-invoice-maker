import prismadb from '@/lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

// Import your database connection or any other data source
// For example, using Prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { email } = req.query;

    try {
      // Fetch all email addresses from the database
      const emails = await prismadb.user.findMany({ select: { email: true } });

      // Check if the provided email exists in the fetched list
      const emailExists = emails.some((user) => user.email === email);

      res.status(200).json({ exists: emailExists });
    } catch (error) {
      console.error('Error fetching emails:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
