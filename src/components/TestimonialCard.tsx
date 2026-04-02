import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Star } from 'lucide-react';

export interface TestimonialCardProps extends HTMLMotionProps<"div"> {
  quote: string;
  name: string;
  role: string;
  stars?: number;
  color?: string;
  initials?: string;
  avatarUrl?: string | null;
}

export function TestimonialCard({
  quote,
  name,
  role,
  stars = 5,
  color = '#4F46E5',
  initials,
  avatarUrl,
  ...props
}: TestimonialCardProps) {
  // Compute initials if not provided
  const computedInitials = initials || name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-panel p-8 flex flex-col gap-6"
      {...props}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: Math.min(Math.max(1, stars), 5) }).map((_, i) => (
          <Star key={i} size={14} className="text-orange fill-orange" />
        ))}
      </div>

      {/* Quote mark */}
      <div
        className="text-7xl font-black leading-none -mt-2 -mb-4 select-none"
        style={{ color: '#F97316', opacity: 0.6 }}
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p className="text-slate-300 text-sm leading-relaxed font-medium flex-1">
        {quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden"
          style={{ background: `${color}33`, border: `1.5px solid ${color}55` }}
        >
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerText = computedInitials;
              }}
            />
          ) : (
            computedInitials
          )}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-slate-500 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;
