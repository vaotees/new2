import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import fs from "fs"
import path from "path"

// Permite body até 10MB para base64 de imagens
export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ error: "Unauthorized" })

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const { base64, filename } = req.body as { base64: string; filename: string }

    if (!base64 || !filename) {
      return res.status(400).json({ error: "Campos base64 e filename são obrigatórios." })
    }

    // Extrai extensão e gera nome único
    const rawExt = path.extname(filename).toLowerCase()
    const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]
    const ext = allowedExts.includes(rawExt) ? rawExt : ".png"
    const safeName = `mockup-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`

    // Remove prefixo de data URL se presente (ex: "data:image/png;base64,...")
    const base64Data = base64.includes(",") ? base64.split(",")[1] : base64

    // Salva em public/uploads/
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const buffer = Buffer.from(base64Data, "base64")
    fs.writeFileSync(path.join(uploadsDir, safeName), buffer)

    return res.status(200).json({ url: `/uploads/${safeName}` })
  } catch (error) {
    console.error("Upload error:", error)
    return res.status(500).json({ error: "Erro ao fazer upload da imagem." })
  }
}
