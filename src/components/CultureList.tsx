import { motion } from 'framer-motion';
import { Layers3 } from 'lucide-react';
import { type Culture } from '@/data/cultures';
import { Button } from '@/components/ui/button';
import { CultureCard } from './CultureCard';

interface CultureListProps {
  cultures: Culture[];
  selectedCulture: Culture | null;
  eraName: string;
  onCultureSelect: (culture: Culture) => void;
  onOpenFocusedCulture: () => void;
}

export function CultureList({
  cultures,
  selectedCulture,
  eraName,
  onCultureSelect,
  onOpenFocusedCulture,
}: CultureListProps) {
  return (
    <div className="paper-card p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-eyebrow">CULTURE NODES</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">
            {eraName}的文化节点
          </h2>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            这里保留本篇章最重要的节点卡片。点击卡片切换焦点，确认当前重点后再展开详细资料。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-600">
            <Layers3 className="h-4 w-4" />
            共 {cultures.length} 个节点
          </span>
          <Button
            variant="outline"
            onClick={onOpenFocusedCulture}
            className="rounded-full border-stone-300 bg-white text-slate-700 hover:bg-stone-100"
          >
            查看当前焦点详情
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {cultures.map((culture, index) => (
          <CultureCard
            key={culture.id}
            culture={culture}
            index={index}
            isActive={selectedCulture?.id === culture.id}
            onClick={() => onCultureSelect(culture)}
          />
        ))}
      </motion.div>
    </div>
  );
}
