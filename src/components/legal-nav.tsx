'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  FileText,
  Shield,
  Ban,
  Gavel,
  ShieldCheck,
  History
} from 'lucide-react';

const navItems = [
  {
    label: 'Legal Center',
    icon: <Gavel className="h-4 w-4" />,
    href: '/legal',
  },
  {
    label: 'Terms of Service',
    icon: <FileText className="h-4 w-4" />,
    href: '/legal/terms-of-service',
  },
  {
    label: 'Privacy Policy',
    icon: <Shield className="h-4 w-4" />,
    href: '/legal/privacy-policy',
  },
   {
    label: 'Acceptable Use',
    icon: <Ban className="h-4 w-4" />,
    href: '/legal/acceptable-use',
  },
   {
    label: 'Security',
    icon: <ShieldCheck className="h-4 w-4" />,
    href: '/legal/security',
  },
  {
    label: 'Changelog',
    icon: <History className="h-4 w-4" />,
    href: '/legal/changelog',
  },
];


export function LegalNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-2">
       <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legal</h3>
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
