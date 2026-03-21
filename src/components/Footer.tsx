'use client'

import { Zap, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  Serviços: [
    'Branding Estratégico',
    'Desenvolvimento Web',
    'SEO & Performance',
    'Tráfego Pago',
    'Social Media',
    'Analytics & BI',
  ],
  Empresa: [
    'Sobre Nós',
    'Cases de Sucesso',
    'Blog',
    'Carreiras',
    'Parceiros',
  ],
  Contato: [
    'contato@aura.digital',
    '+55 11 9 9999-8888',
    'São Paulo, SP — Brasil',
  ],
}

const contactIcons: Record<string, React.ReactNode> = {
  'contato@aura.digital': <Mail size={13} className="text-gold shrink-0 mt-0.5" />,
  '+55 11 9 9999-8888': <Phone size={13} className="text-gold shrink-0 mt-0.5" />,
  'São Paulo, SP — Brasil': <MapPin size={13} className="text-gold shrink-0 mt-0.5" />,
}

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: '#0A1128' }} className="border-t border-white/5">
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">
            Pronto para crescer?
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Vamos construir sua{' '}
            <span className="text-gold-gradient">Autoridade Digital</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Fale com um especialista e descubra como podemos transformar sua presença digital.
          </p>
          <a
            href="mailto:contato@aura.digital"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-base font-bold"
          >
            <Mail size={18} />
            Falar com Especialista
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold">
                  <Zap size={16} className="text-background-dark" fill="currentColor" />
                </div>
                <span className="text-white font-bold text-xl tracking-tight">
                  AURÁ<span className="text-gold">.</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Agência digital premium especializada em transformar marcas em referências de mercado.
              </p>
              <div className="flex gap-3">
                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-gold hover:border-gold/40 transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold text-sm mb-5">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      {contactIcons[link] ? (
                        <span className="flex items-start gap-2 text-slate-500 text-sm">
                          {contactIcons[link]}
                          {link}
                        </span>
                      ) : (
                        <a
                          href="#"
                          className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200"
                        >
                          {link}
                        </a>
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
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © 2026 AURÁ Digital. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {['Privacidade', 'Termos de Uso', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
