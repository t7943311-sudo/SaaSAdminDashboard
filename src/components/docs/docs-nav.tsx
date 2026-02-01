'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Book,
  Rocket,
  KeyRound,
  Webhook,
  AlertOctagon,
  FileCode2,
  LayoutDashboard,
  Shield,
  Palette,
  Layers
} from 'lucide-react';

const navItems = [
  {
    heading: 'Getting Started',
    items: [
        {
            label: 'Introduction',
            icon: <Book className="h-4 w-4" />,
            href: '/docs',
        },
        {
            label: 'Quickstart',
            icon: <Rocket className="h-4 w-4" />,
            href: '/docs/getting-started',
        },
    ],
  },
  {
      heading: 'Guides',
      items: [
        {
            label: 'Core Concepts',
            icon: <Layers className="h-4 w-4" />,
            href: '/docs/core-concepts',
        },
        {
            label: 'Authentication',
            icon: <KeyRound className="h-4 w-4" />,
            href: '/docs/authentication',
        },
        {
            label: 'Dashboard',
            icon: <LayoutDashboard className="h-4 w-4" />,
            href: '/docs/dashboard',
        },
        {
            label: 'Admin Panel',
            icon: <Shield className="h-4 w-4" />,
            href: '/docs/admin-panel',
        },
        {
            label: 'Theme Builder',
            icon: <Palette className="h-4 w-4" />,
            href: '/docs/theme-builder',
        },
      ]
  },
  {
      heading: 'API',
      items: [
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
      ]
  }
];


export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4 p-2">
        {navItems.map(section => (
            <div key={section.heading}>
                <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.heading}</h3>
                <div className="flex flex-col gap-1">
                    {section.items.map((item) => (
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
                </div>
            </div>
        ))}
    </nav>
  );
}
