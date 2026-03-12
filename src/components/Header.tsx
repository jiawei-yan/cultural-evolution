import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Compass,
  Globe2,
  Languages,
  Link2,
  MoonStar,
  SunMedium,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Locale } from '@/data/cultures';
import type { SiteCopy } from '@/data/siteContent';

interface HeaderProps {
  copy: SiteCopy['header'];
  theme: 'light' | 'dark';
  locale: Locale;
  currentEraName: string;
  currentEraAltName: string;
  currentRange: string;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onLocaleChange: (locale: Locale) => void;
}

export function Header({
  copy,
  theme,
  locale,
  currentEraName,
  currentEraAltName,
  currentRange,
  onThemeChange,
  onLocaleChange,
}: HeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return undefined;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--sticky-header-height',
        `${node.offsetHeight}px`,
      );
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    observer.observe(node);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="header-shell"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="brand-mark">
              <Globe2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate font-display text-xl site-heading sm:text-2xl">
                {copy.title}
              </h1>
              <p className="hidden text-xs tracking-[0.12em] site-subtle sm:block">
                {copy.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <div className="current-pill">
              <p className="text-xs tracking-[0.16em] site-subtle">{copy.currentChapter}</p>
              <p className="mt-1 text-sm site-heading">
                {currentEraName} · {currentRange}
              </p>
              <p className="mt-1 text-xs tracking-[0.14em] site-subtle">
                {currentEraAltName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="preference-panel">
                <span className="preference-label">
                  <SunMedium className="h-4 w-4" />
                  {copy.themeLabel}
                </span>
                <div className="preference-toggle" role="group" aria-label={copy.themeLabel}>
                  <button
                    type="button"
                    onClick={() => onThemeChange('light')}
                    className={cn(
                      'preference-button',
                      theme === 'light' && 'preference-button-active',
                    )}
                  >
                    {copy.lightTheme}
                  </button>
                  <button
                    type="button"
                    onClick={() => onThemeChange('dark')}
                    className={cn(
                      'preference-button',
                      theme === 'dark' && 'preference-button-active',
                    )}
                  >
                    <MoonStar className="h-4 w-4" />
                    {copy.darkTheme}
                  </button>
                </div>
              </div>

              <div className="preference-panel">
                <span className="preference-label">
                  <Languages className="h-4 w-4" />
                  {copy.languageLabel}
                </span>
                <div className="preference-toggle" role="group" aria-label={copy.languageLabel}>
                  <button
                    type="button"
                    onClick={() => onLocaleChange('zh')}
                    className={cn(
                      'preference-button',
                      locale === 'zh' && 'preference-button-active',
                    )}
                  >
                    {copy.chinese}
                  </button>
                  <button
                    type="button"
                    onClick={() => onLocaleChange('en')}
                    className={cn(
                      'preference-button',
                      locale === 'en' && 'preference-button-active',
                    )}
                  >
                    {copy.english}
                  </button>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="secondary-button rounded-full px-4"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{copy.helpButton}</span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="help-dialog max-w-xl rounded-[28px] p-6">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 font-display text-2xl site-heading">
                      <span className="dialog-icon">
                        <Compass className="h-5 w-5" />
                      </span>
                      {copy.dialogTitle}
                    </DialogTitle>
                    <DialogDescription className="site-muted">
                      {copy.dialogDescription}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 text-sm leading-7">
                    {copy.steps.map((step, index) => (
                      <div key={step.title} className="dialog-card">
                        <p className="flex items-center gap-2 site-heading">
                          <span className="step-badge">{index + 1}</span>
                          {step.title}
                        </p>
                        <p className="mt-2 site-muted">{step.description}</p>
                      </div>
                    ))}

                    <div className="dialog-card">
                      <p className="flex items-center gap-2 site-heading">
                        <Link2 className="h-4 w-4 site-subtle" />
                        {copy.linksTitle}
                      </p>
                      <p className="mt-2 site-muted">{copy.linksDescription}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
