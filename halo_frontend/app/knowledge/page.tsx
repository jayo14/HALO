'use client';
import React from 'react';
import { Search, Book, GraduationCap, Info, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const categories = [
  {
    title: 'Academic Catalog',
    description: 'Detailed information about LASUSTECH departments and courses.',
    icon: Book,
    count: '24 Courses',
    color: 'text-blue-500',
  },
  {
    title: 'Student Handbook',
    description: 'Rules, regulations, and student life guidelines.',
    icon: GraduationCap,
    count: '12 Chapters',
    color: 'text-purple-500',
  },
  {
    title: 'Admissions Info',
    description: 'Requirements, fees, and application processes.',
    icon: Info,
    count: '8 Sections',
    color: 'text-orange-500',
  },
  {
    title: 'Past Questions',
    description: 'A repository of past examination questions and study materials.',
    icon: FileText,
    count: '150+ Papers',
    color: 'text-emerald-500',
  },
];

export default function KnowledgeBasePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to know about your academic journey at LASUSTECH.
        </p>
        <div className="max-w-2xl mx-auto pt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input 
            placeholder="Search for articles, courses, or requirements..." 
            className="pl-10 h-12 rounded-xl border-primary/20 focus-visible:ring-primary/30"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {categories.map((cat) => (
          <Card key={cat.title} className="hover:border-primary/30 transition-all cursor-pointer group">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={cat.color + " p-3 rounded-xl bg-card border group-hover:scale-110 transition-transform"}>
                <cat.icon size={24} />
              </div>
              <div>
                <CardTitle>{cat.title}</CardTitle>
                <CardDescription>{cat.count}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
