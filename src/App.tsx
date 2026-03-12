import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { WorldMap } from '@/components/WorldMap';
import { CultureList } from '@/components/CultureList';
import { CulturePanel } from '@/components/CulturePanel';
import { Button } from '@/components/ui/button';
import {
  getEras,
  getSpotlightCulture,
  type Culture,
  type Locale,
} from '@/data/cultures';
import { siteContent } from '@/data/siteContent';
import './App.css';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'cultural-atlas-theme';
const LOCALE_STORAGE_KEY = 'cultural-atlas-locale';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'light';
};

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'zh';

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return storedLocale === 'zh' || storedLocale === 'en' ? storedLocale : 'zh';
};

const formatYear = (year: number, locale: Locale) => {
  if (locale === 'zh') {
    return year < 0 ? `公元前${Math.abs(year)}年` : `公元${year}年`;
  }

  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
};

const formatEraRange = (startYear: number, endYear: number, locale: Locale) =>
  `${formatYear(startYear, locale)} - ${formatYear(endYear, locale)}`;

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [focusedCultureId, setFocusedCultureId] = useState(
    () => getSpotlightCulture(getEras('zh')[0]).id,
  );
  const [detailCultureId, setDetailCultureId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChromeCompact, setIsChromeCompact] = useState(false);
  const compactTriggerRef = useRef<HTMLDivElement | null>(null);

  const localizedEras = getEras(locale);
  const copy = siteContent[locale];
  const currentEra = localizedEras[currentEraIndex] ?? localizedEras[0];
  const spotlightCulture = getSpotlightCulture(currentEra);
  const focusedCulture =
    currentEra.cultures.find((culture) => culture.id === focusedCultureId) ??
    spotlightCulture;
  const detailCulture =
    currentEra.cultures.find((culture) => culture.id === detailCultureId) ?? null;
  const previousEra = localizedEras[currentEraIndex - 1] ?? null;
  const nextEra = localizedEras[currentEraIndex + 1] ?? null;
  const currentRegions = Array.from(
    new Set(currentEra.cultures.map((culture) => culture.location.region)),
  );
  const influenceScore = Math.round((focusedCulture.radius / 32) * 100);
  const currentRange = formatEraRange(
    currentEra.startYear,
    currentEra.endYear,
    locale,
  );
  const currentRegionSummary = currentRegions.join(locale === 'zh' ? '、' : ' · ');

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    document.title =
      locale === 'zh' ? siteContent.zh.header.title : siteContent.en.header.title;
  }, [locale]);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const interval = window.setInterval(() => {
      setCurrentEraIndex((previousIndex) => {
        if (previousIndex >= localizedEras.length - 1) {
          setIsPlaying(false);
          return previousIndex;
        }

        const nextIndex = previousIndex + 1;
        const nextSpotlight = getSpotlightCulture(localizedEras[nextIndex]);
        setFocusedCultureId(nextSpotlight.id);
        setDetailCultureId(null);
        return nextIndex;
      });
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPlaying, localizedEras]);

  useEffect(() => {
    const trigger = compactTriggerRef.current;
    if (!trigger) return undefined;

    let observer: IntersectionObserver | null = null;

    const connectObserver = () => {
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--sticky-header-height')
          .trim(),
      );
      const stickyOffset = Number.isFinite(headerHeight) ? headerHeight + 28 : 136;

      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsChromeCompact(!entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
          rootMargin: `-${stickyOffset}px 0px 0px 0px`,
        },
      );
      observer.observe(trigger);
    };

    connectObserver();
    window.addEventListener('resize', connectObserver);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', connectObserver);
    };
  }, [currentEra.name, currentRange, locale]);

  const handleEraChange = (index: number) => {
    const nextSpotlight = getSpotlightCulture(localizedEras[index]);
    setCurrentEraIndex(index);
    setFocusedCultureId(nextSpotlight.id);
    setDetailCultureId(null);
    setIsPlaying(false);
  };

  const handleCultureFocus = (culture: Culture) => {
    setFocusedCultureId(culture.id);
  };

  const handleOpenDetail = (culture: Culture) => {
    setFocusedCultureId(culture.id);
    setDetailCultureId(culture.id);
  };

  const handleCloseDetail = () => {
    setDetailCultureId(null);
  };

  const togglePlay = () => {
    if (!isPlaying && currentEraIndex === localizedEras.length - 1) {
      const restartCulture = getSpotlightCulture(localizedEras[0]);
      setCurrentEraIndex(0);
      setFocusedCultureId(restartCulture.id);
      setDetailCultureId(null);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((previous) => !previous);
  };

  return (
    <div className="paper-site min-h-screen">
      <div className="paper-pattern" />

      <Header
        copy={copy.header}
        theme={theme}
        locale={locale}
        isCompact={isChromeCompact}
        currentEraName={currentEra.name}
        currentEraAltName={currentEra.altName}
        currentRange={currentRange}
        onThemeChange={setTheme}
        onLocaleChange={setLocale}
      />

      <main className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Timeline
          copy={copy.timeline}
          eras={localizedEras}
          locale={locale}
          isCompact={isChromeCompact}
          currentEraIndex={currentEraIndex}
          onEraChange={handleEraChange}
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
        />

        <div ref={compactTriggerRef} className="compact-trigger" aria-hidden="true" />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_380px]">
          <motion.section
            className="paper-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="section-eyebrow">{copy.app.currentChapterEyebrow}</p>
            <div className="mt-4 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <h1 className="hero-title">{currentEra.name}</h1>
                <p className="mt-3 text-sm tracking-[0.16em] site-subtle">
                  {currentEra.altName}
                </p>
                <p className="mt-3 text-sm font-medium tracking-[0.08em] site-subtle">
                  {currentRange}
                </p>
                <p className="mt-4 text-lg leading-8 site-heading-soft">
                  {currentEra.headline}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-8 site-muted sm:text-base">
                  {currentEra.context}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:w-[340px] xl:grid-cols-1">
                <div className="fact-tile">
                  <span className="fact-label">{copy.app.coverageRegions}</span>
                  <strong className="fact-value">{currentRegions.length}</strong>
                  <span className="fact-note">{currentRegionSummary}</span>
                </div>
                <div className="fact-tile">
                  <span className="fact-label">{copy.app.cultureNodes}</span>
                  <strong className="fact-value">{currentEra.cultures.length}</strong>
                  <span className="fact-note">{copy.app.nodesNote}</span>
                </div>
                <div className="fact-tile">
                  <span className="fact-label">{copy.app.spotlight}</span>
                  <strong className="fact-value">{spotlightCulture.name}</strong>
                  <span className="fact-note">{copy.app.spotlightNote}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {currentEra.keyThreads.map((thread) => (
                <span key={thread} className="thread-chip">
                  {thread}
                </span>
              ))}
            </div>
          </motion.section>

          <motion.aside
            className="paper-card p-6"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <p className="section-eyebrow">{copy.app.howToReadEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight site-heading">
              {copy.app.howToReadTitle}
            </h2>
            <ol className="mt-5 space-y-3 text-sm leading-7 site-muted">
              {currentEra.guideQuestions.map((question, index) => (
                <li key={question} className="flex items-start gap-3">
                  <span className="step-badge">{index + 1}</span>
                  <span>{question}</span>
                </li>
              ))}
            </ol>

            <div className="info-highlight mt-6">
              <p className="text-xs tracking-[0.18em] site-subtle">
                {copy.app.currentFocus}
              </p>
              <p className="mt-2 text-xl site-heading">{focusedCulture.name}</p>
              <p className="mt-1 text-sm site-muted">{focusedCulture.period}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                onClick={() => handleOpenDetail(focusedCulture)}
                className="primary-button h-11 rounded-full px-5"
              >
                {copy.app.openDetails}
              </Button>
              <Button
                variant="outline"
                onClick={togglePlay}
                className="secondary-button h-11 rounded-full px-5"
              >
                {isPlaying ? copy.app.pauseBrowse : copy.app.autoBrowse}
              </Button>
            </div>
          </motion.aside>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_390px]">
          <motion.section
            className="paper-card p-4 sm:p-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-eyebrow">{copy.app.worldMapEyebrow}</p>
                <h2 className="mt-2 font-display text-3xl site-heading">
                  {copy.app.worldMapTitle}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 site-muted">
                  {copy.app.worldMapDescription}
                </p>
              </div>

              <div className="legend-pill">
                <span className="legend-dot" />
                {copy.app.mapLegend}
              </div>
            </div>

            <div className="map-shell relative h-[420px] overflow-hidden rounded-[28px] sm:h-[520px]">
              <WorldMap
                theme={theme}
                cultures={currentEra.cultures}
                selectedCulture={focusedCulture}
                onCultureSelect={handleCultureFocus}
              />

              <div className="map-overlay map-overlay-top">
                <p className="text-xs tracking-[0.18em] map-overlay-eyebrow">
                  {copy.app.currentWindow}
                </p>
                <p className="mt-2 text-xl text-white">{currentEra.name}</p>
                <p className="mt-1 text-xs map-overlay-subtle">{currentRange}</p>
              </div>

              <div className="map-overlay map-overlay-bottom">
                <p className="text-xs tracking-[0.18em] map-overlay-eyebrow">
                  {copy.app.focusedCulture}
                </p>
                <p className="mt-1 text-base text-white">{focusedCulture.name}</p>
                <p className="mt-1 text-xs map-overlay-subtle">
                  {focusedCulture.altName}
                </p>
                <p className="mt-2 text-sm leading-6 map-overlay-subtle">
                  {focusedCulture.location.region} · {focusedCulture.period}
                </p>
              </div>
            </div>
          </motion.section>

          <motion.aside
            className="paper-card p-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            <p className="section-eyebrow">{copy.app.focusEyebrow}</p>
            <div className="mt-4 flex items-start gap-4">
              <div
                className="focus-swatch"
                style={{ backgroundColor: focusedCulture.color }}
              />
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-3xl site-heading">
                  {focusedCulture.name}
                </h2>
                <p className="mt-1 text-sm tracking-[0.08em] site-subtle">
                  {focusedCulture.altName}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-8 site-muted">
              {focusedCulture.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="mini-panel">
                <span className="mini-label">{copy.app.timeLabel}</span>
                <strong className="mini-value">{focusedCulture.period}</strong>
              </div>
              <div className="mini-panel">
                <span className="mini-label">{copy.app.regionLabel}</span>
                <strong className="mini-value">{focusedCulture.location.region}</strong>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs tracking-[0.12em] site-subtle">
                <span>{copy.app.influenceLabel}</span>
                <span>{influenceScore}%</span>
              </div>
              <div className="progress-track mt-2">
                <div
                  className="progress-fill"
                  style={{
                    width: `${influenceScore}%`,
                    backgroundColor: focusedCulture.color,
                  }}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs tracking-[0.18em] site-subtle">
                {copy.app.coreFeatures}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {focusedCulture.features.map((feature) => (
                  <span key={feature} className="feature-chip">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {focusedCulture.influence.map((item) => (
                <div key={item} className="influence-row">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: focusedCulture.color }}
                  />
                  <span className="text-sm leading-7 site-muted">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => handleOpenDetail(focusedCulture)}
                className="primary-button h-11 rounded-full px-5"
              >
                {copy.app.fullDetails}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCultureFocus(spotlightCulture)}
                className="secondary-button h-11 rounded-full px-5"
              >
                {copy.app.backToSpotlight}
              </Button>
            </div>
          </motion.aside>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16 }}
        >
          <CultureList
            copy={copy.cultureList}
            locale={locale}
            cardCopy={copy.cultureCard}
            cultures={currentEra.cultures}
            selectedCulture={focusedCulture}
            eraName={currentEra.name}
            onCultureSelect={handleCultureFocus}
            onOpenFocusedCulture={() => handleOpenDetail(focusedCulture)}
          />
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <motion.section
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <details className="expand-card" open>
              <summary>
                <div>
                  <p className="section-eyebrow">{copy.app.readingEyebrow}</p>
                  <h3 className="mt-1 text-lg site-heading">{copy.app.readingTitle}</h3>
                </div>
              </summary>
              <ul className="expand-list">
                {currentEra.guideQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </details>

            <details className="expand-card">
              <summary>
                <div>
                  <p className="section-eyebrow">{copy.app.logicEyebrow}</p>
                  <h3 className="mt-1 text-lg site-heading">{copy.app.logicTitle}</h3>
                </div>
              </summary>
              <div className="space-y-3 pt-4">
                {currentEra.cultures.map((culture) => (
                  <button
                    key={culture.id}
                    type="button"
                    onClick={() => handleCultureFocus(culture)}
                    className="logic-row"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span
                        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: culture.color }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium site-heading">{culture.name}</p>
                        <p className="mt-1 text-sm leading-7 site-muted">
                          {culture.influence[0]}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </details>

            <details className="expand-card">
              <summary>
                <div>
                  <p className="section-eyebrow">{copy.app.transitionEyebrow}</p>
                  <h3 className="mt-1 text-lg site-heading">
                    {copy.app.transitionTitle}
                  </h3>
                </div>
              </summary>
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                <div className="transition-card">
                  <p className="text-xs tracking-[0.16em] site-subtle">
                    {copy.app.previousChapter}
                  </p>
                  <p className="mt-2 text-base site-heading">
                    {previousEra ? previousEra.name : copy.app.firstChapterTitle}
                  </p>
                  <p className="mt-1 text-sm tracking-[0.12em] site-subtle">
                    {previousEra ? previousEra.altName : ''}
                  </p>
                  <p className="mt-2 text-sm leading-7 site-muted">
                    {previousEra
                      ? previousEra.headline
                      : copy.app.firstChapterDescription}
                  </p>
                </div>
                <div className="transition-card">
                  <p className="text-xs tracking-[0.16em] site-subtle">
                    {copy.app.nextChapter}
                  </p>
                  <p className="mt-2 text-base site-heading">
                    {nextEra ? nextEra.name : copy.app.latestChapterTitle}
                  </p>
                  <p className="mt-1 text-sm tracking-[0.12em] site-subtle">
                    {nextEra ? nextEra.altName : ''}
                  </p>
                  <p className="mt-2 text-sm leading-7 site-muted">
                    {nextEra ? nextEra.headline : copy.app.latestChapterDescription}
                  </p>
                </div>
              </div>
            </details>
          </motion.section>

          <motion.aside
            className="paper-card p-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24 }}
          >
            <p className="section-eyebrow">{copy.app.resourcesEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl site-heading">
              {copy.app.resourcesTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 site-muted">
              {copy.app.resourcesDescription}
            </p>

            <div className="mt-5 space-y-3">
              {currentEra.resources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-link"
                >
                  <div className="resource-meta">
                    <span>{resource.source}</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <h3 className="mt-2 text-base site-heading">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-7 site-muted">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </motion.aside>
        </section>
      </main>

      <AnimatePresence>
        {detailCulture && (
          <CulturePanel
            copy={copy.panel}
            culture={detailCulture}
            eraName={currentEra.name}
            eraAltName={currentEra.altName}
            eraRange={currentRange}
            resources={currentEra.resources}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
