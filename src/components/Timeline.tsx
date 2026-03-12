import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { type Era, type Locale } from '@/data/cultures';
import type { SiteCopy } from '@/data/siteContent';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimelineProps {
  copy: SiteCopy['timeline'];
  eras: Era[];
  locale: Locale;
  currentEraIndex: number;
  onEraChange: (index: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const formatYear = (year: number, locale: Locale) => {
  if (locale === 'zh') {
    return year < 0 ? `公元前${Math.abs(year)}年` : `公元${year}年`;
  }

  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
};

export function Timeline({
  copy,
  eras,
  locale,
  currentEraIndex,
  onEraChange,
  isPlaying,
  onPlayPause,
}: TimelineProps) {
  const goToPrevious = () => {
    if (currentEraIndex > 0) {
      onEraChange(currentEraIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentEraIndex < eras.length - 1) {
      onEraChange(currentEraIndex + 1);
    }
  };

  return (
    <section
      className="chapter-rail sticky z-30 rounded-[28px] p-4 sm:p-5"
      style={{ top: 'calc(var(--sticky-header-height, 108px) + 12px)' }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl site-heading">{copy.title}</h2>
          <p className="mt-2 text-sm leading-7 site-muted">{copy.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPlayPause}
            aria-label={isPlaying ? copy.pause : copy.play}
            className="secondary-button h-10 w-10 rounded-full"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={currentEraIndex === 0}
            aria-label={copy.previous}
            className="secondary-button h-10 w-10 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={currentEraIndex === eras.length - 1}
            aria-label={copy.next}
            className="secondary-button h-10 w-10 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-3">
          {eras.map((era, index) => (
            <motion.button
              key={era.id}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onEraChange(index)}
              className={cn(
                'chapter-card w-[250px] shrink-0 rounded-[24px] border p-4 text-left transition-all duration-300',
                index === currentEraIndex && 'chapter-card-active',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="chapter-index">{index + 1}</span>
                <span className="chapter-meta">{formatYear(era.startYear, locale)}</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold">{era.name}</h3>
              <p className="mt-1 text-xs tracking-[0.14em] chapter-meta">{era.altName}</p>
              <p className="chapter-headline mt-2 text-sm leading-6">{era.headline}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
