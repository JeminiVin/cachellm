'use client';

import { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const { user } = useUser();
  const [apiKey, setApiKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Playground States
  const [prompt, setPrompt] = useState<string>('');
  const [testLoading, setTestLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<any>(null);

  const generateKey = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/keys', { method: 'POST' });
      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        data = { error: rawText };
      }

      if (!res.ok) {
        alert(`Error: ${data.error || res.statusText}`);
        return;
      }

      if (data.apiKey) {
        setApiKey(data.apiKey);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestCache = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setTestLoading(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/v1/cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey || 'test_key'}`
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setTestResult(data);
    } catch (err) {
      console.error('Test Error:', err);
      setTestResult({ error: 'Failed to connect to cache endpoint' });
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Header Bar with Clerk User & Logout Button */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}! Manage your API keys and test semantic queries.
          </p>
        </div>
        
        {/* Clerk User Avatar & Sign Out Dropdown */}
        <div className="flex items-center gap-3 bg-[#1e293b] border border-slate-800 px-4 py-2 rounded-xl">
          <span className="text-xs font-medium text-slate-300">
            {user?.primaryEmailAddress?.emailAddress || 'Account'}
          </span>
          <UserButton />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl shadow-lg">
          <p className="text-slate-400 text-sm font-medium">Total Requests</p>
          <p className="text-3xl font-bold mt-2 text-white">1,240</p>
          <span className="text-xs text-emerald-400 mt-1 block">+12% from last week</span>
        </div>
        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl shadow-lg">
          <p className="text-slate-400 text-sm font-medium">Cache Hit Rate</p>
          <p className="text-3xl font-bold mt-2 text-indigo-400">84.2%</p>
          <span className="text-xs text-indigo-300 mt-1 block">Optimized via Vector DB</span>
        </div>
        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl shadow-lg">
          <p className="text-slate-400 text-sm font-medium">Estimated Money Saved</p>
          <p className="text-3xl font-bold mt-2 text-emerald-400">$34.50</p>
          <span className="text-xs text-emerald-300 mt-1 block">OpenAI API costs saved</span>
        </div>
      </div>

      {/* API Key Generator Card */}
      <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Your API Keys</h3>
        <p className="text-slate-400 text-sm mb-4">
          Use this secret key in the Authorization header (<code className="text-indigo-300">Bearer sk_cache_...</code>).
        </p>
        <div className="flex gap-4">
          <input
            type="text"
            readOnly
            value={apiKey || 'Click "Generate Key" to create a new secure API Key'}
            className="bg-[#0f172a] border border-slate-700 px-4 py-2.5 rounded-lg w-full font-mono text-sm text-slate-300 focus:outline-none"
          />
          <button
            onClick={generateKey}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50 whitespace-nowrap shadow"
          >
            {loading ? 'Generating...' : 'Generate Key'}
          </button>
        </div>
      </div>

      {/* Testing Playground Card */}
      <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-2">🧪 Live Cache Testing Playground</h3>
        <p className="text-slate-400 text-sm mb-4">
          Type a prompt below to test semantic caching. First request will be a <b>Cache Miss</b> (Gemini LLM), and similar subsequent requests will be a <b>Cache Hit</b>!
        </p>

        <form onSubmit={handleTestCache} className="space-y-4">
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here (e.g., 'What is semantic caching?')..."
              rows={3}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={testLoading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 shadow"
          >
            {testLoading ? 'Testing Cache...' : 'Send Prompt'}
          </button>
        </form>

        {testResult && (
          <div className="mt-6 p-4 bg-[#0f172a] border border-slate-700 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-indigo-300 uppercase">
                Source: {testResult.source || 'Unknown'}
              </span>
              {testResult.similarity !== undefined && (
                <span className="text-xs text-slate-400">
                  Similarity Score: {testResult.similarity.toFixed(3)}
                </span>
              )}
            </div>
            <div className="text-sm text-slate-300 whitespace-pre-wrap mt-2 font-mono">
              {testResult.response || testResult.error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}