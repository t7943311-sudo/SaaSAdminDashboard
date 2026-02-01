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
  LayoutDashboard,
  Shield,
  Palette,
  Layers,
  Bot,
  CreditCard,
  UserPlus,
  ServerCrash,
  Eye,
  History
} from 'lucide-react';

const navItems = [
  {
    heading: 'Overview',
    items: [
        {
            label: 'Introduction',
            icon: <Book className="h-4 w-4" />,
            href: '/docs',
        },
        {
            label: 'Core Concepts',
            icon: <Layers className="h-4 w-4" />,
            href: '/docs/core-concepts',
        },
    ],
  },
  {
      heading: 'Getting Started',
      items: [
        {
            label: 'Quickstart',
            icon: <Rocket className="h-4 w-4" />,
            href: '/docs/getting-started',
        },
        {
            label: 'Onboarding Flow',
            icon: <UserPlus className="h-4 w-4" />,
            href: '/docs/onboarding',
        },
      ]
  },
  {
      heading: 'User Guide',
      items: [
        {
            label: 'Dashboard',
            icon: <LayoutDashboard className="h-4 w-4" />,
            href: '/docs/dashboard',
        },
        {
            label: 'Billing',
            icon: <CreditCard className="h-4 w-4" />,
            href: '/docs/billing',
        },
        {
            label: 'Admin Panel',
            icon: <Shield className="h-4 w-4" />,
            href: '/docs/admin-panel',
        },
      ]
  },
  {
      heading: 'Developer Guide',
      items: [
        {
            label: 'Authentication',
            icon: <KeyRound className="h-4 w-4" />,
            href: '/docs/authentication',
        },
        {
            label: 'AI & Genkit',
            icon: <Bot className="h-4 w-4" />,
            href: '/docs/ai-and-genkit',
        },
        {
            label: 'Theme Builder',
            icon: <Palette className="h-4 w-4" />,
            href: '/docs/theme-builder',
        },
        {
            label: 'API Reference',
            icon: <Book className="h-4 w-4" />,
            href: '/docs/api-reference',
        },
        {
            label: 'Webhooks',
            icon: <Webhook className="h-4 w-4" />,
            href: '/docs/webhooks',
        },
      ]
  },
  {
      heading: 'Reference',
      items: [
         {
            label: 'Demo Mode',
            icon: <Eye className="h-4 w-4" />,
            href: '/docs/demo-mode',
        },
        {
            label: 'Handling States',
            icon: <ServerCrash className="h-4 w-4" />,
            href: '/docs/global-states',
        },
         {
            label: 'Errors',
            icon: <AlertOctagon className="h-4 w-4" />,
            href: '/docs/errors',
        },
         {
            label: 'Changelog',
            icon: <History className="h-4 w-4" />,
            href: '/docs/changelog',
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
                                pathname === item.href && 'bg-primary/10 font-semibold text-primary'
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
