'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { User, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex w-full gap-4 px-4 py-8 md:px-6",
      isUser ? "bg-transparent" : "bg-muted/30 border-y border-border/50"
    )}>
      <div className="flex max-w-4xl mx-auto w-full gap-4 md:gap-6">
        <Avatar className={cn(
          "h-8 w-8 rounded-lg shrink-0",
          isUser ? "bg-primary text-primary-foreground" : "bg-emerald-500 text-white"
        )}>
          <AvatarFallback>
            {isUser ? <User size={16} /> : <Sparkles size={16} />}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2 overflow-hidden">
          <p className="font-semibold text-sm">
            {isUser ? 'You' : 'HALO'}
          </p>
          <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed text-base">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
