import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method === "GET") {
    try {
      const testimonials = await prisma.testimonial.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      })
      return res.status(200).json(testimonials)
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar depoimentos" })
    }
  }

  if (req.method === "POST") {
    try {
      const { authorName, authorRole, content, rating } = req.body
      
      const count = await prisma.testimonial.count()

      const testimonial = await prisma.testimonial.create({
        data: {
          authorName,
          authorRole,
          content,
          rating: rating || 5,
          order: count,
        },
      })
      return res.status(201).json(testimonial)
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar depoimento" })
    }
  }

  res.setHeader("Allow", ["GET", "POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
