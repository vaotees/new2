import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

// Public endpoint — returns only the GA ID (no auth required)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const config = await prisma.seoConfig.findUnique({
      where: { id: 'singleton' },
      select: { googleAnalyticsId: true },
    })
    return res.status(200).json({ googleAnalyticsId: config?.googleAnalyticsId ?? '' })
  } catch {
    return res.status(200).json({ googleAnalyticsId: '' })
  }
}
