'use client';
import React from 'react';
import { CommandSearch } from '../CommandSearch';
import { User, Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { navItems } from '@/lib/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="h-16 border-b px-6 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-20">
      <div className="flex items-center gap-4 flex-1">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md hover:bg-accent md:hidden">
              <Menu size={20} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="p-6 border-b text-left">
              <SheetTitle className="text-primary font-bold text-xl">HALO</SheetTitle>
            </SheetHeader>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-1 max-w-md hidden sm:block">
          <CommandSearch />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-accent text-muted-foreground transition-colors hidden sm:flex">
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
