import { motion } from 'framer-motion';
import { Layers3 } from 'lucide-react';
import { type Culture, type Locale } from '@/data/cultures';
import type { SiteCopy } from '@/data/siteContent';
import { Button } from '@/components/ui/button';
import { CultureCard } from './CultureCard';

interface CultureListProps {
  copy: SiteCopy['cultureList'];
  locale: Locale;
  cardCopy: SiteCopy['cultureCard'];
  cultures: Culture[];
  selectedCulture: Culture | null;
  eraName: string;
  onCultureSelect: (culture: Culture) => void;
  onOpenFocusedCulture: () => void;
}

export function CultureList({
  copy,
  locale,
  cardCopy,
  cultures,
  selectedCulture,
  eraName,
  onCultureSelect,
  onOpenFocusedCulture,
}: CultureListProps) {
  const title =
    locale === 'zh' ? `${eraName}${copy.titleSuffix}` : `${eraName}${copy.titleSuffix}`;
  const totalLabel =
    locale === 'zh'
      ? `${copy.totalPrefix} ${cultures.length} ${copy.totalUnit}`
      : `${cultures.length} ${copy.totalUnit}`;

  return (
    <div className="paper-card p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl site-heading">{title}</h2>
          <p className="mt-2 text-sm leading-7 site-muted">{copy.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="legend-pill">
            <Layers3 className="h-4 w-4" />
            {totalLabel}
          </span>
          <Button
            variant="outline"
            onClick={onOpenFocusedCulture}
            className="secondary-button rounded-full px-4"
          >
            {copy.openFocused}
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
            copy={cardCopy}
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
