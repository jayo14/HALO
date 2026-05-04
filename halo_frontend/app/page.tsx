import React from 'react';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Sparkles } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={12} />
          Your Academic Assistant
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Good morning. <br />
          <span className="text-muted-foreground">How can HALO help with your LASUSTECH studies today?</span>
        </h1>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-widest text-xs">Quick Actions</h2>
        <QuickActions />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-widest text-xs">Recent Conversations</h2>
          <RecentActivity />
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-muted-foreground uppercase tracking-widest text-xs">University Updates</h2>
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-primary uppercase">Academic Calendar</span>
              <p className="text-sm font-medium leading-snug">First semester examination begins June 10th, 2024.</p>
            </div>
            <div className="h-px bg-border" />
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-orange-500 uppercase">Alert</span>
              <p className="text-sm font-medium leading-snug">Hostel portal closes this Friday at 11:59 PM.</p>
            </div>
            <button className="w-full py-2 rounded-md bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/80 transition-colors">
              Read all news
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
