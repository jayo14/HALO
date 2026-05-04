'use client';
import React from 'react';
import { MessageSquare, Mail, GraduationCap, ArrowRight, BookOpen, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  {
    title: 'Course requirements',
    icon: GraduationCap,
    href: '/knowledge',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    title: 'Draft academic email',
    icon: Mail,
    href: '/email',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'Exam timetable',
    icon: BookOpen,
    href: '/calendar',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'GPA Calculator',
    icon: Calculator,
    href: '/tools',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
];

export const QuickActions = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {actions.map((action) => (
        <a
          key={action.title}
          href={action.href}
          className="group flex items-center gap-3 px-4 py-3 rounded-2xl border bg-card/50 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
        >
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110", action.bg, action.color)}>
            <action.icon size={18} />
          </div>
          <span className="text-sm font-medium">{action.title}</span>
        </a>
      ))}
    </div>
  );
};
