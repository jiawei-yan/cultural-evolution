import { motion } from 'framer-motion';
import { BookOpen, Compass, Globe2, Link2 } from 'lucide-react';
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
  currentEraName: string;
  currentRange: string;
}

export function Header({ currentEraName, currentRange }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-40 border-b border-stone-200/80 bg-[rgba(248,244,236,0.88)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-slate-900 shadow-sm">
            <Globe2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl text-slate-900 sm:text-2xl">
              人类文化演化图谱
            </h1>
            <p className="hidden text-xs tracking-[0.12em] text-stone-600 sm:block">
              先选历史篇章，再看地图，最后展开细节。
            </p>
          </div>
        </div>

        <div className="hidden rounded-full border border-stone-200 bg-white px-4 py-2 text-right lg:block">
          <p className="text-xs tracking-[0.16em] text-stone-500">当前篇章</p>
          <p className="mt-1 text-sm text-slate-700">
            {currentEraName} · {currentRange}
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-stone-300 bg-white text-slate-700 hover:bg-stone-100"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">使用说明</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-xl border-stone-200 bg-[#fffaf2] text-slate-900">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 font-display text-2xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white">
                  <Compass className="h-5 w-5" />
                </span>
                怎么阅读这个页面
              </DialogTitle>
              <DialogDescription className="text-stone-600">
                页面结构已经被压缩成四个清晰步骤，先建立全局感，再逐层展开细节。
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 text-sm leading-7 text-slate-700">
              <div className="rounded-[22px] border border-stone-200 bg-white p-4">
                <p className="flex items-center gap-2 text-slate-900">
                  <span className="step-badge">1</span>
                  先点击顶部六个历史篇章中的任意一个。
                </p>
                <p className="mt-2 text-stone-600">
                  顶部导航是主入口，当前篇章的所有地图、说明与阅读链接都会同步切换。
                </p>
              </div>

              <div className="rounded-[22px] border border-stone-200 bg-white p-4">
                <p className="flex items-center gap-2 text-slate-900">
                  <span className="step-badge">2</span>
                  再点击地图圆点或下方文化节点卡片切换焦点。
                </p>
                <p className="mt-2 text-stone-600">
                  页面右侧会显示当前焦点文明的摘要，信息只保留最必要的层级。
                </p>
              </div>

              <div className="rounded-[22px] border border-stone-200 bg-white p-4">
                <p className="flex items-center gap-2 text-slate-900">
                  <span className="step-badge">3</span>
                  想继续深挖时，再打开详细资料与延伸阅读。
                </p>
                <p className="mt-2 text-stone-600">
                  详细资料会以抽屉形式展开，底部的延伸阅读链接则来自博物馆、图书馆和国际机构。
                </p>
              </div>

              <div className="rounded-[22px] border border-stone-200 bg-white p-4">
                <p className="flex items-center gap-2 text-slate-900">
                  <Link2 className="h-4 w-4 text-stone-500" />
                  链接说明
                </p>
                <p className="mt-2 text-stone-600">
                  页面中的外部链接会在新标签页打开，方便你把主界面保留在当前篇章。
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.header>
  );
}
