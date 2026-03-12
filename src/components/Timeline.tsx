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
  isCompact: boolean;
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
  isCompact,
  currentEraIndex,
  onEraChange,
  isPlaying,
  onPlayPause,
}: TimelineProps) {
  const currentEra = eras[currentEraIndex];

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
      className={cn(
        'chapter-rail sticky z-30 rounded-[28px] p-4 sm:p-5',
        isCompact && 'chapter-rail-compact',
      )}
      style={{ top: 'calc(var(--sticky-header-height, 108px) + 12px)' }}
    >
      <div
        className={cn(
          'chapter-rail-head flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between',
          isCompact && 'chapter-rail-head-compact',
        )}
      >
        <div className="chapter-rail-copy min-w-0">
          <p
            className={cn(
              'section-eyebrow chapter-rail-eyebrow',
              isCompact && 'chapter-rail-eyebrow-hidden',
            )}
          >
            {copy.eyebrow}
          </p>
          <div className="chapter-rail-title-row">
            <h2
              className={cn(
                'chapter-rail-title mt-2 font-display text-3xl site-heading',
                isCompact && 'chapter-rail-title-compact',
              )}
            >
              {copy.title}
            </h2>
            {isCompact ? (
              <span className="chapter-current-pill" title={currentEra?.altName}>
                {currentEra?.name}
              </span>
            ) : null}
          </div>
          <p
            className={cn(
              'chapter-rail-description mt-2 text-sm leading-7 site-muted',
              isCompact && 'chapter-rail-description-hidden',
            )}
          >
            {copy.description}
          </p>
        </div>

        <div
          className={cn(
            'chapter-rail-controls flex flex-wrap items-center gap-2',
            isCompact && 'chapter-rail-controls-compact',
          )}
        >
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

      <div className={cn('mt-5 overflow-x-auto pb-1', isCompact && 'mt-3')}>
        <div className={cn('chapter-track flex min-w-max gap-3', isCompact && 'chapter-track-compact')}>
          {eras.map((era, index) => (
            <motion.button
              key={era.id}
              type="button"
              whileHover={{ y: isCompact ? -1 : -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onEraChange(index)}
              className={cn(
                'chapter-card w-[250px] shrink-0 rounded-[24px] border p-4 text-left transition-all duration-300',
                isCompact && 'chapter-card-compact',
                index === currentEraIndex && 'chapter-card-active',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="chapter-index">{index + 1}</span>
                <span className="chapter-meta">{formatYear(era.startYear, locale)}</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold">{era.name}</h3>
              {!isCompact ? (
                <>
                  <p className="mt-1 text-xs tracking-[0.14em] chapter-meta">
                    {era.altName}
                  </p>
                  <p className="chapter-headline mt-2 text-sm leading-6">
                    {era.headline}
                  </p>
                </>
              ) : null}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
