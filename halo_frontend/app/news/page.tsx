'use client';
import React from 'react';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const newsItems = [
  {
    id: 1,
    title: '2023/2024 Academic Calendar Update',
    excerpt: 'The university senate has approved a revised calendar for the remainder of the first semester...',
    date: 'May 10, 2024',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'New Student Union Executive Election Results',
    excerpt: 'The electoral committee has officially released the results for the 2024/2025 SUG elections...',
    date: 'May 08, 2024',
    category: 'Student Life',
    image: 'https://images.unsplash.com/photo-1540910419892-f0c762060b24?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Infrastructure Upgrade: New Lecture Theater in Faculty of Science',
    excerpt: 'LASUSTECH continues its expansion with the completion of a state-of-the-art 500-seater theater...',
    date: 'May 05, 2024',
    category: 'Campus',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop',
  },
];

export default function NewsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">University News</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Stay informed about the latest happenings, announcements, and updates across LASUSTECH.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group hover:border-primary/30 transition-all">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-background/80 backdrop-blur text-foreground border-border">{item.category}</Badge>
              </div>
            </div>
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} />
                {item.date}
              </div>
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {item.excerpt}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between group/btn">
                Read full story
                <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
