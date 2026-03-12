import { motion } from 'framer-motion';
import { BookOpen, Compass, Globe2, Layers3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface HeaderProps {
  currentChapter: number;
  totalChapters: number;
  currentEraName: string;
  currentRange: string;
  currentCultureCount: number;
}

export function Header({
  currentChapter,
  totalChapters,
  currentEraName,
  currentRange,
  currentCultureCount,
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/25 bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_0_40px_rgba(251,191,36,0.18)]"
          >
            <Globe2 className="h-5 w-5 text-slate-950" />
          </motion.div>

          <div className="min-w-0">
            <h1 className="truncate font-display text-xl text-white sm:text-2xl">
              人类文化演化图谱
            </h1>
            <p className="hidden text-xs tracking-[0.16em] text-slate-400 sm:block">
              HISTORICAL FLOWS, REGIONAL CENTERS, CIVILIZATIONAL CHANGE
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <span className="atlas-chip">
            第 {currentChapter} / {totalChapters} 幕
          </span>
          <span className="atlas-chip atlas-chip-muted">{currentEraName}</span>
          <span className="atlas-chip atlas-chip-warm">{currentCultureCount} 个节点</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-right sm:block">
            <p className="text-xs tracking-[0.16em] text-slate-500">CURRENT RANGE</p>
            <p className="mt-1 text-sm text-slate-200">{currentRange}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 text-slate-200 hover:bg-white/[0.08] hover:text-white"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">导览</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl border-white/10 bg-slate-950/95 text-white backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 font-display text-2xl text-white">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-slate-950">
                    <Compass className="h-5 w-5" />
                  </span>
                  人类文化演化图谱
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  一个把时间轴、空间分布和文明节点放在同一视图里的交互式历史界面。
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 text-sm leading-7 text-slate-300 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-2 text-white">
                    <Layers3 className="h-4 w-4 text-amber-300" />
                    如何阅读
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li>拖动时间轴或点击阶段卡片，切换不同历史篇章。</li>
                    <li>点击地图热点或右侧文明卡片，展开详细信息面板。</li>
                    <li>比较“主要特征”和“历史影响”，观察文明演化逻辑。</li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    当前页面包含
                  </div>
                  <ul className="mt-4 space-y-2">
                    <li>六个历史篇章的时序切换。</li>
                    <li>{currentCultureCount} 个当前可交互文化中心。</li>
                    <li>地图热区、强度对比、过渡观察和详情抽屉。</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.header>
  );
}
