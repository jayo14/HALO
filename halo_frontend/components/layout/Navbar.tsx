'use client';
import React from 'react';
import { CommandSearch } from '../CommandSearch';
import { User, Bell } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-20">
      <div className="flex-1 max-w-md">
        <CommandSearch />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-accent text-muted-foreground transition-colors">
          <Bell size={20} />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary overflow-hidden cursor-pointer hover:ring-2 ring-primary/20 transition-all">
          <User size={18} />
        </div>
      </div>
    </header>
  );
};
