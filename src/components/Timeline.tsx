import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { type Era } from '@/data/cultures';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
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
  const currentEra = eras[currentEraIndex];
  const progress = (currentEraIndex / (eras.length - 1)) * 100;

  const handleSliderChange = (value: number[]) => {
    const index = Math.round((value[0] / 100) * (eras.length - 1));
    onEraChange(index);
  };

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
    <div className="atlas-panel p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <motion.div
          key={currentEra.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p className="atlas-kicker">TIMELINE</p>
          <h2 className="section-title mt-3">{currentEra.name}</h2>
          <p className="mt-2 text-sm text-amber-200/90">
            {formatYear(currentEra.startYear)} - {formatYear(currentEra.endYear)}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {currentEra.description}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="atlas-chip">
            第 {currentEraIndex + 1} / {eras.length} 幕
          </span>
          <span className="atlas-chip atlas-chip-muted">
            {isPlaying ? '自动巡航中' : '拖动或点击切换'}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onPlayPause}
          className="h-11 w-11 rounded-full border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          disabled={currentEraIndex === 0}
          className="h-11 w-11 rounded-full border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 px-1">
          <Slider
            value={[progress]}
            onValueChange={handleSliderChange}
            max={100}
            step={100 / (eras.length - 1)}
            className="w-full"
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          disabled={currentEraIndex === eras.length - 1}
          className="h-11 w-11 rounded-full border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        {eras.map((era, index) => (
          <button
            key={era.id}
            type="button"
            onClick={() => onEraChange(index)}
            className={cn(
              'rounded-[24px] border p-4 text-left transition-all duration-300',
              index === currentEraIndex
                ? 'border-amber-300/50 bg-amber-300/10 shadow-[0_24px_60px_rgba(251,191,36,0.10)]'
                : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.08]',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={cn(
                  'inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs',
                  index === currentEraIndex
                    ? 'bg-amber-300 text-slate-950'
                    : 'bg-slate-900/70 text-slate-300',
                )}
              >
                {index + 1}
              </span>
              <span className="text-xs tracking-[0.14em] text-slate-500">
                {formatYear(era.startYear)}
              </span>
            </div>

            <p className="mt-4 text-base text-white">{era.name}</p>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
              {era.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
