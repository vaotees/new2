import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  const { name, email, whatsapp, location, service, message } = req.body;

  if (!name || !email || !whatsapp || !location || !service) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
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

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: 'estevao.marques@gmail.com',
      subject: `Nova Solicitação de Serviço: ${service}`,
      text: `Nome: ${name}
E-mail: ${email}
WhatsApp: ${whatsapp}
Localidade: ${location}
Serviço Desejado: ${service}
Mensagem: ${message || 'Não informada'}

--- 
Enviado pela Landing Page EM Soluções Digitais`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ message: 'Erro interno ao tentar enviar e-mail' });
  }
}
