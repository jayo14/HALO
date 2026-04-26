'use client';
import React, { useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import api from '@/lib/api';

export const ChatInput = () => {
  const [input, setInput] = useState('');
  const { messages, addMessage, setTyping } = useChatStore();

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
                // For a true streaming feel, we'd update the last message in store
                // but for simplicity in this draft, we'll append at end or use a local state
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
    <div className="p-4 border-t bg-background">
      <div className="flex gap-2">
        <textarea
          className="flex-1 p-2 border rounded-md resize-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Ask Halo anything about LASUSTECH..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md self-end"
        >
          Send
        </button>
      </div>
    </div>
  );
};
