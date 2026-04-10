import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Sanitize: strip HTML tags, control chars, and trim
function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<[^>]*>/g, '')                         // strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')  // strip control chars
    .trim()
    .slice(0, maxLen)
}

// Basic email format validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  const name     = sanitize(req.body?.name, 200)
  const email    = sanitize(req.body?.email, 200)
  const whatsapp = sanitize(req.body?.whatsapp, 20)
  const location = sanitize(req.body?.location, 200)
  const service  = sanitize(req.body?.service, 200)
  const message  = sanitize(req.body?.message, 2000)

  if (!name || !email || !whatsapp || !location || !service) {
    return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Endereço de e-mail inválido' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Site EM Soluções" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: 'estevao.marques@gmail.com',
      subject: `Nova Solicitação: ${service}`,
      text: [
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `WhatsApp: ${whatsapp}`,
        `Localidade: ${location}`,
        `Serviço: ${service}`,
        `Mensagem: ${message || 'Não informada'}`,
        '',
        '---',
        'Enviado pela Landing Page EM Soluções Digitais',
      ].join('\n'),
    });

    return res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ message: 'Erro interno ao tentar enviar e-mail' });
  }
}
