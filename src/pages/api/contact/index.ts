import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { prisma } from '../../../lib/prisma';

// Sanitize: strip HTML tags, control chars, and trim
function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .trim()
    .slice(0, maxLen)
}

// Basic email format validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

// ─── Confirmation email for the lead ─────────────────

function buildConfirmationEmail(name: string, service: string) {
  const firstName = name.split(' ')[0]
  const subject = `Recebemos sua solicitação — ${service || 'EM Soluções Digitais'}`

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1a0a00 0%,#0d0d0d 100%);padding:36px 40px;text-align:center;border-bottom:1px solid rgba(241,90,36,0.3);">
            <div style="display:inline-block;background:rgba(241,90,36,0.15);border:1px solid rgba(241,90,36,0.3);border-radius:8px;padding:6px 16px;margin-bottom:16px;">
              <span style="color:#f15a24;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">EM Soluções Digitais</span>
            </div>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">Solicitação Recebida! 🚀</h1>
          </td>
        </tr>
        <tr>
          <td style="background:#111111;padding:40px;">
            <p style="margin:0 0 16px;color:#a1a1aa;font-size:15px;line-height:1.6;">Olá, <strong style="color:#ffffff;">${firstName}</strong>!</p>
            <p style="color:#d4d4d8;font-size:15px;line-height:1.8;margin:0 0 16px;">
              Recebemos sua solicitação com sucesso. Nossa equipe especialista já foi notificada e entrará em contato com você em breve.
            </p>
            <div style="background:rgba(241,90,36,0.08);border:1px solid rgba(241,90,36,0.2);border-radius:10px;padding:20px 24px;margin:24px 0;">
              <p style="margin:0 0 8px;color:#f15a24;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Serviço solicitado</p>
              <p style="margin:0;color:#ffffff;font-size:16px;font-weight:600;">${service || 'Contato Geral'}</p>
            </div>
            <p style="color:#d4d4d8;font-size:15px;line-height:1.8;margin:0;">
              Enquanto isso, fique à vontade para explorar nossos cases de sucesso e ver como transformamos negócios digitalmente.
            </p>
            <div style="margin-top:32px;text-align:center;">
              <a href="https://emsolucoesdigitais.com.br/casos" style="display:inline-block;background:linear-gradient(135deg,#f15a24,#e8480e);color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:8px;">Ver Nossos Cases</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0d;padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
            <p style="margin:0 0 8px;color:#52525b;font-size:12px;">© ${new Date().getFullYear()} EM Soluções Digitais — Todos os direitos reservados</p>
            <p style="margin:0;color:#3f3f46;font-size:11px;">Este e-mail foi enviado porque você preencheu nosso formulário de contato.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { subject, html }
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

    // 1. Save lead to database
    try {
      await prisma.lead.create({
        data: { name, email, whatsapp, location, service, message, source: 'form', status: 'new' },
      })
    } catch (dbErr) {
      console.error('Erro ao salvar lead no banco:', dbErr)
      // Non-fatal: continue with email sending
    }

    // 2. Notify admin
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

    // 3. Send confirmation to the lead
    try {
      const { subject, html } = buildConfirmationEmail(name, service)
      await transporter.sendMail({
        from: `"EM Soluções Digitais" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html,
      })
    } catch (confirmErr) {
      console.error('Erro ao enviar e-mail de confirmação:', confirmErr)
      // Non-fatal
    }

    return res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ message: 'Erro interno ao tentar enviar e-mail' });
  }
}
