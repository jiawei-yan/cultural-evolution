import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Culture } from '@/data/cultures';

interface CultureCardProps {
  culture: Culture;
  index: number;
  isActive?: boolean;
  onClick: () => void;
}

export function CultureCard({
  culture,
  index,
  isActive = false,
  onClick,
}: CultureCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        'w-full rounded-[24px] border p-4 text-left transition-all duration-300',
        isActive
          ? 'border-slate-900 bg-slate-900 text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]'
          : 'border-stone-200 bg-white text-slate-900 hover:border-stone-300 hover:bg-stone-50',
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className="mt-1 h-11 w-11 shrink-0 rounded-2xl border border-black/5"
          style={{ backgroundColor: culture.color }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold">{culture.name}</h3>
              <p
                className={cn(
                  'mt-1 text-xs tracking-[0.12em]',
                  isActive ? 'text-white/65' : 'text-stone-500',
                )}
              >
                {culture.nameEn}
              </p>
            </div>
            <span
              className={cn(
                'rounded-full px-2 py-1 text-xs',
                isActive ? 'bg-white/10 text-white/80' : 'bg-stone-100 text-stone-600',
              )}
            >
              {isActive ? '当前焦点' : '点击聚焦'}
            </span>
          </div>

          <div
            className={cn(
              'mt-3 flex flex-wrap gap-2 text-xs',
              isActive ? 'text-white/70' : 'text-stone-500',
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {culture.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {culture.location.region}
            </span>
          </div>

          <p
            className={cn(
              'mt-3 line-clamp-3 text-sm leading-7',
              isActive ? 'text-white/82' : 'text-slate-600',
            )}
          >
            {culture.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
