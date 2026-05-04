import { QuickActions } from '@/components/dashboard/QuickActions';
import { ChatInput } from '@/components/chat/ChatInput';
import { Sparkles } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[13px] font-medium tracking-tight shadow-sm backdrop-blur-sm">
          <Sparkles size={14} className="animate-pulse" />
          LASUSTECH Academic Assistant
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent pb-1">
            How can HALO help?
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
            Instant support for your studies, from course details to formal email drafts.
          </p>
        </div>
      </section>

      <section className="w-full max-w-3xl space-y-8">
        <ChatInput />
        <div className="pt-4">
          <QuickActions />
        </div>
      </section>

      {/* Subtle background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}
