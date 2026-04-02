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
  });

  const services = [
    'Websites de Alta Performance',
    'Design Gráfico & Posicionamento',
    'Automatização de Atendimento com IA (WhatsApp)',
    'Tráfego Pago (Google Ads & Redes Sociais)',
    'Landing Pages de Alta Conversão',
    'Gestão de Redes Sociais Premium',
  ];

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
        setFormData({ name: '', email: '', whatsapp: '', location: '', service: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          <h3 className="text-3xl font-bold text-white mb-3">Mensagem Enviada!</h3>
          <p className="text-slate-400">
            Agradecemos o contato. Nossa equipe especialista entrará em contato com você em breve.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-8 text-orange hover:text-white transition-colors underline underline-offset-4 text-sm font-semibold"
          >
            Enviar outra mensagem
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400">Nome Completo</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-background-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                placeholder="Ex: João da Silva"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-background-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                placeholder="Ex: joao@empresa.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-widest text-slate-400">WhatsApp</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                className="bg-background-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                placeholder="Ex: (11) 99999-9999"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-xs font-bold uppercase tracking-widest text-slate-400">Localidade</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="bg-background-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                placeholder="Ex: São Paulo, SP"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-slate-400">Qual serviço você deseja?</label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="bg-background-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all appearance-none"
            >
              <option value="" disabled>Selecione uma opção...</option>
              {services.map((srv) => (
                <option key={srv} value={srv}>{srv}</option>
              ))}
            </select>
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
