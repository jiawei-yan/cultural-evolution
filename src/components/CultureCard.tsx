import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Culture } from '@/data/cultures';

interface CultureCardProps {
  culture: Culture;
  onClick: () => void;
  index: number;
  isActive?: boolean;
}

export function CultureCard({
  culture,
  onClick,
  index,
  isActive = false,
}: CultureCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        'group w-full rounded-[26px] border p-4 text-left transition-all duration-300',
        'bg-white/[0.04] backdrop-blur-sm',
        isActive
          ? 'border-amber-300/50 bg-amber-300/10 shadow-[0_24px_60px_rgba(251,191,36,0.12)]'
          : 'border-white/10 hover:border-white/20 hover:bg-white/[0.07]',
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${culture.color}, rgba(255,255,255,0.08))`,
          }}
        >
          <div
            className="h-4 w-4 rounded-full border border-white/60"
            style={{ backgroundColor: culture.color }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-white transition-colors group-hover:text-amber-100">
                {culture.name}
              </h3>
              <p className="mt-1 truncate text-xs tracking-[0.12em] text-slate-500">
                {culture.nameEn}
              </p>
            </div>
            <ArrowUpRight
              className={cn(
                'mt-1 h-4 w-4 shrink-0 text-slate-500 transition-all duration-300',
                isActive ? 'text-amber-200' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white',
              )}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/40 px-2.5 py-1">
              <Calendar className="h-3 w-3" />
              {culture.period}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/40 px-2.5 py-1">
              <MapPin className="h-3 w-3" />
              {culture.location.region}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">
            {culture.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {culture.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-slate-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
