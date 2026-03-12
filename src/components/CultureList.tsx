import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { type Culture } from '@/data/cultures';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CultureCard } from './CultureCard';

interface CultureListProps {
  cultures: Culture[];
  selectedCulture: Culture | null;
  onCultureSelect: (culture: Culture) => void;
  eraName: string;
}

export function CultureList({
  cultures,
  selectedCulture,
  onCultureSelect,
  eraName,
}: CultureListProps) {
  const regions = Array.from(new Set(cultures.map((culture) => culture.location.region)));

  return (
    <div className="atlas-panel flex min-h-[360px] flex-col overflow-hidden">
      <div className="border-b border-white/10 bg-white/[0.04] px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
              <MapPin className="h-5 w-5 text-amber-300" />
              {eraName}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              当前共 {cultures.length} 个文化节点，覆盖 {regions.join('、')}
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-3">
          {cultures.map((culture, index) => (
            <CultureCard
              key={culture.id}
              culture={culture}
              index={index}
              isActive={selectedCulture?.id === culture.id}
              onClick={() => onCultureSelect(culture)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="px-2 pb-2 pt-5 text-center text-xs tracking-[0.16em] text-slate-500"
        >
          CLICK A NODE TO OPEN THE CULTURE PANEL
        </motion.p>
      </ScrollArea>
    </div>
  );
}
