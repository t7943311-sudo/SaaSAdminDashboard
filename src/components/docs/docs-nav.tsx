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
  Eye
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
      heading: 'Core Features',
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
            label: 'Onboarding Flow',
            icon: <UserPlus className="h-4 w-4" />,
            href: '/docs/onboarding',
        },
        {
            label: 'Dashboard Guide',
            icon: <LayoutDashboard className="h-4 w-4" />,
            href: '/docs/dashboard',
        },
        {
            label: 'Admin Panel',
            icon: <Shield className="h-4 w-4" />,
            href: '/docs/admin-panel',
        },
        {
            label: 'Billing & Subscriptions',
            icon: <CreditCard className="h-4 w-4" />,
            href: '/docs/billing',
        },
        {
            label: 'AI & Genkit',
            icon: <Bot className="h-4 w-4" />,
            href: '/docs/ai-and-genkit',
        },
      ]
  },
  {
    heading: 'Customization',
    items: [
        {
            label: 'Theme Builder',
            icon: <Palette className="h-4 w-4" />,
            href: '/docs/theme-builder',
        },
        {
            label: 'Demo Mode',
            icon: <Eye className="h-4 w-4" />,
            href: '/docs/demo-mode',
        },
        {
            label: 'Global States',
            icon: <ServerCrash className="h-4 w-4" />,
            href: '/docs/global-states',
        },
    ]
  },
  {
      heading: 'API & Webhooks',
      items: [
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
