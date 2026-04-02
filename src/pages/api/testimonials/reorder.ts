import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ error: "Unauthorized" })

  if (req.method === "POST") {
    try {
      const { ids } = req.body

      if (!Array.isArray(ids)) {
        return res.status(400).json({ error: "Invalid data" })
      }

      await prisma.$transaction(
        ids.map((id, index) =>
          prisma.testimonial.update({
            where: { id },
            data: { order: index },
          })
        )
      )

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao reordenar depoimentos" })
    }
  }

  res.setHeader("Allow", ["POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
