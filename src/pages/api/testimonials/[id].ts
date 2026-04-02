import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ error: "Unauthorized" })

  const { id } = req.query

  if (req.method === "PUT") {
    try {
      const { authorName, authorRole, content, rating, avatarUrl } = req.body
      const testimonial = await prisma.testimonial.update({
        where: { id: String(id) },
        data: { authorName, authorRole, content, rating, avatarUrl },
      })
      return res.status(200).json(testimonial)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao atualizar depoimento" })
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.testimonial.delete({
        where: { id: String(id) },
      })
      return res.status(204).end()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao excluir depoimento" })
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
