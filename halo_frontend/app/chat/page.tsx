'use client';
import React from 'react';
import { History, Search, MessageSquare, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const historyItems = [
  {
    id: 1,
    title: 'MTH 101 Quiz Preparation',
    snippet: 'The derivative of a constant is always zero...',
    date: '2 hours ago',
    messages: 14,
  },
  {
    id: 2,
    title: 'Industrial Attachment Application',
    snippet: 'To the Human Resources Manager, I am writing to...',
    date: 'Yesterday',
    messages: 6,
  },
  {
    id: 3,
    title: 'GNS 201 Term Paper Outline',
    snippet: '1. Introduction to Digital Citizenship in Nigeria...',
    date: 'May 02, 2024',
    messages: 22,
  },
  {
    id: 4,
    title: 'Course Registration Issues',
    snippet: 'How do I resolve the "Unit Overload" error on the portal?',
    date: 'April 28, 2024',
    messages: 3,
  },
];

export default function ChatHistoryPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <History className="text-primary" size={28} />
            Chat History
          </h1>
          <p className="text-muted-foreground">Access and manage your previous conversations with HALO.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search history..." className="pl-10 h-10 rounded-lg bg-card/50" />
        </div>
      </section>

      <div className="space-y-4 pb-12">
        {historyItems.map((item) => (
          <Card key={item.id} className="hover:border-primary/30 transition-all cursor-pointer group bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <MessageSquare size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{item.snippet}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-medium">{item.date}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{item.messages} messages</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {historyItems.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <History size={32} />
            </div>
            <p className="text-muted-foreground font-medium">No conversation history yet.</p>
            <Link href="/">
              <Button variant="outline">Start your first chat</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
