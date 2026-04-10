'use client'

import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import ContactForm from './ContactForm'

interface FooterLink {
  text: string;
  href?: string;
  icon?: React.ReactNode;
}

const footerLinks: Record<string, FooterLink[]> = {
  Serviços: [
    { text: 'Websites de Alta Performance', href: '#services' },
    { text: 'Design Gráfico & Posicionamento', href: '#services' },
    { text: 'Automatização de Atendimento com IA (WhatsApp)', href: '#services' },
    { text: 'Tráfego Pago (Google Ads & Redes Sociais)', href: '#services' },
    { text: 'Landing Pages de Alta Conversão', href: '#services' },
    { text: 'Gestão de Redes Sociais Premium', href: '#services' },
  ],
  Empresa: [
    { text: 'Sobre Nós', href: '#' },
    { text: 'Serviços', href: '#services' },
    { text: 'Depoimentos', href: '#testimonials' },
    { text: 'Contato', href: '#contact' },
    { text: 'Cases de Sucesso', href: '/casos' },
  ],
  Contato: [
    { text: 'contato@emsolucoesdigitais.com.br', href: 'mailto:contato@emsolucoesdigitais.com.br', icon: <Mail size={13} className="text-orange shrink-0 mt-0.5" /> },
    { text: '(61) 99566-4986', href: 'https://wa.me/5561995664986', icon: <Phone size={13} className="text-orange shrink-0 mt-0.5" /> },
    { text: 'Brasília, DF — Brasil', icon: <MapPin size={13} className="text-orange shrink-0 mt-0.5" /> },
  ],
}

export interface FooterProps {
  ctaPrefix?: string;
  ctaHighlight?: string;
  ctaSubtitle?: string;
  copyrightText?: string;
}

export default function Footer({
  ctaPrefix = 'Vamos construir sua ',
  ctaHighlight = 'Autoridade Digital',
  ctaSubtitle = 'Fale com um especialista e descubra como podemos transformar sua presença digital.',
  copyrightText = '© 2026 EM Soluções Digitais. Todos os direitos reservados.'
}: FooterProps) {
  return (
    <footer id="contact" className="bg-surface border-t border-border-subtle">
      {/* CTA Banner / Contact Form Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(241,90,36,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange mb-4">
                Pronto para crescer?
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                {ctaPrefix}
                <span className="text-orange-gradient">{ctaHighlight}</span>
              </h2>
              <p className="text-foreground-muted mb-8 max-w-lg">
                {ctaSubtitle}
              </p>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <img 
                  src="/logo-brand.png" 
                  alt="EM Soluções Digitais" 
                  className="h-14 md:h-16 w-auto drop-shadow-lg"
                />
              </div>
              <p className="text-foreground-subtle text-sm leading-relaxed mb-6">
                EM Soluções Digitais. Agência especializada em transformar marcas em referências de mercado.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/em_solucoesdigitais"
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground-subtle hover:text-orange hover:border-orange/40 transition-all duration-200"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/emsolucoesdigitais/"
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground-subtle hover:text-orange hover:border-orange/40 transition-all duration-200"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="mailto:contato@emsolucoesdigitais.com.br"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground-subtle hover:text-orange hover:border-orange/40 transition-all duration-200"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-foreground font-semibold text-sm mb-5">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, idx) => (
                    <li key={idx}>
                      {link.href ? (
                        <a 
                          href={link.href} 
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-start gap-2 text-foreground-subtle hover:text-foreground-muted text-sm transition-colors duration-200"
                        >
                          {link.icon}
                          {link.text}
                        </a>
                      ) : (
                        <span className="flex items-start gap-2 text-foreground-subtle text-sm">
                          {link.icon}
                          {link.text}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-foreground-subtle text-xs">
            {copyrightText}
          </p>
          <div className="flex gap-6">
            {/* Links removidos conforme solicitado */}
          </div>
        </div>
      </div>
    </footer>
  )
}
