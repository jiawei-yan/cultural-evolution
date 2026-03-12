import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  Compass,
  Globe2,
  Lightbulb,
  MapPin,
  Orbit,
  Sparkles,
  X,
} from 'lucide-react';
import { type Culture } from '@/data/cultures';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CulturePanelProps {
  culture: Culture | null;
  onClose: () => void;
}

export function CulturePanel({ culture, onClose }: CulturePanelProps) {
  if (!culture) return null;

  const influenceScore = Math.round((culture.radius / 32) * 100);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 360 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 360 }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className="fixed inset-y-0 right-0 z-50 h-full w-full border-l border-white/10 bg-slate-950/95 shadow-[0_0_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:w-[430px]"
      >
        <ScrollArea className="h-full">
          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.22em] text-slate-500">CULTURE PANEL</p>
                <p className="mt-1 text-sm text-slate-300">{culture.nameEn}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div
              className="rounded-[30px] border border-white/10 p-6"
              style={{
                background: `linear-gradient(155deg, ${culture.color}25, rgba(15,23,42,0.95) 45%, rgba(2,6,23,0.98))`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 shadow-[0_20px_45px_rgba(0,0,0,0.26)]"
                  style={{ backgroundColor: `${culture.color}25` }}
                >
                  <Sparkles className="h-8 w-8 text-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-3xl text-white">{culture.name}</h2>
                  <p className="mt-1 text-sm text-slate-200/80">{culture.period}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                  <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    REGION
                  </div>
                  <p className="mt-2 text-base text-white">{culture.location.region}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                  <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-slate-500">
                    <Compass className="h-3.5 w-3.5" />
                    INFLUENCE
                  </div>
                  <p className="mt-2 text-base text-white">{influenceScore}%</p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <section className="story-card">
                <div className="story-card-header">
                  <Globe2 className="h-4 w-4 text-amber-300" />
                  文明概述
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {culture.description}
                </p>
              </section>

              <section className="story-card">
                <div className="story-card-header">
                  <Lightbulb className="h-4 w-4 text-amber-300" />
                  主要特征
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {culture.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-slate-100 hover:bg-white/[0.12]">
                        {feature}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="story-card">
                <div className="story-card-header">
                  <Orbit className="h-4 w-4 text-amber-300" />
                  历史影响
                </div>
                <ul className="mt-4 space-y-3">
                  {culture.influence.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="flex items-start gap-3 text-sm leading-7 text-slate-300"
                    >
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: culture.color }}
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>

              <section className="story-card">
                <div className="story-card-header">
                  <Calendar className="h-4 w-4 text-amber-300" />
                  空间与时间定位
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs tracking-[0.16em] text-slate-500">纬度</p>
                    <p className="mt-2 text-white">{culture.location.lat.toFixed(2)}°</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs tracking-[0.16em] text-slate-500">经度</p>
                    <p className="mt-2 text-white">{culture.location.lng.toFixed(2)}°</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between gap-4 text-xs text-slate-400">
                    <span>影响力强度</span>
                    <span>{influenceScore}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-900">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${influenceScore}%` }}
                      transition={{ duration: 0.55 }}
                      style={{ backgroundColor: culture.color }}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  );
}
