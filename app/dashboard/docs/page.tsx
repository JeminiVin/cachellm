'use client';

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">API Documentation</h1>
        <p className="text-slate-400 mt-2">Learn how to integrate CacheLLM semantic caching into your Node.js or Python applications.</p>
      </div>

      <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-white">1. Authentication</h2>
        <p className="text-slate-300 text-sm">
          All API requests must include your secret API key in the <code className="text-indigo-400 font-mono">Authorization</code> header using Bearer token authentication.
        </p>
        <pre className="p-4 bg-[#0f172a] rounded-lg font-mono text-xs text-indigo-300 overflow-x-auto">
          Authorization: Bearer sk_cache_live_your_key_here
        </pre>
      </div>

      <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-white">2. Semantic Cache Endpoint</h2>
        <p className="text-slate-300 text-sm">
          Send a POST request to <code className="text-indigo-400 font-mono">/api/v1/cache</code> with your prompt payload.
        </p>
        <pre className="p-4 bg-[#0f172a] rounded-lg font-mono text-xs text-slate-300 overflow-x-auto">
{`POST /api/v1/cache
Content-Type: application/json
Authorization: Bearer sk_cache_live_...

{
  "prompt": "What are the benefits of semantic caching?"
}`}
        </pre>
      </div>

      <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-white">3. Response Structure</h2>
        <p className="text-slate-300 text-sm">
          The API returns the response source (<code className="text-emerald-400 font-mono">cache</code> or <code className="text-amber-400 font-mono">gemini_llm</code>), vector similarity score, and the generated content.
        </p>
        <pre className="p-4 bg-[#0f172a] rounded-lg font-mono text-xs text-slate-300 overflow-x-auto">
{`{
  "source": "cache",
  "similarity": 0.988,
  "time": "11ms",
  "cost": "$0.00",
  "response": "Semantic caching matches query intents using vector proximity search..."
}`}
        </pre>
      </div>
    </div>
  );
}