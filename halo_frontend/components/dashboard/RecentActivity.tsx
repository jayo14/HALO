'use client';
import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';

const recentChats = [
  { id: 1, title: 'MTH 101 Quiz Prep', time: '2 hours ago' },
  { id: 2, title: 'Industrial Attachment Letter', time: 'Yesterday' },
  { id: 3, title: 'Registration Deadline', time: '2 days ago' },
];

export const RecentActivity = () => {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Clock size={16} className="text-muted-foreground" />
          Recent Activity
        </h3>
        <button className="text-xs text-primary hover:underline">View all</button>
      </div>
      <div className="divide-y">
        {recentChats.map((chat) => (
          <div key={chat.id} className="p-4 hover:bg-accent/50 cursor-pointer transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <MessageSquare size={16} />
              </div>
              <span className="text-sm font-medium">{chat.title}</span>
            </div>
            <span className="text-xs text-muted-foreground">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
