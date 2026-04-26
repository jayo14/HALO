'use client';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatInput } from '@/components/chat/ChatInput';

export default function ChatPage() {
  return (
    <main className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="p-4 border-b flex justify-between items-center bg-background sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-primary">HALO</h1>
          <p className="text-xs text-muted-foreground">LASUSTECH AI Assistant</p>
        </div>
      </header>
      <ChatWindow />
      <ChatInput />
    </main>
  );
}
