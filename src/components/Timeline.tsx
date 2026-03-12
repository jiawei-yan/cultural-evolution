import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { type Era } from '@/data/cultures';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimelineProps {
  eras: Era[];
  currentEraIndex: number;
  onEraChange: (index: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const formatYear = (year: number) => {
  if (year < 0) {
    return `公元前${Math.abs(year)}年`;
  }
  return `公元${year}年`;
};

export function Timeline({
  eras,
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
    <section className="chapter-rail sticky top-[72px] z-30 rounded-[28px] border border-stone-200/90 bg-[rgba(255,250,242,0.92)] p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="section-eyebrow">HISTORICAL CHAPTERS</p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">
            六个历史篇章
          </h2>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            这是页面最重要的入口。先在这里选时代，再去下面看地图、焦点文明和详细资料。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPlayPause}
            className="h-10 w-10 rounded-full border-stone-300 bg-white text-slate-700 hover:bg-stone-100"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={currentEraIndex === 0}
            className="h-10 w-10 rounded-full border-stone-300 bg-white text-slate-700 hover:bg-stone-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={currentEraIndex === eras.length - 1}
            className="h-10 w-10 rounded-full border-stone-300 bg-white text-slate-700 hover:bg-stone-100"
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
                index === currentEraIndex
                  ? 'border-slate-900 bg-slate-900 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]'
                  : 'border-stone-200 bg-white text-slate-900 hover:border-stone-300 hover:bg-stone-50',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    'inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs',
                    index === currentEraIndex
                      ? 'bg-white/15 text-white'
                      : 'bg-stone-100 text-stone-600',
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    'text-xs tracking-[0.14em]',
                    index === currentEraIndex ? 'text-white/70' : 'text-stone-500',
                  )}
                >
                  {formatYear(era.startYear)}
                </span>
              </div>

              <h3 className="mt-4 text-lg">{era.name}</h3>
              <p
                className={cn(
                  'mt-2 text-sm leading-6',
                  index === currentEraIndex ? 'text-white/80' : 'text-stone-600',
                )}
              >
                {era.headline}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
