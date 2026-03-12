import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Culture } from '@/data/cultures';
import type { SiteCopy } from '@/data/siteContent';

interface CultureCardProps {
  copy: SiteCopy['cultureCard'];
  culture: Culture;
  index: number;
  isActive?: boolean;
  onClick: () => void;
}

export function CultureCard({
  copy,
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
        'culture-card w-full rounded-[24px] border p-4 text-left transition-all duration-300',
        isActive && 'culture-card-active',
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
              <p className="culture-card-meta mt-1 text-xs tracking-[0.12em]">
                {culture.altName}
              </p>
            </div>
            <span className={cn('culture-card-tag', isActive && 'culture-card-tag-active')}>
              {isActive ? copy.active : copy.inactive}
            </span>
          </div>

          <div className="culture-card-meta mt-3 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {culture.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {culture.location.region}
            </span>
          </div>

          <p className="culture-card-description mt-3 line-clamp-3 text-sm leading-7">
            {culture.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
