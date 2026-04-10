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

    // Since Vercel uses a read-only filesystem, we will store the base64 string directly
    // in the Neon PostgreSQL database which has @db.Text holding up to 1GB per field.
    // So we just echo back the base64 string directly as the 'url'.

    // Garantir que a string base64 esteja no formato Data URL, caso não esteja
    let finalBase64 = base64
    if (!finalBase64.startsWith("data:")) {
      const ext = path.extname(filename).toLowerCase().replace(".", "") || "png"
      finalBase64 = `data:image/${ext};base64,${base64}`
    }

    return res.status(200).json({ url: finalBase64 })
  } catch (error) {
    console.error("Upload error:", error)
    return res.status(500).json({ error: "Erro ao processar a imagem." })
  }
}
