'use client';
import React, { useState } from 'react';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardPage() {
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = (content: string) => {
    const userMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);

    // Dummy AI Response
    setTimeout(() => {
      const aiMessage = { 
        role: 'assistant', 
        content: `I've received your message: "${content}". As an AI assistant for LASUSTECH, I can help you with course details, exam schedules, and formal academic documentation. How would you like to proceed?` 
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] relative overflow-hidden">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <section className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[13px] font-medium tracking-tight shadow-sm backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              LASUSTECH Academic Assistant
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent pb-1">
                How can HALO help?
              </h1>
              <p className="text-lg text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
                Instant support for your studies, from course details to formal email drafts.
              </p>
            </div>
          </section>

          <section className="w-full max-w-3xl space-y-8">
            <ChatInput onSend={handleSend} />
            <div className="pt-4">
              <QuickActions />
            </div>
          </section>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 w-full">
            <div className="pb-32">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} role={msg.role} content={msg.content} />
              ))}
            </div>
          </ScrollArea>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background via-background to-transparent pt-20 pb-6 px-6">
            <div className="max-w-3xl mx-auto">
              <ChatInput onSend={handleSend} />
            </div>
          </div>
        </>
      )}

      {/* Subtle background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}
