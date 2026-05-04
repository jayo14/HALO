'use client';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CommandSearch = () => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        document.getElementById('command-search')?.focus();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="relative group">
      <div className={cn(
        "absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground transition-colors",
        isFocused && "text-primary"
      )}>
        <Search size={16} />
      </div>
      <input
        id="command-search"
        type="text"
        placeholder="Search or ask HALO... (⌘K)"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-accent/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-lg py-2 pl-10 pr-4 text-sm transition-all outline-none"
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  );
};
