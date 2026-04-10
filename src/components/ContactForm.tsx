import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    location: '',
    service: '',
    message: '',
  });

  const services = [
    'Websites de Alta Performance',
    'Design Gráfico & Posicionamento',
    'Automatização de Atendimento com IA (WhatsApp)',
    'Tráfego Pago (Google Ads & Redes Sociais)',
    'Landing Pages de Alta Conversão',
    'Gestão de Redes Sociais Premium',
  ];

  const locations = [
    'Acre, AC', 'Alagoas, AL', 'Amapá, AP', 'Amazonas, AM', 'Bahia, BA', 'Ceará, CE', 'Distrito Federal, DF', 
    'Espírito Santo, ES', 'Goiás, GO', 'Maranhão, MA', 'Mato Grosso, MT', 'Mato Grosso do Sul, MS', 
    'Minas Gerais, MG', 'Pará, PA', 'Paraíba, PB', 'Paraná, PR', 'Pernambuco, PE', 'Piauí, PI', 
    'Rio de Janeiro, RJ', 'Rio Grande do Norte, RN', 'Rio Grande do Sul, RS', 'Rondônia, RO', 
    'Roraima, RR', 'Santa Catarina, SC', 'São Paulo, SP', 'Sergipe, SE', 'Tocantins, TO',
    'São Paulo (Capital)', 'Rio de Janeiro (Capital)', 'Belo Horizonte, MG', 'Curitiba, PR', 'Porto Alegre, RS'
  ];

  const formatWhatsApp = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return value;
    let formatted = '';
    if (match[1]) formatted += `(${match[1]}`;
    if (match[1].length === 2) formatted += ') ';
    if (match[2]) formatted += match[2];
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', whatsapp: '', location: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'whatsapp') {
      setFormData((prev) => ({ ...prev, [name]: formatWhatsApp(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="glass-panel p-8 md:p-12 text-left w-full mx-auto shadow-2xl relative overflow-hidden">
      {status === 'success' ? (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center"
        >
          <CheckCircle2 size={64} className="text-orange mb-6" />
          <h3 className="text-3xl font-bold text-foreground mb-3">Mensagem Enviada!</h3>
          <p className="text-foreground-muted">
            Agradecemos o contato. Nossa equipe especialista entrará em contato com você em breve.
          </p>
          <button
              onClick={() => setStatus('idle')}
              className="mt-8 text-orange hover:text-foreground transition-colors underline underline-offset-4 text-sm font-semibold"
          >
            Enviar outra mensagem
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Nome Completo</label>
              <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                  style={{ backgroundColor: 'var(--color-input-bg)' }}
                  placeholder="Ex: João da Silva"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-foreground-muted">E-mail</label>
              <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                  style={{ backgroundColor: 'var(--color-input-bg)' }}
                  placeholder="Ex: joao@empresa.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-widest text-foreground-muted">WhatsApp</label>
              <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                  style={{ backgroundColor: 'var(--color-input-bg)' }}
                  placeholder="Ex: (11) 99999-9999"
                  maxLength={15}
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="location" className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Localidade</label>
              <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  list="location-list"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                  style={{ backgroundColor: 'var(--color-input-bg)' }}
                  placeholder="Ex: São Paulo, SP"
                  autoComplete="off"
              />
              <datalist id="location-list">
                {locations.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Qual serviço você deseja?</label>
            <div className="relative group">
              <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all appearance-none cursor-pointer pr-10"
                  style={{
                    backgroundColor: 'var(--color-input-bg)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f97316' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 15 5 5 5-5'/%3E%3Cpath d='m7 9 5-5 5 5'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                  }}
              >
                <option value="" disabled style={{ backgroundColor: 'var(--color-input-bg)' }}>Selecione uma opção...</option>
                {services.map((srv) => (
                    <option key={srv} value={srv} style={{ backgroundColor: 'var(--color-input-bg)' }} className="py-4">
                      {srv}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Mensagem ou detalhes do projeto (Opcional)</label>
            <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all resize-none"
                style={{ backgroundColor: 'var(--color-input-bg)' }}
                placeholder="Conte-nos um pouco sobre sua necessidade..."
            />
          </div>

          {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium">
                Ocorreu um erro ao enviar sua mensagem. Tente novamente ou nos chame no WhatsApp.
              </div>
          )}

          <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading'}
              type="submit"
              className="mt-4 btn-orange w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
                <div className="w-6 h-6 rounded-full border-2 border-background-dark border-t-transparent animate-spin" />
            ) : (
                <>
                  Enviar Solicitação <Send size={18} />
                </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
}

