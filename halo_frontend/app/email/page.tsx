'use client';
import { EmailDraftModal } from '@/components/dashboard/EmailDraftModal';

export default function EmailAssistantPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Email Assistant</h1>
        <p className="text-muted-foreground">Draft and send professional academic emails in seconds.</p>
      </div>
      <EmailDraftModal />
    </div>
  );
}
