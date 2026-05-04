'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { Send, Paperclip, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChatInput = () => {
  const [input, setInput] = useState('');
  const { messages, addMessage, setTyping } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    addMessage({ role: 'user', content: userMessage });
    setTyping(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/chat/query/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages.slice(-6) }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '');
              if (dataStr === '[DONE]') break;
              try {
                const data = JSON.parse(dataStr);
                assistantContent += data.text;
              } catch (e) {}
            }
          }
        }
        addMessage({ role: 'assistant', content: assistantContent });
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-t from-background via-background to-transparent">
      <div className="max-w-3xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"></div>
        <div className="relative bg-card border rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask Halo anything about LASUSTECH..."
            className="w-full bg-transparent p-4 pr-16 resize-none outline-none text-sm min-h-[56px] max-h-[200px]"
          />
          <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-t">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors">
                <Paperclip size={18} />
              </button>
              <button className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors">
                <Mic size={18} />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={cn(
                "p-2 rounded-lg transition-all",
                input.trim()
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-100"
                  : "bg-muted text-muted-foreground scale-90"
              )}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-center mt-3 text-muted-foreground font-medium uppercase tracking-widest">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};
