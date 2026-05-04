'use client';
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChatStore } from '@/store/chatStore';
import { cn } from '@/lib/utils';
import { User, Sparkles } from 'lucide-react';

export const ChatWindow = () => {
  const { messages, isTyping } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-10 space-y-8 scrollbar-hide">
      <div className="max-w-3xl mx-auto space-y-8">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
              msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}>
              {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
            </div>

            <div className={cn(
              "flex flex-col gap-2 max-w-[85%]",
              msg.role === 'user' ? 'items-end' : 'items-start'
            )}>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-card border rounded-tl-none shadow-sm'
              )}>
                <ReactMarkdown className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
                  {msg.content}
                </ReactMarkdown>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider px-1">
                {msg.role === 'user' ? 'You' : 'HALO'}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 border animate-pulse">
              <Sparkles size={14} className="text-muted-foreground" />
            </div>
            <div className="bg-card border p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};
