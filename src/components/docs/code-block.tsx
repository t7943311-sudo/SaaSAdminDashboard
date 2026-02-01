'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg bg-secondary/50">
      <div className="absolute right-2 top-2 flex items-center gap-2">
        {lang && (
          <span className="text-xs font-semibold uppercase text-muted-foreground">
            {lang}
          </span>
        )}
        <Button size="icon" variant="ghost" onClick={handleCopy}>
          {hasCopied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 pt-12 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
