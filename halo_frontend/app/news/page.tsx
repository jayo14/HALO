import React, { useEffect, useState } from 'react';
import { Calendar, Tag, ChevronRight, Newspaper } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/news/')
      .then(data => {
        setNewsItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch news:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto text-center py-20">
        <p className="text-muted-foreground animate-pulse">Loading university news...</p>
      </div>
    );
  }
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
            <div className="aspect-video relative overflow-hidden bg-muted">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                   <Newspaper size={48} opacity={0.2} />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <Badge className="bg-background/80 backdrop-blur text-foreground border-border">{item.category}</Badge>
              </div>
            </div>
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} />
                {new Date(item.published_at).toLocaleDateString()}
              </div>
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {item.body}
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
