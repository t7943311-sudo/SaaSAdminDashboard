'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TocEntry {
  level: number;
  id: string;
  text: string;
}

export function PageTOC() {
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('main h2[id], main h3[id]')
    );

    const toc = headingElements.map(heading => ({
      level: heading.tagName === 'H2' ? 2 : 3,
      id: heading.id,
      text: heading.innerText,
    })).filter(h => h.id);
    setHeadings(toc);
  }, []);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -40% 0px',
      threshold: 1.0,
    });

    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    elements.forEach(el => el && observer.observe(el));

    return () => elements.forEach(el => el && observer.unobserve(el));
  }, [headings, handleObserver]);


  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          On this page
        </h3>
        <ul className="space-y-1 text-sm">
          {headings.map(heading => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block border-l-2 py-1 pl-4 text-muted-foreground transition-colors hover:text-foreground hover:border-muted-foreground/50',
                  heading.level === 3 && 'pl-8',
                  activeId === heading.id
                    ? 'border-primary font-medium text-primary'
                    : 'border-transparent'
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
