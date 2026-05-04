'use client';
import React from 'react';
import { CommandSearch } from '../CommandSearch';
import { User, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
        <Avatar className="h-9 w-9 cursor-pointer hover:ring-4 ring-primary/10 transition-all">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary">
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
