'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, Paperclip, Mic, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface Attachment {
  name: string;
  type: string;
  url: string;
  file: File;
}

export const ChatInput = ({ onSend }: { onSend: (message: string, attachments?: any[]) => void }) => {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim() && attachments.length === 0) return;
    onSend(input, attachments.map(a => ({ name: a.name, type: a.type, url: a.url })));
    setInput('');
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    files.forEach(file => {
      if (file.size > maxSizeBytes) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      const url = URL.createObjectURL(file);
      setAttachments(prev => [...prev, { name: file.name, type: file.type, url, file }]);
    });
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const newArr = [...prev];
      URL.revokeObjectURL(newArr[index].url);
      newArr.splice(index, 1);
      return newArr;
    });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto group">
      {/* Attachment Previews */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 px-4 animate-in slide-in-from-bottom-2 duration-300">
          {attachments.map((file, idx) => (
            <div key={idx} className="relative group/item">
              <div className="flex items-center gap-2 p-2 bg-muted/80 backdrop-blur rounded-xl border border-border/50 text-xs max-w-[150px] truncate shadow-sm">
                <Paperclip size={12} className="shrink-0 text-primary" />
                <span className="truncate">{file.name}</span>
              </div>
              <button 
                onClick={() => removeAttachment(idx)}
                className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5 shadow-md opacity-0 group-hover/item:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

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
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
              multiple
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => fileInputRef.current?.click()}
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50"
            >
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
              (input.trim() || attachments.length > 0) ? "bg-primary text-primary-foreground scale-100" : "bg-muted text-muted-foreground opacity-30 scale-90"
            )}
            disabled={!input.trim() && attachments.length === 0}
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
