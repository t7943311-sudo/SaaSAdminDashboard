'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Book,
  Rocket,
  KeyRound,
  Network,
  Webhook,
  AlertOctagon,
  FileCode2,
  BookCopy
} from 'lucide-react';

const navItems = [
  {
    label: 'Introduction',
    icon: <Book className="h-4 w-4" />,
    href: '/docs',
  },
  {
    label: 'Getting Started',
    icon: <Rocket className="h-4 w-4" />,
    href: '/docs/getting-started',
  },
  {
    label: 'Authentication',
    icon: <KeyRound className="h-4 w-4" />,
    href: '/docs/authentication',
  },
  {
    label: 'API Reference',
    icon: <FileCode2 className="h-4 w-4" />,
    href: '/docs/api-reference',
  },
  {
    label: 'Webhooks',
    icon: <Webhook className="h-4 w-4" />,
    href: '/docs/webhooks',
  },
  {
    label: 'Errors',
    icon: <AlertOctagon className="h-4 w-4" />,
    href: '/docs/errors',
  },
];


export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
            pathname === item.href && 'bg-muted text-foreground'
          )}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
