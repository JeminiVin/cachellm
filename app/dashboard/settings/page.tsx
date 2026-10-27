'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [apiKeyName, setApiKeyName] = useState('Default API Key');
  const [keysList, setKeysList] = useState([
    { id: 1, name: 'Default API Key', key: 'sk_cache_************************492a', created: '2026-10-27' }
  ]);
  const [isRevoked, setIsRevoked] = useState(false);

  const handleRevoke = (id: number) => {
    setKeysList(keysList.filter((k) => k.id !== id));
    setIsRevoked(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Account & API Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your account preferences, security keys, and integration settings.
        </p>
      </div>

      {/* API Key Security Section */}
      <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl shadow-lg space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white">API Key Management</h3>
          <p className="text-slate-400 text-sm">
            Active keys authorized to send caching and embedding queries to your CacheLLM backend.
          </p>
        </div>

        {isRevoked && (
          <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-sm rounded-lg">
            API Key successfully revoked.
          </div>
        )}

        <div className="divide-y divide-slate-800">
          {keysList.length > 0 ? (
            keysList.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">{item.name}</p>
                  <p className="text-xs font-mono text-slate-400 mt-1">{item.key}</p>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Created on {item.created}</span>
                </div>
                <button
                  onClick={() => handleRevoke(item.id)}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/50 text-red-400 border border-red-900 text-xs font-medium rounded-lg transition"
                >
                  Revoke Key
                </button>
              </div>
            ))
          ) : (
            <p className="py-4 text-sm text-slate-500">No active API keys found. Generate one from the dashboard.</p>
          )}
        </div>
      </div>

      {/* General Preferences Section */}
      <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-white">Cache Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0" />
            Enable automatic fallback to Gemini LLM on cache miss
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" defaultChecked className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0" />
            Store query embeddings in Upstash Vector automatically
          </label>
        </div>
      </div>
    </div>
  );
}