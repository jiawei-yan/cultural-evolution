import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Globe2,
  Landmark,
  Orbit,
  Sparkles,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { WorldMap } from '@/components/WorldMap';
import { Timeline } from '@/components/Timeline';
import { CulturePanel } from '@/components/CulturePanel';
import { CultureList } from '@/components/CultureList';
import { Button } from '@/components/ui/button';
import { eras, type Culture } from '@/data/cultures';
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
  const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const currentEra = eras[currentEraIndex];
  const nextEra = eras[currentEraIndex + 1] ?? null;
  const previousEra = eras[currentEraIndex - 1] ?? null;
  const activeCulture = selectedCulture ?? currentEra.cultures[0];
  const currentRegions = Array.from(
    new Set(currentEra.cultures.map((culture) => culture.location.region)),
  );
  const signatureTags = Array.from(
    new Set(currentEra.cultures.flatMap((culture) => culture.features)),
  ).slice(0, 6);
  const totalCultures = eras.reduce((sum, era) => sum + era.cultures.length, 0);
  const eraSpanYears = Math.abs(currentEra.endYear - currentEra.startYear);
  const topCulture = currentEra.cultures.reduce((maxCulture, culture) => {
    return culture.radius > maxCulture.radius ? culture : maxCulture;
  }, currentEra.cultures[0]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentEraIndex((prev) => {
          if (prev >= eras.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          setSelectedCulture(null);
          setShowPanel(false);
          return prev + 1;
        });
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleEraChange = useCallback((index: number) => {
    setCurrentEraIndex(index);
    setSelectedCulture(null);
    setShowPanel(false);
  }, []);

  const handleCultureSelect = useCallback((culture: Culture) => {
    setSelectedCulture(culture);
    setShowPanel(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setShowPanel(false);
    setSelectedCulture(null);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <div className="atlas-background" />

      <Header
        currentChapter={currentEraIndex + 1}
        totalChapters={eras.length}
        currentEraName={currentEra.name}
        currentRange={formatEraRange(currentEra.startYear, currentEra.endYear)}
        currentCultureCount={currentEra.cultures.length}
      />

      <main className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-4 px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
          <motion.section
            className="atlas-panel atlas-hero-panel p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <p className="atlas-kicker">CULTURAL EVOLUTION ATLAS</p>
                  <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl xl:text-6xl">
                    从河谷文明到全球网络的人类文化地图
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    这不是静态的年代列表，而是一幅可以切换时代、定位地区、聚焦文明节点的演化界面。
                    通过时间轴、地图热点和文明卡片，你可以看到文明如何在不同区域兴起、交汇与外溢。
                  </p>
                </div>

                <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-[360px] lg:grid-cols-1">
                  <div className="metric-card">
                    <span className="metric-label">历史篇章</span>
                    <strong className="metric-value">{eras.length}</strong>
                    <span className="metric-hint">从起源到全球化</span>
                  </div>
                  <div className="metric-card">
                    <span className="metric-label">文化样本</span>
                    <strong className="metric-value">{totalCultures}</strong>
                    <span className="metric-hint">覆盖主要文化中心</span>
                  </div>
                  <div className="metric-card">
                    <span className="metric-label">当前跨度</span>
                    <strong className="metric-value">{eraSpanYears.toLocaleString()}</strong>
                    <span className="metric-hint">年尺度观察窗口</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="info-card">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="atlas-chip">当前篇章</span>
                    <span className="text-xs tracking-[0.18em] text-slate-400">
                      第 {currentEraIndex + 1} 幕 / 共 {eras.length} 幕
                    </span>
                  </div>
                  <h2 className="section-title mt-4">{currentEra.name}</h2>
                  <p className="mt-2 text-sm text-amber-200/90">
                    {formatEraRange(currentEra.startYear, currentEra.endYear)}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                    {currentEra.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {currentRegions.map((region) => (
                      <span key={region} className="atlas-chip atlas-chip-muted">
                        {region}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                      时代关键词
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {signatureTags.map((tag) => (
                        <span key={tag} className="atlas-chip atlas-chip-warm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    本幕焦点文明
                  </div>
                  <div className="mt-5 flex items-start gap-4">
                    <div
                      className="h-14 w-14 rounded-2xl border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.24)]"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${activeCulture.color}, rgba(255,255,255,0.08))`,
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-3xl text-white">
                        {activeCulture.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">{activeCulture.nameEn}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    {activeCulture.description}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-xs tracking-[0.18em] text-slate-500">主要区域</p>
                      <p className="mt-2 text-base text-white">
                        {activeCulture.location.region}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-xs tracking-[0.18em] text-slate-500">关键影响</p>
                      <p className="mt-2 text-base text-white">
                        {activeCulture.influence.slice(0, 2).join(' / ')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      onClick={() => handleCultureSelect(activeCulture)}
                      className="h-11 rounded-full bg-amber-500 px-5 text-slate-950 hover:bg-amber-400"
                    >
                      查看文明详情
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={togglePlay}
                      className="h-11 rounded-full border-white/15 bg-white/5 px-5 text-white hover:bg-white/10"
                    >
                      {isPlaying ? '暂停自动巡览' : '自动播放历史'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.aside
            className="atlas-panel p-6"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="atlas-kicker">ERA INSIGHT</p>
              <span className="atlas-chip atlas-chip-warm">
                {isPlaying ? '自动巡航中' : '手动浏览'}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="story-card">
                <div className="story-card-header">
                  <Landmark className="h-4 w-4 text-amber-300" />
                  影响力最高节点
                </div>
                <button
                  type="button"
                  onClick={() => handleCultureSelect(topCulture)}
                  className="mt-4 w-full rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-amber-300/50 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl text-white">{topCulture.name}</h3>
                      <p className="mt-1 text-sm text-slate-400">{topCulture.period}</p>
                    </div>
                    <div
                      className="h-11 w-11 rounded-full border border-white/15"
                      style={{ backgroundColor: `${topCulture.color}40` }}
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {topCulture.description}
                  </p>
                </button>
              </div>

              <div className="story-card">
                <div className="story-card-header">
                  <Orbit className="h-4 w-4 text-amber-300" />
                  演化过渡
                </div>
                <div className="mt-4 space-y-3">
                  {previousEra ? (
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-xs tracking-[0.18em] text-slate-500">上一幕</p>
                      <p className="mt-2 text-base text-white">{previousEra.name}</p>
                    </div>
                  ) : null}

                  <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                    <p className="text-xs tracking-[0.18em] text-amber-200/80">当前幕</p>
                    <p className="mt-2 text-lg text-white">{currentEra.name}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-200/90">
                      {currentEra.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs tracking-[0.18em] text-slate-500">下一幕</p>
                    <p className="mt-2 text-base text-white">
                      {nextEra ? nextEra.name : '历史时间线已到终章'}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {nextEra
                        ? nextEra.description
                        : '可以返回前面的章节，重新观察不同文明在空间上的分布与影响。'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="story-card">
                <div className="story-card-header">
                  <Compass className="h-4 w-4 text-amber-300" />
                  阅读路径建议
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <li>先看地图热点的空间分布，再查看右侧文明列表的细节。</li>
                  <li>切换时间轴观察文明中心如何从区域性网络演化为全球网络。</li>
                  <li>点击文明详情面板，重点比较“主要特征”和“历史影响”的变化。</li>
                </ul>
              </div>
            </div>
          </motion.aside>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_380px]">
          <motion.section
            className="atlas-panel p-3 sm:p-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="atlas-kicker">INTERACTIVE MAP</p>
                <h2 className="section-title mt-3">文明热点分布</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                  通过发光节点显示各文明的影响中心。节点越大，表示该文化在当前篇章中的扩散势能越强。
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="atlas-chip">当前焦点：{activeCulture.name}</span>
                <span className="atlas-chip atlas-chip-muted">
                  覆盖 {currentRegions.length} 个文化区域
                </span>
              </div>
            </div>

            <div className="relative h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[#061120] sm:h-[520px] xl:h-[560px]">
              <WorldMap
                cultures={currentEra.cultures}
                selectedCulture={selectedCulture}
                onCultureSelect={handleCultureSelect}
              />

              <div className="map-overlay-card absolute left-4 top-4 max-w-sm">
                <p className="text-xs tracking-[0.28em] text-amber-200/80">
                  CURRENT WINDOW
                </p>
                <h3 className="mt-3 font-display text-2xl text-white">
                  {currentEra.name}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {formatEraRange(currentEra.startYear, currentEra.endYear)}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {currentEra.description}
                </p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 lg:right-auto lg:w-[420px]">
                <div className="map-overlay-card">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs tracking-[0.18em] text-slate-500">时代地标</p>
                      <p className="mt-2 text-lg text-white">{topCulture.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCultureSelect(topCulture)}
                      className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-100 transition hover:bg-amber-400/20"
                    >
                      查看
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {topCulture.influence.slice(0, 2).join(' / ')}
                  </p>
                </div>

                <div className="map-overlay-card">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs tracking-[0.18em] text-slate-500">
                      图例说明
                    </span>
                    <Globe2 className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                      文化核心节点
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
                      地理网格
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                      点击展开详情
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CultureList
                cultures={currentEra.cultures}
                selectedCulture={selectedCulture}
                onCultureSelect={handleCultureSelect}
                eraName={currentEra.name}
              />
            </motion.div>

            <motion.section
              className="atlas-panel p-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <p className="atlas-kicker">THREADS</p>
              <h3 className="section-title mt-3">文明线索</h3>
              <div className="mt-4 space-y-3">
                {currentEra.cultures.slice(0, 3).map((culture) => (
                  <button
                    key={culture.id}
                    type="button"
                    onClick={() => handleCultureSelect(culture)}
                    className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base text-white">{culture.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{culture.period}</p>
                      </div>
                      <span
                        className="mt-1 h-3 w-3 rounded-full"
                        style={{ backgroundColor: culture.color }}
                      />
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-300">
                      {culture.features.slice(0, 3).join(' / ')}
                    </p>
                  </button>
                ))}
              </div>
            </motion.section>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Timeline
            eras={eras}
            currentEraIndex={currentEraIndex}
            onEraChange={handleEraChange}
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
          />
        </motion.section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <motion.section
            className="atlas-panel p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p className="atlas-kicker">INFLUENCE INDEX</p>
            <h3 className="section-title mt-3">本幕文化强度对比</h3>
            <div className="mt-6 space-y-4">
              {currentEra.cultures.map((culture) => {
                const strength = Math.round((culture.radius / 32) * 100);

                return (
                  <button
                    key={culture.id}
                    type="button"
                    onClick={() => handleCultureSelect(culture)}
                    className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-base text-white">{culture.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{culture.location.region}</p>
                      </div>
                      <span className="text-sm text-slate-300">{strength}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-900/80">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${strength}%` }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ backgroundColor: culture.color }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="atlas-panel p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="atlas-kicker">TRANSITION NOTES</p>
            <h3 className="section-title mt-3">时代观察</h3>

            <div className="mt-6 space-y-4">
              <div className="story-card">
                <div className="story-card-header">
                  <Globe2 className="h-4 w-4 text-amber-300" />
                  区域覆盖
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  当前篇章主要分布在 {currentRegions.join('、')}，共形成{' '}
                  {currentEra.cultures.length} 个可观察的文化中心。
                </p>
              </div>

              <div className="story-card">
                <div className="story-card-header">
                  <Landmark className="h-4 w-4 text-amber-300" />
                  代表性特征
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  这一时期高频出现的文化标签包括 {signatureTags.slice(0, 4).join('、')}
                  ，显示出制度、技术与思想共同推动文明跃迁。
                </p>
              </div>

              <div className="story-card">
                <div className="story-card-header">
                  <Orbit className="h-4 w-4 text-amber-300" />
                  时间走向
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {nextEra
                    ? `如果继续推进时间轴，下一阶段将进入“${nextEra.name}”，观察重点会从当前的 ${currentEra.name} 转向新的交流机制和权力结构。`
                    : '时间线已经来到最新章节，此时更适合回看前几幕，比较文明中心的迁移与重组。'}
                </p>
              </div>
            </div>
          </motion.section>
        </section>
      </main>

      <AnimatePresence>
        {showPanel && selectedCulture && (
          <CulturePanel culture={selectedCulture} onClose={handleClosePanel} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
