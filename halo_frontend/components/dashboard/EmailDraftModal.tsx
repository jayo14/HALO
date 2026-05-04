'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
import { Mail, Send, ChevronLeft, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const EmailDraftModal = () => {
  const [intent, setIntent] = useState('');
  const [role, setRole] = useState('hod');
  const [draft, setDraft] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleGenerate = async () => {
    if (!intent.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/api/agents/email/draft/', { intent, recipient_role: role });
      setDraft(res.data);
    } catch (e) {
      alert('Failed to generate draft');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    try {
      await api.post('/api/agents/email/send/', draft);
      alert('Email sent successfully!');
      setDraft(null);
      setIntent('');
    } catch (e) {
      alert('Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-card border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      <header className="px-6 py-4 border-b bg-muted/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
          <Mail size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight">Email Assistant</h2>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Formal Academic Correspondence</p>
        </div>
      </header>

      <div className="p-8">
        {!draft ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Your Intent</label>
              <textarea
                className="w-full p-4 bg-muted/50 border rounded-xl focus:border-primary/50 focus:bg-background transition-all outline-none text-sm resize-none"
                rows={4}
                placeholder="Describe what you want to say (e.g., Requesting a meeting to discuss my project)"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Recipient Role</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['hod', 'lecturer', 'registry', 'dean'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "py-2 px-3 rounded-lg border text-xs font-medium uppercase tracking-wider transition-all",
                      role === r
                        ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-card hover:bg-accent text-muted-foreground"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading || !intent.trim()}
              onClick={handleGenerate}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:grayscale"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Formal Email
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Subject Line</label>
              <input
                className="w-full p-3 bg-muted/50 border rounded-lg focus:border-primary/50 focus:bg-background transition-all outline-none text-sm font-medium"
                value={draft.subject}
                onChange={(e) => setDraft({...draft, subject: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email Body</label>
              <textarea
                className="w-full p-4 bg-muted/50 border rounded-xl focus:border-primary/50 focus:bg-background transition-all outline-none text-sm leading-relaxed min-h-[300px] resize-none"
                value={draft.body}
                onChange={(e) => setDraft({...draft, body: e.target.value})}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setDraft(null)}
                className="flex-1 py-3 border rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all"
              >
                <ChevronLeft size={18} />
                Back
              </button>
              <button
                onClick={handleSend}
                disabled={isSending}
                className="flex-[2] py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                Send Email
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="px-8 py-4 bg-muted/20 border-t flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground font-medium">Powered by HALO Academic Agent</p>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Verified Student Session</p>
      </footer>
    </div>
  );
};
