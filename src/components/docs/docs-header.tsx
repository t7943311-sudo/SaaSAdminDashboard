'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';

export function DocsHeader() {
  const { user, isUserLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <h1 className="text-xl font-bold">LaunchBase</h1>
          </Link>
          <span className="text-2xl text-muted-foreground/50">/</span>
          <span className="text-lg font-medium text-muted-foreground">
            Docs
          </span>
        </div>

        <div className="relative hidden flex-1 md:grow-0 md:flex items-center gap-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search docs..."
            className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
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
