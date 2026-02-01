'use client';

import { cn } from '@/lib/utils';
import { Info, AlertTriangle } from 'lucide-react';

interface CalloutProps {
  variant?: 'info' | 'warning';
  children: React.ReactNode;
}

export function Callout({ variant = 'info', children }: CalloutProps) {
  const isWarning = variant === 'warning';
  return (
    <div
      className={cn(
        'my-6 flex items-start gap-4 rounded-lg border p-4',
        isWarning
          ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
          : 'border-primary/20 bg-primary/10 text-primary-foreground'
      )}
    >
      <div className="mt-1">
        {isWarning ? (
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        ) : (
          <Info className="h-5 w-5 text-primary" />
        )}
      </div>
      <div className="prose prose-sm max-w-none text-current [&_a]:text-current [&_a:hover]:text-primary [&_code]:text-current [&_strong]:text-current">
        {children}
      </div>
    </div>
  );
}
