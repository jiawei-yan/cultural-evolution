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
import { type Culture, type ResourceLink } from '@/data/cultures';
import type { SiteCopy } from '@/data/siteContent';
import { Button } from '@/components/ui/button';

interface CulturePanelProps {
  copy: SiteCopy['panel'];
  culture: Culture | null;
  eraName: string;
  eraAltName: string;
  eraRange: string;
  resources: ResourceLink[];
  onClose: () => void;
}

export function CulturePanel({
  copy,
  culture,
  eraName,
  eraAltName,
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
        className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
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
        className="detail-drawer relative h-full w-full max-w-[540px] overflow-y-auto border-l p-5 shadow-[0_0_80px_rgba(15,23,42,0.18)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-eyebrow">{copy.eyebrow}</p>
            <p className="mt-2 text-sm site-muted">
              {eraName} · {eraRange}
            </p>
            <p className="mt-1 text-xs tracking-[0.14em] site-subtle">{eraAltName}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="secondary-button rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div
          className="detail-hero mt-5 rounded-[28px] border p-6"
          style={{
            background: `linear-gradient(135deg, ${culture.color}24, var(--panel-bg-strong) 42%)`,
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
              <h2 className="font-display text-4xl site-heading">{culture.name}</h2>
              <p className="mt-2 text-sm tracking-[0.12em] site-subtle">{culture.altName}</p>
              <p className="mt-3 text-sm leading-7 site-muted">{culture.period}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="mini-panel">
              <span className="mini-label">{copy.regionLabel}</span>
              <strong className="mini-value">{culture.location.region}</strong>
            </div>
            <div className="mini-panel">
              <span className="mini-label">{copy.influenceLabel}</span>
              <strong className="mini-value">{influenceScore}%</strong>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <section className="panel-block">
            <div className="panel-block-header">
              <Globe2 className="h-4 w-4" />
              {copy.overviewTitle}
            </div>
            <p className="mt-3 text-sm leading-8 site-muted">{culture.description}</p>
          </section>

          <section className="panel-block">
            <div className="panel-block-header">
              <Lightbulb className="h-4 w-4" />
              {copy.featuresTitle}
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
              <Orbit className="h-4 w-4" />
              {copy.impactTitle}
            </div>
            <div className="mt-4 space-y-3">
              {culture.influence.map((item) => (
                <div key={item} className="influence-row">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: culture.color }}
                  />
                  <span className="text-sm leading-7 site-muted">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel-block">
            <div className="panel-block-header">
              <MapPin className="h-4 w-4" />
              {copy.coordinatesTitle}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="mini-panel">
                <span className="mini-label">{copy.latitudeLabel}</span>
                <strong className="mini-value">{culture.location.lat.toFixed(2)}°</strong>
              </div>
              <div className="mini-panel">
                <span className="mini-label">{copy.longitudeLabel}</span>
                <strong className="mini-value">{culture.location.lng.toFixed(2)}°</strong>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs tracking-[0.12em] site-subtle">
                <span>{copy.mapInfluenceLabel}</span>
                <span>{influenceScore}%</span>
              </div>
              <div className="progress-track mt-2">
                <div
                  className="progress-fill"
                  style={{
                    width: `${influenceScore}%`,
                    backgroundColor: culture.color,
                  }}
                />
              </div>
            </div>
          </section>

          <section className="panel-block">
            <div className="panel-block-header">
              <Compass className="h-4 w-4" />
              {copy.resourcesTitle}
            </div>
            <p className="mt-3 text-sm leading-7 site-muted">{copy.resourcesDescription}</p>
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
                  <h3 className="mt-2 text-sm font-medium site-heading">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 site-muted">
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
