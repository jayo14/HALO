'use client';
import React, { useState } from 'react';
import api from '@/lib/api';

export const EmailDraftModal = () => {
  const [intent, setIntent] = useState('');
  const [role, setRole] = useState('hod');
  const [draft, setDraft] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
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
    try {
      await api.post('/api/agents/email/send/', draft);
      alert('Email sent successfully!');
      setDraft(null);
      setIntent('');
    } catch (e) {
      alert('Failed to send email');
    }
  };

  return (
    <div className="p-6 bg-card border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Email Assistant</h2>
      {!draft ? (
        <div className="space-y-4">
          <textarea
            className="w-full p-3 border rounded-lg"
            placeholder="Describe what you want to say (e.g., Requesting a meeting to discuss my project)"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="hod">HOD</option>
            <option value="lecturer">Lecturer</option>
            <option value="registry">Registry</option>
            <option value="dean">Dean</option>
          </select>
          <button
            disabled={loading}
            onClick={handleGenerate}
            className="w-full py-2 bg-primary text-primary-foreground rounded-lg"
          >
            {loading ? 'Generating...' : 'Generate Formal Email'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Subject</label>
            <input
              className="w-full p-2 border rounded-lg"
              value={draft.subject}
              onChange={(e) => setDraft({...draft, subject: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Body</label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows={8}
              value={draft.body}
              onChange={(e) => setDraft({...draft, body: e.target.value})}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setDraft(null)} className="flex-1 py-2 border rounded-lg">Back</button>
            <button onClick={handleSend} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg">Send Email</button>
          </div>
        </div>
      )}
    </div>
  );
};
