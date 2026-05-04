'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, Paperclip, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChatInput = ({ onSend }: { onSend: (message: string) => void }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto group">
      <div className="relative flex flex-col w-full p-2 overflow-hidden rounded-3xl border bg-card/50 backdrop-blur-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all duration-300 shadow-2xl shadow-primary/5">
        <Textarea
          placeholder="Message HALO..."
          className="min-h-[60px] max-h-[200px] w-full resize-none border-0 bg-transparent px-4 py-3 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className="flex items-center justify-between px-2 pb-1">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50">
              <Paperclip size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50">
              <Mic size={20} />
            </Button>
          </div>
          <Button 
            size="icon" 
            onClick={handleSend}
            className={cn(
              "h-9 w-9 rounded-full transition-all duration-300",
              input.trim() ? "bg-primary text-primary-foreground scale-100" : "bg-muted text-muted-foreground opacity-30 scale-90"
            )}
            disabled={!input.trim()}
          >
            <ArrowUp size={20} strokeWidth={3} />
          </Button>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground/60 tracking-wide">
        HALO is an AI assistant for LASUSTECH students. Accuracy may vary.
      </p>
    </div>
  );
};
