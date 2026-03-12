import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Timeline } from '@/components/Timeline';
import { WorldMap } from '@/components/WorldMap';
import { CultureList } from '@/components/CultureList';
import { CulturePanel } from '@/components/CulturePanel';
import { Button } from '@/components/ui/button';
import {
  eras,
  getSpotlightCulture,
  type Culture,
} from '@/data/cultures';
import './App.css';

const formatYear = (year: number) => {
  if (year < 0) {
    return `公元前${Math.abs(year)}年`;
  }
  return `公元${year}年`;
};

const formatEraRange = (startYear: number, endYear: number) =>
  `${formatYear(startYear)} - ${formatYear(endYear)}`;

function App() {
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [focusedCultureId, setFocusedCultureId] = useState(
    getSpotlightCulture(eras[0]).id,
  );
  const [detailCulture, setDetailCulture] = useState<Culture | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentEra = eras[currentEraIndex];
  const spotlightCulture = getSpotlightCulture(currentEra);
  const focusedCulture =
    currentEra.cultures.find((culture) => culture.id === focusedCultureId) ??
    spotlightCulture;
  const previousEra = eras[currentEraIndex - 1] ?? null;
  const nextEra = eras[currentEraIndex + 1] ?? null;
  const currentRegions = Array.from(
    new Set(currentEra.cultures.map((culture) => culture.location.region)),
  );
  const influenceScore = Math.round((focusedCulture.radius / 32) * 100);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const interval = setInterval(() => {
      setCurrentEraIndex((prevIndex) => {
        if (prevIndex >= eras.length - 1) {
          setIsPlaying(false);
          return prevIndex;
        }

        const nextIndex = prevIndex + 1;
        const nextSpotlight = getSpotlightCulture(eras[nextIndex]);
        setFocusedCultureId(nextSpotlight.id);
        setDetailCulture(null);
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleEraChange = useCallback((index: number) => {
    setCurrentEraIndex(index);
    setFocusedCultureId(getSpotlightCulture(eras[index]).id);
    setDetailCulture(null);
    setIsPlaying(false);
  }, []);

  const handleCultureFocus = useCallback((culture: Culture) => {
    setFocusedCultureId(culture.id);
  }, []);

  const handleOpenDetail = useCallback((culture: Culture) => {
    setFocusedCultureId(culture.id);
    setDetailCulture(culture);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailCulture(null);
  }, []);

  const togglePlay = useCallback(() => {
    if (!isPlaying && currentEraIndex === eras.length - 1) {
      const restartCulture = getSpotlightCulture(eras[0]);
      setCurrentEraIndex(0);
      setFocusedCultureId(restartCulture.id);
      setDetailCulture(null);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((prev) => !prev);
  }, [currentEraIndex, isPlaying]);

  return (
    <div className="paper-site min-h-screen text-slate-900">
      <div className="paper-pattern" />

      <Header
        currentEraName={currentEra.name}
        currentRange={formatEraRange(currentEra.startYear, currentEra.endYear)}
      />

      <main className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Timeline
          eras={eras}
          currentEraIndex={currentEraIndex}
          onEraChange={handleEraChange}
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_360px]">
          <motion.section
            className="paper-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="section-eyebrow">CURRENT CHAPTER</p>
            <div className="mt-4 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <h1 className="hero-title">{currentEra.name}</h1>
                <p className="mt-3 text-sm font-medium tracking-[0.08em] text-stone-500">
                  {formatEraRange(currentEra.startYear, currentEra.endYear)}
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-800">
                  {currentEra.headline}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
                  {currentEra.context}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:w-[320px] xl:grid-cols-1">
                <div className="fact-tile">
                  <span className="fact-label">覆盖区域</span>
                  <strong className="fact-value">{currentRegions.length}</strong>
                  <span className="fact-note">{currentRegions.join('、')}</span>
                </div>
                <div className="fact-tile">
                  <span className="fact-label">文化节点</span>
                  <strong className="fact-value">{currentEra.cultures.length}</strong>
                  <span className="fact-note">点击卡片或地图切换焦点</span>
                </div>
                <div className="fact-tile">
                  <span className="fact-label">代表焦点</span>
                  <strong className="fact-value">{spotlightCulture.name}</strong>
                  <span className="fact-note">本章影响力最强的文明节点</span>
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
            <p className="section-eyebrow">HOW TO READ</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-slate-900">
              先选上方历史篇章，再看地图与焦点文明。
            </h2>
            <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              {currentEra.guideQuestions.map((question, index) => (
                <li key={question} className="flex items-start gap-3">
                  <span className="step-badge">{index + 1}</span>
                  <span>{question}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-[24px] border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs tracking-[0.18em] text-stone-500">当前焦点</p>
              <p className="mt-2 text-xl text-slate-900">{focusedCulture.name}</p>
              <p className="mt-1 text-sm text-slate-500">{focusedCulture.period}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                onClick={() => handleOpenDetail(focusedCulture)}
                className="h-11 rounded-full bg-slate-900 px-5 text-white hover:bg-slate-800"
              >
                展开详细资料
              </Button>
              <Button
                variant="outline"
                onClick={togglePlay}
                className="h-11 rounded-full border-stone-300 bg-white px-5 text-slate-700 hover:bg-stone-100"
              >
                {isPlaying ? '暂停自动浏览' : '自动浏览六个篇章'}
              </Button>
            </div>
          </motion.aside>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_380px]">
          <motion.section
            className="paper-card p-4 sm:p-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-eyebrow">WORLD MAP</p>
                <h2 className="mt-2 font-display text-3xl text-slate-900">
                  文化中心分布
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                  地图只突出当前焦点文明，其他节点保持简洁显示。先点圆点切换焦点，再通过右侧面板展开细节。
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-600">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
                圆点越大，表示该文化在本篇章中的影响范围越广
              </div>
            </div>

            <div className="map-shell relative h-[420px] overflow-hidden rounded-[28px] sm:h-[520px]">
              <WorldMap
                cultures={currentEra.cultures}
                selectedCulture={focusedCulture}
                onCultureSelect={handleCultureFocus}
              />

              <div className="map-overlay map-overlay-top">
                <p className="text-xs tracking-[0.18em] text-slate-500">CURRENT WINDOW</p>
                <p className="mt-2 text-xl text-white">{currentEra.name}</p>
                <p className="mt-1 text-xs text-slate-300">
                  {formatEraRange(currentEra.startYear, currentEra.endYear)}
                </p>
              </div>

              <div className="map-overlay map-overlay-bottom">
                <p className="text-xs tracking-[0.18em] text-slate-400">FOCUSED CULTURE</p>
                <p className="mt-1 text-base text-white">{focusedCulture.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
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
            <p className="section-eyebrow">FOCUSED CULTURE</p>
            <div className="mt-4 flex items-start gap-4">
              <div
                className="focus-swatch"
                style={{ backgroundColor: focusedCulture.color }}
              />
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-3xl text-slate-900">
                  {focusedCulture.name}
                </h2>
                <p className="mt-1 text-sm tracking-[0.08em] text-stone-500">
                  {focusedCulture.nameEn}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-8 text-slate-600">
              {focusedCulture.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="mini-panel">
                <span className="mini-label">时间</span>
                <strong className="mini-value">{focusedCulture.period}</strong>
              </div>
              <div className="mini-panel">
                <span className="mini-label">区域</span>
                <strong className="mini-value">{focusedCulture.location.region}</strong>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs tracking-[0.12em] text-stone-500">
                <span>影响力强度</span>
                <span>{influenceScore}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-slate-900"
                  style={{ width: `${influenceScore}%` }}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs tracking-[0.18em] text-stone-500">核心特征</p>
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
                  <span className="text-sm leading-7 text-slate-600">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => handleOpenDetail(focusedCulture)}
                className="h-11 rounded-full bg-[#b35b3a] px-5 text-white hover:bg-[#9c4f32]"
              >
                查看完整细节
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCultureFocus(spotlightCulture)}
                className="h-11 rounded-full border-stone-300 bg-white px-5 text-slate-700 hover:bg-stone-100"
              >
                回到代表文明
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
            cultures={currentEra.cultures}
            selectedCulture={focusedCulture}
            eraName={currentEra.name}
            onCultureSelect={handleCultureFocus}
            onOpenFocusedCulture={() => handleOpenDetail(focusedCulture)}
          />
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <motion.section
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <details className="expand-card" open>
              <summary>
                <div>
                  <p className="section-eyebrow">READING NOTES</p>
                  <h3 className="mt-1 text-lg text-slate-900">这一章先看什么</h3>
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
                  <p className="section-eyebrow">INNER LOGIC</p>
                  <h3 className="mt-1 text-lg text-slate-900">本章内部的文明线索</h3>
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
                        <p className="text-sm font-medium text-slate-900">{culture.name}</p>
                        <p className="mt-1 text-sm leading-7 text-slate-600">
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
                  <p className="section-eyebrow">TRANSITION</p>
                  <h3 className="mt-1 text-lg text-slate-900">与前后篇章的关系</h3>
                </div>
              </summary>
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                <div className="transition-card">
                  <p className="text-xs tracking-[0.16em] text-stone-500">上一章</p>
                  <p className="mt-2 text-base text-slate-900">
                    {previousEra ? previousEra.name : '这是起点篇章'}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {previousEra
                      ? previousEra.headline
                      : '可以从这里开始，先建立对文明起源、国家形成和早期制度的整体理解。'}
                  </p>
                </div>
                <div className="transition-card">
                  <p className="text-xs tracking-[0.16em] text-stone-500">下一章</p>
                  <p className="mt-2 text-base text-slate-900">
                    {nextEra ? nextEra.name : '这是最新篇章'}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {nextEra
                      ? nextEra.headline
                      : '此处已经来到时间线末端，可以回看前几章比较文明中心如何迁移与重组。'}
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
            <p className="section-eyebrow">FURTHER READING</p>
            <h2 className="mt-3 font-display text-3xl text-slate-900">
              权威延伸阅读
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              这些链接来自博物馆、国际组织、图书馆与百科机构，适合继续沿着当前篇章深入阅读。
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
                  <h3 className="mt-2 text-base text-slate-900">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
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
            culture={detailCulture}
            eraName={currentEra.name}
            eraRange={formatEraRange(currentEra.startYear, currentEra.endYear)}
            resources={currentEra.resources}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
