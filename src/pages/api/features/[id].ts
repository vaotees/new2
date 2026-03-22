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
      const { title, description, icon } = req.body
      const feature = await prisma.feature.update({
        where: { id: id as string },
        data: { title, description, icon },
      })
      return res.status(200).json(feature)
    } catch {
      return res.status(500).json({ error: "Erro ao atualizar feature" })
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.feature.delete({ where: { id: id as string } })
      return res.status(204).end()
    } catch {
      return res.status(500).json({ error: "Erro ao deletar feature" })
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
