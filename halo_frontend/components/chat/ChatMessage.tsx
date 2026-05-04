'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { User, Sparkles, FileIcon, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Attachment {
  name: string;
  type: string;
  url: string;
}

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
}

export const ChatMessage = ({ role, content, attachments }: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex w-full px-4 py-4 md:px-6 animate-in fade-in slide-in-from-bottom-2 duration-500",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex max-w-[85%] md:max-w-[75%] gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <Avatar className={cn(
          "h-8 w-8 rounded-full shrink-0 mt-1 shadow-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-emerald-500 text-white"
        )}>
          <AvatarFallback>
            {isUser ? <User size={14} /> : <Sparkles size={14} />}
          </AvatarFallback>
        </Avatar>
        
        <div className={cn(
          "flex flex-col gap-2",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-none" 
              : "bg-muted text-foreground rounded-tl-none border border-border/50"
          )}>
            <div className="prose prose-sm md:prose-base prose-invert max-w-none">
              {content}
            </div>
            
            {attachments && attachments.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {attachments.map((file, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border",
                      isUser 
                        ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground" 
                        : "bg-background/50 border-border text-foreground"
                    )}
                  >
                    {file.type.startsWith('image/') ? (
                      <div className="flex flex-col gap-1">
                        <img src={file.url} alt={file.name} className="max-w-[200px] max-h-[200px] rounded-md object-cover" />
                        <span className="truncate max-w-[150px]">{file.name}</span>
                      </div>
                    ) : (
                      <>
                        <FileIcon size={14} />
                        <span className="truncate max-w-[150px]">{file.name}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground font-medium px-1 uppercase tracking-wider">
            {isUser ? 'Sent' : 'HALO Assistant'}
          </span>
        </div>
      </div>
    </div>
  );
};
