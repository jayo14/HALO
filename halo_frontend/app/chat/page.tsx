'use client';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatInput } from '@/components/chat/ChatInput';
import { Sparkles, History, Pin } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar for Chat - Internal */}
      <aside className="w-64 border-r bg-muted/20 hidden xl:flex flex-col">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <History size={16} className="text-muted-foreground" />
            History
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="p-3 rounded-lg bg-card border shadow-sm cursor-pointer hover:border-primary/50 transition-all">
            <p className="text-xs font-medium truncate">MTH 101 Quiz Prep</p>
            <span className="text-[10px] text-muted-foreground">2 hours ago</span>
          </div>
          <div className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-all">
            <p className="text-xs font-medium truncate">Industrial Attachment Letter</p>
            <span className="text-[10px] text-muted-foreground">Yesterday</span>
          </div>
        </div>
        <div className="p-6 border-t">
          <h2 className="font-semibold text-sm flex items-center gap-2 mb-4">
            <Pin size={16} className="text-muted-foreground" />
            Pinned Topics
          </h2>
          <div className="space-y-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
              Physics 101
            </span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        <header className="px-6 py-4 border-b flex items-center justify-between bg-background/80 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none">New Conversation</h1>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1">Chatting with HALO v1.2</p>
            </div>
          </div>
        </header>

        <ChatWindow />
        <ChatInput />
      </main>
    </div>
  );
}
