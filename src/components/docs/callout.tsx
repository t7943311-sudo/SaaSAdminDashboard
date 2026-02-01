'use client';

import { cn } from '@/lib/utils';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface CalloutProps {
  variant?: 'info' | 'warning' | 'success' | 'destructive';
  children: React.ReactNode;
}

export function Callout({ variant = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      container: 'border-primary/20 bg-primary/10 text-foreground/90',
      icon: <Info className="h-5 w-5 text-primary" />,
    },
    warning: {
      container: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    },
    success: {
      container: 'border-green-500/30 bg-green-500/10 text-green-300',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    destructive: {
      container: 'border-red-500/30 bg-red-500/10 text-red-300',
      icon: <XCircle className="h-5 w-5 text-red-500" />,
    }
  };

  const selectedStyle = styles[variant];

  return (
    <div
      className={cn(
        'not-prose my-6 flex items-start gap-4 rounded-lg border p-4',
        selectedStyle.container
      )}
    >
      <div className="mt-1">
        {selectedStyle.icon}
      </div>
      <div className="prose prose-sm max-w-none text-current [&_a]:text-current [&_a:hover]:text-primary [&_code]:text-current [&_strong]:text-current">
        {children}
      </div>
    </div>
  );
}
