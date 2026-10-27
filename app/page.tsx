'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'js' | 'python'>('js');
  const [prompt, setPrompt] = useState('What are the key benefits of semantic caching?');
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [result, setResult] = useState<{
    source: string;
    time: string;
    cost: string;
    response: string;
    similarity: number;
  } | null>({
    source: '⚡ Cache Hit',
    time: '11ms',
    cost: '$0.00',
    similarity: 0.988,
    response:
      'Semantic caching matches query intents using vector proximity search. Rephrased or identical prompts fetch cached answers in milliseconds without hitting expensive external LLM APIs.',
  });

  const [monthlyQueries, setMonthlyQueries] = useState<number>(50000);
  const estimatedSavings = Math.round(monthlyQueries * 0.002 * 0.92);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const sampleQueries = [
    'What are the key benefits of semantic caching?',
    'How does vector similarity work?',
    'Explain LLM cost optimization strategies'
  ];

  const handleSimulate = (queryText?: string) => {
    const targetPrompt = queryText || prompt;
    if (!targetPrompt.trim()) return;
    if (queryText) setPrompt(queryText);
    
    setLoading(true);

    setTimeout(() => {
      const isHit = Math.random() > 0.15;
      const simScore = isHit
        ? parseFloat((0.95 + Math.random() * 0.04).toFixed(3))
        : parseFloat((0.42 + Math.random() * 0.3).toFixed(3));

      setResult({
        source: isHit ? '⚡ Cache Hit (Vector Proximity Match)' : '🤖 LLM Miss (Gemini API Fallback)',
        time: isHit ? '11ms' : '760ms',
        cost: isHit ? '$0.00' : '$0.0021',
        similarity: simScore,
        response: isHit
          ? `[Vector Match ${(simScore * 100).toFixed(1)}%] Instant cached response retrieved from Upstash Vector storage layer with zero external API penalty.`
          : `Fresh Gemini LLM query executed. Output stored locally with embeddings via @xenova/transformers for future queries.`,
      });
      setLoading(false);
    }, 450);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#030712] text-slate-100' : 'bg-[#fcfdff] text-slate-900'} flex flex-col justify-between selection:bg-indigo-600 selection:text-white font-sans overflow-x-hidden relative`}>
      <style jsx global>{`
        @keyframes blobMove1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(150px, 120px) scale(1.2) rotate(120deg); }
          66% { transform: translate(-120px, 80px) scale(0.9) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        @keyframes blobMove2 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(-160px, -140px) scale(1.25) rotate(-120deg); }
          66% { transform: translate(130px, -90px) scale(0.95) rotate(-240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(-360deg); }
        }
        @keyframes shimmerSlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-blob-1 { animation: blobMove1 8s ease-in-out infinite alternate; }
        .animate-blob-2 { animation: blobMove2 10s ease-in-out infinite alternate; }
        .animate-shimmer-text {
          background-size: 200% auto;
          animation: shimmerSlow 4s linear infinite;
        }
      `}</style>

      {/* Animated Background Blobs */}
      <div className={`absolute top-[-5%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] ${isDarkMode ? 'bg-gradient-to-tr from-indigo-900/30 via-purple-900/30 to-pink-900/30' : 'bg-gradient-to-tr from-indigo-400/50 via-purple-400/50 to-pink-400/50'} blur-[130px] rounded-full pointer-events-none animate-blob-1`} />
      <div className={`absolute top-[20%] left-[-10%] w-[700px] h-[700px] ${isDarkMode ? 'bg-cyan-900/20' : 'bg-cyan-400/40'} blur-[140px] rounded-full pointer-events-none animate-blob-2`} />
      
      {/* Navigation - Fully Responsive */}
      <header className={`max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center gap-3 relative z-20 border-b ${isDarkMode ? 'border-slate-800/80 bg-slate-950/70' : 'border-slate-200/60 bg-white/70'} backdrop-blur-2xl sticky top-0 shadow-xs transition-colors duration-500`}>
        <div className="flex items-center gap-2.5 text-lg font-bold tracking-wider">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/40 text-white text-lg sm:text-xl">
            ⚡
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight">
            Cache<span className="text-indigo-500">LLM</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border text-xs sm:text-sm transition ${isDarkMode ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
            title="Toggle Cinematic Theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <Link href="/sign-in" className={`text-xs sm:text-sm font-semibold transition px-2 py-1.5 ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
            Sign In
          </Link>
          <Link href="/dashboard" className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all">
            Dashboard →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center space-y-8 sm:space-y-12 flex-1 flex flex-col justify-center items-center relative z-20 w-full">
        
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs font-semibold shadow-lg backdrop-blur-md ${isDarkMode ? 'bg-slate-900/90 border-indigo-500/30 text-indigo-300' : 'bg-white/95 border-indigo-200 text-indigo-700'}`}>
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
          <span>v1.0 Production Release</span> — Enterprise AI Caching
        </div>

        <h1 className={`text-3xl sm:text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.15] sm:leading-[1.08] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Cut LLM API Costs by 95% With <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 animate-shimmer-text">
            Semantic Intelligence
          </span>
        </h1>

        <p className={`text-sm sm:text-lg md:text-xl max-w-2xl leading-relaxed font-normal px-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Stop paying twice for identical queries. CacheLLM matches semantic intent locally and serves instant responses before reaching paid LLM providers.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-md justify-center px-4">
          <Link href="/dashboard" className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-semibold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm">
            Launch Dashboard 🚀
          </Link>
          <Link href="/dashboard/docs" className={`w-full sm:w-auto px-7 py-3.5 border font-semibold rounded-2xl transition-all shadow-sm flex items-center justify-center text-sm ${isDarkMode ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white/90 border-slate-300 text-slate-800 hover:bg-white'}`}>
            API Docs
          </Link>
        </div>

        {/* Providers Banner */}
        <div className={`w-full max-w-4xl py-5 border-y my-2 transition-colors px-2 ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200/60 text-slate-600'}`}>
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3">Seamlessly Integrated With Your Favorite AI Stacks</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 font-bold text-xs sm:text-sm">
            <span>✨ OpenAI GPT-4</span>
            <span>🔮 Google Gemini</span>
            <span>⚡ Anthropic Claude</span>
            <span>🔗 LangChain</span>
            <span>🚀 Upstash</span>
          </div>
        </div>

        {/* Live Simulator Widget */}
        <div className={`w-full max-w-3xl border rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 backdrop-blur-2xl text-left relative overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/95 border-indigo-100'}`}>
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />
          
          <div className="flex items-center justify-between mb-4">
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5 ${isDarkMode ? 'bg-indigo-950/60 border-indigo-800 text-indigo-300' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" /> Live Simulator
            </span>
            <span className={`text-[10px] sm:text-xs font-mono ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Upstash + Gemini</span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSimulate(); }} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type a query to simulate..."
                className={`flex-1 border rounded-xl sm:rounded-2xl px-3.5 py-3 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition font-medium ${isDarkMode ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800'}`}
              />
              <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold shadow-lg transition disabled:opacity-50 whitespace-nowrap">
                {loading ? 'Analyzing...' : 'Simulate ⚡'}
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[11px] sm:text-xs">
            <span className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-medium`}>Try:</span>
            {sampleQueries.map((q, idx) => (
              <button key={idx} onClick={() => handleSimulate(q)} className={`px-2 py-1 rounded-lg border transition truncate max-w-[200px] sm:max-w-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
                {q}
              </button>
            ))}
          </div>

          {result && (
            <div className="mt-4 p-4 sm:p-5 bg-slate-950 rounded-xl sm:rounded-2xl text-slate-100 space-y-3 shadow-2xl border border-slate-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/80 pb-3">
                <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-wide px-2.5 py-1 rounded-md ${result.source.includes('Hit') ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                  {result.source}
                </span>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="text-slate-300">⏱️ <strong className="text-white">{result.time}</strong></span>
                  <span className="text-emerald-400">💰 <strong className="text-emerald-300">{result.cost}</strong></span>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed pt-1">
                {result.response}
              </p>
            </div>
          )}
        </div>

        {/* SECTION: Latency Benchmark */}
        <div className={`w-full max-w-3xl border rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl text-left space-y-3 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200/80'}`}>
          <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span>⚡ Response Speed Benchmark</span>
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className={`flex justify-between mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Direct LLM API</span>
                <span>~850 ms</span>
              </div>
              <div className={`w-full rounded-full h-2.5 overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div className="bg-slate-500 h-full w-[85%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold text-indigo-400 mb-1">
                <span>CacheLLM Hit</span>
                <span className="text-emerald-400">11 ms (98% faster)</span>
              </div>
              <div className={`w-full rounded-full h-2.5 overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[3%]" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: ROI Calculator */}
        <div className={`w-full max-w-4xl border rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 backdrop-blur-xl text-left my-6 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-indigo-100'}`}>
          <div className="text-center space-y-2 mb-6">
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${isDarkMode ? 'bg-indigo-950/60 border-indigo-800 text-indigo-300' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
              Interactive ROI Calculator
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>See How Much You Will Save</h2>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Drag the slider to estimate your monthly query volume.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Monthly Queries:</span>
                  <span className="text-indigo-400 font-mono font-bold">{monthlyQueries.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={monthlyQueries}
                  onChange={(e) => setMonthlyQueries(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
              <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                * Based on standard GPT-4 / Gemini pricing with 70% cache hit ratio.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-900/50 p-5 rounded-2xl text-white text-center shadow-xl space-y-2">
              <p className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest">Estimated Monthly Savings</p>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">${estimatedSavings.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Saved on provider API bills every month!</p>
            </div>
          </div>
        </div>

        {/* SECTION: How It Works */}
        <div className="w-full max-w-5xl py-6 text-center space-y-6">
          <h2 className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>How CacheLLM Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className={`p-5 border rounded-2xl shadow-sm ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xl font-black text-indigo-400">01</span>
              <h3 className={`font-bold text-base mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Intercept Request</h3>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Routes prompts through CacheLLM gateway before hitting LLMs.</p>
            </div>
            <div className={`p-5 border rounded-2xl shadow-sm ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xl font-black text-purple-400">02</span>
              <h3 className={`font-bold text-base mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Local Embedding Check</h3>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Embeddings generated locally & queried via Upstash Vector.</p>
            </div>
            <div className={`p-5 border rounded-2xl shadow-sm ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xl font-black text-pink-400">03</span>
              <h3 className={`font-bold text-base mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Instant Hit or Fallback</h3>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Returns cached response in 11ms or fetches fresh data.</p>
            </div>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl text-left overflow-hidden">
          <div className="bg-slate-900 px-4 sm:px-6 py-3 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveTab('js')} className={`text-[11px] sm:text-xs font-mono px-2.5 py-1 rounded-md transition ${activeTab === 'js' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'}`}>
                Node.js
              </button>
              <button onClick={() => setActiveTab('python')} className={`text-[11px] sm:text-xs font-mono px-2.5 py-1 rounded-md transition ${activeTab === 'python' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'}`}>
                Python
              </button>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400">POST /api/v1/cache</span>
          </div>

          <pre className="p-4 sm:p-6 font-mono text-[11px] sm:text-xs text-slate-300 overflow-x-auto leading-relaxed">
            {activeTab === 'js'
              ? `const res = await fetch('https://your-domain.vercel.app/api/v1/cache', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk_cache_live_your_key'
  },
  body: JSON.stringify({ prompt: 'Explain semantic caching' })
});
const data = await res.json();`
              : `import requests

url = "https://your-domain.vercel.app/api/v1/cache"
headers = {"Authorization": "Bearer sk_cache_live_your_key"}
payload = {"prompt": "Explain semantic caching"}

response = requests.post(url, json=payload, headers=headers).json()`}
          </pre>
        </div>

        {/* SECTION: Wall of Love */}
        <div className="w-full max-w-5xl py-8 space-y-4 text-left">
          <div className="text-center space-y-1">
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${isDarkMode ? 'bg-indigo-950/60 border-indigo-800 text-indigo-300' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
              Wall of Love
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Loved by AI Engineers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-5 border rounded-2xl shadow-sm space-y-3 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <p className={`text-xs sm:text-sm italic ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>&quot;CacheLLM saved us over $1,200 in our first week of production. The semantic matching is brilliant!&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">AK</div>
                <div>
                  <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Aman Kumar</p>
                  <p className="text-[10px] text-slate-500">AI Developer</p>
                </div>
              </div>
            </div>
            <div className={`p-5 border rounded-2xl shadow-sm space-y-3 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <p className={`text-xs sm:text-sm italic ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>&quot;Setup took less than 5 minutes. Local embedding calculation with Transformers.js is a genius touch.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">RJ</div>
                <div>
                  <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Rahul Jaiswal</p>
                  <p className="text-[10px] text-slate-500">Founder, GenAI Startup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Pricing Tiers */}
        <div className="w-full max-w-5xl py-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Simple, Transparent Pricing</h2>
            <div className="flex justify-center items-center gap-3">
              <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-indigo-400' : 'text-slate-500'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 bg-slate-700 rounded-full p-1 relative transition"
              >
                <div className={`w-4 h-4 bg-indigo-500 rounded-full transition transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs font-semibold ${billingCycle === 'yearly' ? 'text-indigo-400' : 'text-slate-500'}`}>Yearly (Save 20%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            <div className={`p-5 border rounded-2xl shadow-md flex flex-col justify-between ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Developer</h3>
                <p className="text-xs text-slate-500 mt-1">For side projects</p>
                <p className={`text-3xl font-black mt-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>$0 <span className="text-xs text-slate-500 font-normal">/ mo</span></p>
                <ul className={`text-xs space-y-2 mt-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <li>✓ 10,000 requests/mo</li>
                  <li>✓ Local Embeddings</li>
                  <li>✓ Community Support</li>
                </ul>
              </div>
              <Link href="/dashboard" className={`mt-6 py-2.5 text-center text-xs font-semibold rounded-xl transition ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
                Start Free
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-b from-slate-900 to-indigo-950 border border-indigo-500/30 rounded-2xl shadow-xl text-white flex flex-col justify-between relative">
              <span className="absolute -top-3 right-5 bg-indigo-500 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                Popular
              </span>
              <div>
                <h3 className="font-bold text-white text-base">Pro SaaS</h3>
                <p className="text-xs text-indigo-300 mt-1">For production AI apps</p>
                <p className="text-3xl font-black text-white mt-3">
                  ${billingCycle === 'monthly' ? '29' : '23'} <span className="text-xs text-indigo-300 font-normal">/ mo</span>
                </p>
                <ul className="text-xs text-slate-300 space-y-2 mt-4">
                  <li>✓ 500,000 requests/mo</li>
                  <li>✓ Sub-15ms Latency SLA</li>
                  <li>✓ Upstash Vector Sync</li>
                  <li>✓ Priority Support</li>
                </ul>
              </div>
              <Link href="/dashboard" className="mt-6 py-2.5 text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition">
                Upgrade to Pro
              </Link>
            </div>

            <div className={`p-5 border rounded-2xl shadow-md flex flex-col justify-between ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1">Custom nodes</p>
                <p className={`text-3xl font-black mt-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Custom</p>
                <ul className={`text-xs space-y-2 mt-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <li>✓ Unlimited requests</li>
                  <li>✓ Custom Vector DB</li>
                  <li>✓ Dedicated Instance</li>
                  <li>✓ 24/7 SLA Support</li>
                </ul>
              </div>
              <Link href="/dashboard" className={`mt-6 py-2.5 text-center text-xs font-semibold rounded-xl transition ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION: Security Badges */}
        <div className={`w-full max-w-4xl py-4 border rounded-2xl my-4 flex flex-wrap justify-around items-center gap-4 px-4 text-[11px] sm:text-xs font-semibold transition-colors ${isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          <div className="flex items-center gap-1.5">🛡️ SOC-2 Ready</div>
          <div className="flex items-center gap-1.5">🔒 Encrypted</div>
          <div className="flex items-center gap-1.5">⚡ Zero Retention</div>
        </div>

        {/* SECTION: FAQ Accordion */}
        <div className="w-full max-w-3xl text-left space-y-3 my-6">
          <h2 className={`text-2xl sm:text-3xl font-black text-center mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
          {[
            {
              q: "How does semantic matching differ from exact string caching?",
              a: "Exact caching triggers only on exact string matches. Semantic caching uses vector similarity embeddings so rephrased queries fetch cached answers in milliseconds."
            },
            {
              q: "Are there any hidden costs for generating embeddings?",
              a: "No! CacheLLM utilizes lightweight local embedding models via @xenova/transformers with zero external embedding cloud fees."
            },
            {
              q: "Which LLM providers are supported?",
              a: "Compatible with OpenAI, Google Gemini, Anthropic Claude, and custom local models."
            }
          ].map((faq, idx) => (
            <div key={idx} className={`border rounded-xl shadow-sm overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className={`w-full px-5 py-3.5 text-left font-bold text-xs sm:text-sm flex justify-between items-center transition ${isDarkMode ? 'text-slate-200 hover:bg-slate-800/60' : 'text-slate-800 hover:bg-slate-50'}`}
              >
                <span>{faq.q}</span>
                <span className="text-indigo-400 font-mono text-base">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className={`px-5 pb-3.5 text-xs leading-relaxed border-t pt-2.5 ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'}`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SECTION: Final CTA Banner */}
        <div className="w-full max-w-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white text-center shadow-2xl my-8 relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-black mb-3">Ready to Cut Your LLM API Bills by 95%?</h2>
          <p className="text-indigo-100 max-w-xl mx-auto text-xs sm:text-base mb-6">
            Start caching your AI prompts in less than 5 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-slate-100 transition text-xs sm:text-sm"
            >
              Get Started Free 🚀
            </Link>
            <Link
              href="/dashboard/docs"
              className="px-6 py-3 bg-black/20 hover:bg-black/30 border border-white/20 text-white font-semibold rounded-xl transition text-xs sm:text-sm backdrop-blur-md"
            >
              Read Documentation
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className={`border-t transition-colors ${isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200/80 bg-white/90 text-slate-600'} backdrop-blur-md relative z-20 pt-8 pb-6 text-left`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-6 mb-8 text-xs">
          
          <div className="col-span-2 space-y-3">
            <div className={`flex items-center gap-2.5 font-bold tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm shadow-md">
                ⚡
              </div>
              <span className="font-black tracking-tight">
                Cache<span className="text-indigo-500">LLM</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs">
              High-performance semantic caching layer for modern AI architectures. Reduce latencies to 11ms and slash OpenAI/Gemini costs.
            </p>
          </div>

          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Product</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition">Simulator</Link></li>
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition">Analytics</Link></li>
              <li><Link href="/dashboard/docs" className="hover:text-indigo-400 transition">API Keys</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Resources</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/dashboard/docs" className="hover:text-indigo-400 transition">Documentation</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">SDK Integration</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">System Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Legal</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="#" className="hover:text-indigo-400 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className={`max-w-6xl mx-auto px-4 sm:px-6 border-t pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] gap-3 ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200/60 text-slate-500'}`}>
          <p>© 2026 CacheLLM. Engineered for AI architectures.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>GitHub</span>
            <span>Twitter / X</span>
            <span>Discord</span>
          </div>
        </div>
      </footer>
    </div>
  );
}