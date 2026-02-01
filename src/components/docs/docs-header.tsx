'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';

export function DocsHeader({ sectionTitle = "Docs" }: { sectionTitle?: string }) {
  const { user, isUserLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <h1 className="text-xl font-bold">LaunchBase</h1>
          </Link>
          <span className="hidden text-2xl text-muted-foreground/50 sm:inline">/</span>
          <Link href={sectionTitle === 'Docs' ? '/docs' : '/legal'} className="hidden text-lg font-medium text-muted-foreground hover:text-foreground sm:inline">
            {sectionTitle}
          </Link>
        </div>

        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-6 text-sm font-medium">
             <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                Docs
             </Link>
             <Link href="/docs/api-reference" className="text-muted-foreground hover:text-foreground">
                API Reference
             </Link>
             <Link href="/docs" className="text-muted-foreground hover:text-foreground opacity-50 cursor-not-allowed">
                SDKs
             </Link>
              <Link href="/docs/webhooks" className="text-muted-foreground hover:text-foreground">
                Webhooks
             </Link>
        </nav>

        <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search docs..."
                className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[280px]"
              />
            </div>
          
          {isUserLoading ? (
            <div className="h-10 w-32 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
