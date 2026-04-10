'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Lock } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const defaultNavLinks = [
  { href: '#services', label: 'Serviços' },
  { href: '#testimonials', label: 'Depoimentos' },
  { href: '#contact', label: 'Contato' },
  { href: '/casos', label: 'Cases' },
]

export interface NavbarProps {
  links?: { href: string; label: string }[];
  ctaText?: string;
}

export default function Navbar({ 
  links = defaultNavLinks, 
  ctaText = 'Iniciar Projeto' 
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-panel rounded-none border-x-0 border-t-0' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand Logo Link */}
          <a 
            href="/" 
            className="flex items-center gap-2 group transition-all duration-300"
          >
            <img 
              src="/logo-brand.png" 
              alt="EM Soluções Digitais" 
              className="h-10 md:h-12 w-auto drop-shadow-md transition-transform group-hover:scale-105"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground-muted hover:text-foreground text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Actions: Theme Toggle + Admin + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <motion.a
              href="/admin"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted hover:text-foreground px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/5 hover:border-black/20 dark:hover:border-white/10 transition-all"
            >
              <Lock size={12} />
              Admin
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-orange px-6 py-2.5 text-sm font-bold"
            >
              {ctaText}
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground-muted hover:text-foreground p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 glass-panel p-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground-muted hover:text-foreground font-medium text-lg py-2 border-b border-black/5 dark:border-white/5 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <motion.a
                href="/admin"
                whileTap={{ scale: 0.97 }}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 text-sm font-medium text-foreground-muted hover:text-foreground px-6 py-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
              >
                <Lock size={14} />
                Área Administrativa
              </motion.a>
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.97 }}
                onClick={() => setMobileOpen(false)}
                className="btn-orange px-6 py-3 text-sm font-bold text-center"
              >
                {ctaText}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

