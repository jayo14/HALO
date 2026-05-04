'use client';
import React from 'react';
import { MessageSquare, Mail, GraduationCap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  {
    title: 'Ask a question',
    description: 'Get instant answers about LASUSTECH courses, fees, and more.',
    icon: MessageSquare,
    href: '/chat',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Draft an email',
    description: 'Create formal emails to HODs, lecturers, or the registry.',
    icon: Mail,
    href: '/email',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'Course requirements',
    description: 'Check what you need for your department or next semester.',
    icon: GraduationCap,
    href: '/knowledge',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action) => (
        <a
          key={action.title}
          href={action.href}
          className="group p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
        >
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110", action.bg, action.color)}>
            <action.icon size={24} />
          </div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            {action.title}
            <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {action.description}
          </p>
        </a>
      ))}
    </div>
  );
};
