import { motion } from 'framer-motion';
import {
  Compass,
  ExternalLink,
  Globe2,
  Lightbulb,
  MapPin,
  Orbit,
  Sparkles,
  X,
} from 'lucide-react';
import {
  type Culture,
  type ResourceLink,
} from '@/data/cultures';
import { Button } from '@/components/ui/button';

interface CulturePanelProps {
  culture: Culture | null;
  eraName: string;
  eraRange: string;
  resources: ResourceLink[];
  onClose: () => void;
}

export function CulturePanel({
  culture,
  eraName,
  eraRange,
  resources,
  onClose,
}: CulturePanelProps) {
  if (!culture) return null;

  const influenceScore = Math.round((culture.radius / 32) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.button
        type="button"
        className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.aside
        initial={{ x: 420, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 420, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        className="relative h-full w-full max-w-[520px] overflow-y-auto border-l border-stone-200 bg-[#fffaf2] p-5 shadow-[0_0_80px_rgba(15,23,42,0.16)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-eyebrow">DETAIL PANEL</p>
            <p className="mt-2 text-sm text-stone-500">
              {eraName} · {eraRange}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="rounded-full border-stone-300 bg-white text-slate-700 hover:bg-stone-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div
          className="mt-5 rounded-[28px] border border-stone-200 p-6"
          style={{
            background: `linear-gradient(135deg, ${culture.color}22, rgba(255,255,255,0.96) 42%)`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/5"
              style={{ backgroundColor: culture.color }}
            >
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-4xl text-slate-900">
                {culture.name}
              </h2>
              <p className="mt-2 text-sm tracking-[0.12em] text-stone-500">
                {culture.nameEn}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{culture.period}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="mini-panel">
              <span className="mini-label">地理区域</span>
              <strong className="mini-value">{culture.location.region}</strong>
            </div>
            <div className="mini-panel">
              <span className="mini-label">影响力强度</span>
              <strong className="mini-value">{influenceScore}%</strong>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <section className="panel-block">
            <div className="panel-block-header">
              <Globe2 className="h-4 w-4 text-stone-500" />
              文明概述
            </div>
            <p className="mt-3 text-sm leading-8 text-slate-600">{culture.description}</p>
          </section>

          <section className="panel-block">
            <div className="panel-block-header">
              <Lightbulb className="h-4 w-4 text-stone-500" />
              主要特征
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {culture.features.map((feature) => (
                <span key={feature} className="feature-chip">
                  {feature}
                </span>
              ))}
            </div>
          </section>

          <section className="panel-block">
            <div className="panel-block-header">
              <Orbit className="h-4 w-4 text-stone-500" />
              深层影响
            </div>
            <div className="mt-4 space-y-3">
              {culture.influence.map((item) => (
                <div key={item} className="influence-row">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: culture.color }}
                  />
                  <span className="text-sm leading-7 text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel-block">
            <div className="panel-block-header">
              <MapPin className="h-4 w-4 text-stone-500" />
              空间坐标
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="mini-panel">
                <span className="mini-label">纬度</span>
                <strong className="mini-value">{culture.location.lat.toFixed(2)}°</strong>
              </div>
              <div className="mini-panel">
                <span className="mini-label">经度</span>
                <strong className="mini-value">{culture.location.lng.toFixed(2)}°</strong>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs tracking-[0.12em] text-stone-500">
                <span>地图影响力强度</span>
                <span>{influenceScore}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${influenceScore}%`, backgroundColor: culture.color }}
                />
              </div>
            </div>
          </section>

          <section className="panel-block">
            <div className="panel-block-header">
              <Compass className="h-4 w-4 text-stone-500" />
              延伸阅读
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              如果你想继续深入这一篇章，下面这些权威页面可以作为下一步阅读入口。
            </p>
            <div className="mt-4 space-y-3">
              {resources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="panel-link"
                >
                  <div className="resource-meta">
                    <span>{resource.source}</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-slate-900">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </motion.aside>
    </div>
  );
}
