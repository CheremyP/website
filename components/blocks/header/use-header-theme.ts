'use client';

import { useEffect, useState } from 'react';

/** `light` = dark lettering on light bg; `dark`/`image` = white lettering */
export type HeaderTheme = 'light' | 'dark' | 'image';

export type HeaderContrast = {
  start: HeaderTheme;
  center: HeaderTheme;
  end: HeaderTheme;
};

const PROBE_Y = 48;
const SCROLL_THRESHOLD = 8;
const MIN_INTERSECTION_RATIO = 0.05;

const DEFAULT_CONTRAST: HeaderContrast = {
  start: 'light',
  center: 'light',
  end: 'light',
};

function parseLuminance(color: string): number | null {
  const match = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/);
  if (!match) return null;

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const a = match[4] !== undefined ? Number(match[4]) : 1;
  if (a < 0.05) return null;

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function isMediaElement(el: Element): boolean {
  return (
    el instanceof HTMLImageElement ||
    el instanceof HTMLVideoElement ||
    el instanceof HTMLCanvasElement
  );
}

function contentElementAt(x: number, y: number): Element | null {
  const elements = document.elementsFromPoint(x, y);
  for (const el of elements) {
    if (!el.closest('[data-header-root]')) return el;
  }
  return null;
}

function sampleThemeAt(x: number, y: number): HeaderTheme {
  const content = contentElementAt(x, y);
  if (!content) return 'light';

  let node: Element | null = content;
  while (node && node !== document.documentElement) {
    if (isMediaElement(node)) return 'image';

    const style = getComputedStyle(node);
    if (style.backgroundImage && style.backgroundImage !== 'none') {
      return 'image';
    }

    const lum = parseLuminance(style.backgroundColor);
    if (lum !== null) {
      return lum > 0.65 ? 'light' : 'dark';
    }

    node = node.parentElement;
  }

  return 'light';
}

function themeFromSectionMode(mode: string | undefined): HeaderTheme | null {
  if (mode === 'light' || mode === 'dark' || mode === 'image') return mode;
  return null;
}

function resolveSlot(x: number, section: HTMLElement | null): HeaderTheme {
  const mode = section?.dataset.headerTheme;
  const fixed = themeFromSectionMode(mode);
  if (fixed) return fixed;
  return sampleThemeAt(x, PROBE_Y);
}

function activeSectionUnderHeader(): HTMLElement | null {
  const sections = document.querySelectorAll<HTMLElement>('[data-header-theme]');
  let best: HTMLElement | null = null;
  let bestRatio = MIN_INTERSECTION_RATIO;

  const headerZoneTop = 0;
  const headerZoneBottom = 88;
  const viewportHeight = window.innerHeight;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const zoneHeight = headerZoneBottom - headerZoneTop;
    const overlapTop = Math.max(rect.top, headerZoneTop);
    const overlapBottom = Math.min(rect.bottom, headerZoneBottom);
    const overlap = Math.max(0, overlapBottom - overlapTop);
    const ratio = overlap / zoneHeight;

    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = section;
    }

    // Fallback: section spanning header zone by document position
    if (!best && rect.top <= headerZoneBottom && rect.bottom > headerZoneTop) {
      const visibleRatio = Math.min(1, overlap / Math.min(rect.height, viewportHeight));
      if (visibleRatio > bestRatio) {
        bestRatio = visibleRatio;
        best = section;
      }
    }
  });

  return best;
}

function contrastAtProbe(): HeaderContrast {
  if (window.scrollY <= SCROLL_THRESHOLD) {
    return DEFAULT_CONTRAST;
  }

  const section = activeSectionUnderHeader();
  const w = window.innerWidth;

  return {
    start: resolveSlot(w * 0.08, section),
    center: resolveSlot(w * 0.5, section),
    end: resolveSlot(w * 0.92, section),
  };
}

export function useHeaderTheme(): { contrast: HeaderContrast; isScrolled: boolean } {
  const [contrast, setContrast] = useState<HeaderContrast>(DEFAULT_CONTRAST);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      setContrast(contrastAtProbe());
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const sections = document.querySelectorAll<HTMLElement>('[data-header-theme]');
    const observer = new IntersectionObserver(() => onScrollOrResize(), {
      root: null,
      rootMargin: '-88px 0px -55% 0px',
      threshold: [0, 0.01, 0.05, 0.1, 0.25, 0.5],
    });

    sections.forEach((section) => observer.observe(section));

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return { contrast, isScrolled };
}
