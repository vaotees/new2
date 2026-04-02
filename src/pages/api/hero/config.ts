import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      let config = await prisma.sectionHeroConfig.findUnique({
        where: { id: "singleton" }
      })

      if (!config) {
        config = await prisma.sectionHeroConfig.create({
          data: { id: "singleton" }
        })
      }

      return res.status(200).json(config)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao buscar config" })
    }
  }

  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ error: "Unauthorized" })

    try {
      const {
        badge, titlePrefix, rotatingWords, description,
        ctaPrimaryText, ctaPrimaryUrl, ctaSecondaryText, ctaSecondaryUrl,
        socialClients, socialRating, socialRevenue
      } = req.body

      const config = await prisma.sectionHeroConfig.upsert({
        where: { id: "singleton" },
        update: {
          badge, titlePrefix, rotatingWords, description,
          ctaPrimaryText, ctaPrimaryUrl, ctaSecondaryText, ctaSecondaryUrl,
          socialClients, socialRating, socialRevenue
        },
        create: {
          id: "singleton",
          badge, titlePrefix, rotatingWords, description,
          ctaPrimaryText, ctaPrimaryUrl, ctaSecondaryText, ctaSecondaryUrl,
          socialClients, socialRating, socialRevenue
        }
      })
      return res.status(200).json(config)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao atualizar config" })
    }
  }

  res.setHeader("Allow", ["GET", "PUT"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
