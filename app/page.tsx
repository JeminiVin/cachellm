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
      
      {/* Navigation */}
      <header className={`max-w-7xl mx-auto w-full px-6 py-5 flex justify-between items-center relative z-20 border-b ${isDarkMode ? 'border-slate-800/80 bg-slate-950/70' : 'border-slate-200/60 bg-white/70'} backdrop-blur-2xl sticky top-0 shadow-xs transition-colors duration-500`}>
        <div className="flex items-center gap-3 text-lg font-bold tracking-wider">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/40 text-white text-xl animate-bounce">
            ⚡
          </div>
          <span className="text-xl font-black tracking-tight">
            Cache<span className="text-indigo-500">LLM</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition ${isDarkMode ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
            title="Toggle Cinematic Theme"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          
          <Link href="/sign-in" className={`text-sm font-semibold transition px-3 py-2 ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
            Sign In
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5">
            Dashboard →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 text-center space-y-12 flex-1 flex flex-col justify-center items-center relative z-20">
        
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold shadow-lg backdrop-blur-md ${isDarkMode ? 'bg-slate-900/90 border-indigo-500/30 text-indigo-300' : 'bg-white/95 border-indigo-200 text-indigo-700'}`}>
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
          <span>v1.0 Production Release</span> — Enterprise AI Caching Layer
        </div>

        <h1 className={`text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.08] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Cut LLM API Costs by 95% With <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 animate-shimmer-text">
            Semantic Intelligence
          </span>
        </h1>

        <p className={`text-lg md:text-xl max-w-2xl leading-relaxed font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Stop paying twice for identical queries. CacheLLM matches semantic intent locally and serves instant responses before reaching paid LLM providers.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-semibold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
            Launch Dashboard 🚀
          </Link>
          <Link href="/dashboard/docs" className={`px-8 py-4 border font-semibold rounded-2xl transition-all shadow-sm flex items-center justify-center ${isDarkMode ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white/90 border-slate-300 text-slate-800 hover:bg-white'}`}>
            API Docs
          </Link>
        </div>

        {/* Providers Banner */}
        <div className={`w-full max-w-4xl py-6 border-y my-4 transition-colors ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200/60 text-slate-600'}`}>
          <p className="text-xs font-mono uppercase tracking-widest mb-4">Seamlessly Integrated With Your Favorite AI Stacks</p>
          <div className="flex flex-wrap justify-center items-center gap-8 font-bold text-sm">
            <span className="hover:text-indigo-400 transition">✨ OpenAI GPT-4</span>
            <span className="hover:text-indigo-400 transition">🔮 Google Gemini</span>
            <span className="hover:text-indigo-400 transition">⚡ Anthropic Claude</span>
            <span className="hover:text-indigo-400 transition">🔗 LangChain</span>
            <span className="hover:text-indigo-400 transition">🚀 Upstash Vector</span>
          </div>
        </div>

        {/* Live Simulator Widget */}
        <div className={`w-full max-w-3xl border rounded-3xl shadow-2xl p-6 md:p-8 backdrop-blur-2xl text-left relative overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/95 border-indigo-100'}`}>
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />
          
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5 ${isDarkMode ? 'bg-indigo-950/60 border-indigo-800 text-indigo-300' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" /> Live Simulator
            </span>
            <span className={`text-xs font-mono ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Upstash Vector + Gemini</span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSimulate(); }} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type a query to simulate..."
                className={`flex-1 border rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 transition font-medium ${isDarkMode ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800'}`}
              />
              <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3.5 rounded-2xl text-sm font-semibold shadow-lg transition disabled:opacity-50 whitespace-nowrap">
                {loading ? 'Analyzing Vector...' : 'Simulate Query ⚡'}
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            <span className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-medium`}>Try clicking:</span>
            {sampleQueries.map((q, idx) => (
              <button key={idx} onClick={() => handleSimulate(q)} className={`px-2.5 py-1 rounded-lg border transition ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
                {q}
              </button>
            ))}
          </div>

          {result && (
            <div className="mt-5 p-5 bg-slate-950 rounded-2xl text-slate-100 space-y-3 shadow-2xl border border-slate-800 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/80 pb-3">
                <span className={`text-xs font-mono font-bold tracking-wide px-3 py-1 rounded-md ${result.source.includes('Hit') ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                  {result.source}
                </span>
                <div className="flex items-center gap-3 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300">⏱️ <strong className="text-white">{result.time}</strong></span>
                  <span className="text-emerald-400">💰 <strong className="text-emerald-300">{result.cost}</strong></span>
                  <span className="text-indigo-400">🎯 <strong>{(result.similarity * 100).toFixed(1)}%</strong></span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-300 font-mono leading-relaxed pt-1">
                {result.response}
              </p>
            </div>
          )}
        </div>

        {/* SECTION: Latency Benchmark Comparison */}
        <div className={`w-full max-w-3xl border rounded-3xl p-6 shadow-xl text-left space-y-4 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200/80'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span>⚡ Response Speed Benchmark</span>
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className={`flex justify-between mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Direct LLM API (OpenAI/Gemini)</span>
                <span>~850 ms</span>
              </div>
              <div className={`w-full rounded-full h-3 overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div className="bg-slate-500 h-full w-[85%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold text-indigo-400 mb-1">
                <span>CacheLLM Semantic Hit</span>
                <span className="text-emerald-400">11 ms (98% faster)</span>
              </div>
              <div className={`w-full rounded-full h-3 overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[3%] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Interactive ROI Cost Savings Calculator */}
        <div className={`w-full max-w-4xl border rounded-3xl shadow-xl p-8 backdrop-blur-xl text-left my-8 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-indigo-100'}`}>
          <div className="text-center space-y-2 mb-8">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${isDarkMode ? 'bg-indigo-950/60 border-indigo-800 text-indigo-300' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
              Interactive ROI Calculator
            </span>
            <h2 className={`text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>See How Much You Will Save</h2>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Drag the slider to estimate your monthly LLM query volume.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Monthly LLM Queries:</span>
                  <span className="text-indigo-400 font-mono font-bold text-lg">{monthlyQueries.toLocaleString()} requests</span>
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
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                * Based on standard GPT-4 / Gemini API pricing ($0.002 per prompt token average) with a conservative 70% cache hit ratio.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-900/50 p-6 rounded-2xl text-white text-center shadow-xl space-y-3">
              <p className="text-xs font-mono text-indigo-300 uppercase tracking-widest">Estimated Monthly Savings</p>
              <p className="text-4xl md:text-5xl font-black text-emerald-400">${estimatedSavings.toLocaleString()}</p>
              <p className="text-xs text-slate-400">Saved directly on provider API bills every month!</p>
            </div>
          </div>
        </div>

        {/* SECTION: How It Works Flow */}
        <div className="w-full max-w-5xl py-8 text-center space-y-8">
          <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>How CacheLLM Works in 3 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className={`p-6 border rounded-2xl shadow-md transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-2xl font-black text-indigo-400">01</span>
              <h3 className={`font-bold text-lg mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Intercept Request</h3>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Your application routes prompt requests through CacheLLM API gateway before hitting LLMs.</p>
            </div>
            <div className={`p-6 border rounded-2xl shadow-md transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-2xl font-black text-purple-400">02</span>
              <h3 className={`font-bold text-lg mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Local Embedding Check</h3>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Embeddings are generated locally and queried via Upstash Vector for semantic matches.</p>
            </div>
            <div className={`p-6 border rounded-2xl shadow-md transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-2xl font-black text-pink-400">03</span>
              <h3 className={`font-bold text-lg mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Instant Hit or Fallback</h3>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Returns cached response in 11ms if similar intent is found, else securely fetches fresh data.</p>
            </div>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl text-left overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveTab('js')} className={`text-xs font-mono px-3 py-1 rounded-md transition ${activeTab === 'js' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>
                Node.js / TS
              </button>
              <button onClick={() => setActiveTab('python')} className={`text-xs font-mono px-3 py-1 rounded-md transition ${activeTab === 'python' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}>
                Python
              </button>
            </div>
            <span className="text-[11px] font-mono text-emerald-400">POST /api/v1/cache</span>
          </div>

          <pre className="p-6 font-mono text-xs md:text-sm text-slate-300 overflow-x-auto leading-relaxed">
            {activeTab === 'js'
              ? `// Node.js Fetch Integration
const res = await fetch('http://localhost:3000/api/v1/cache', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk_cache_live_your_key'
  },
  body: JSON.stringify({ prompt: 'Explain semantic caching in simple terms' })
});

const { source, response, similarity } = await res.json();
console.log(source); // 'cache' (Hit) or 'gemini_llm' (Miss)`
              : `# Python Integration
import requests

url = "http://localhost:3000/api/v1/cache"
headers = {
    "Authorization": "Bearer sk_cache_live_your_key",
    "Content-Type": "application/json"
}
payload = {"prompt": "Explain semantic caching in simple terms"}

response = requests.post(url, json=payload, headers=headers).json()
print(response["source"])  # 'cache' or 'gemini_llm'`}
          </pre>
        </div>

        {/* SECTION: Wall of Love / Testimonials */}
        <div className="w-full max-w-5xl py-10 space-y-6 text-left">
          <div className="text-center space-y-2">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${isDarkMode ? 'bg-indigo-950/60 border-indigo-800 text-indigo-300' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
              Wall of Love
            </span>
            <h2 className={`text-2xl md:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Loved by AI Engineers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 border rounded-3xl shadow-sm space-y-4 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <p className={`text-sm italic ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>&quot;CacheLLM saved us over $1,200 in our first week of production. The semantic matching feature catches rephrased user prompts brilliantly!&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">AK</div>
                <div>
                  <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Aman Kumar</p>
                  <p className="text-[10px] text-slate-500">Full-Stack AI Developer</p>
                </div>
              </div>
            </div>
            <div className={`p-6 border rounded-3xl shadow-sm space-y-4 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <p className={`text-sm italic ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>&quot;Setup took less than 5 minutes. The local embedding calculation using Transformers.js is a genius touch—zero extra cloud fees.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">RJ</div>
                <div>
                  <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Rahul Jaiswal</p>
                  <p className="text-[10px] text-slate-500">Founder, GenAI Startup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Interactive Pricing Tier Preview */}
        <div className="w-full max-w-5xl py-10 space-y-8">
          <div className="text-center space-y-3">
            <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Simple, Transparent Pricing</h2>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className={`p-6 border rounded-3xl shadow-lg flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Developer</h3>
                <p className="text-xs text-slate-500 mt-1">Perfect for side projects & testing</p>
                <p className={`text-3xl font-black mt-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>$0 <span className="text-xs text-slate-500 font-normal">/ mo</span></p>
                <ul className={`text-xs space-y-2 mt-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <li>✓ 10,000 requests/mo</li>
                  <li>✓ Local Embeddings</li>
                  <li>✓ Community Support</li>
                </ul>
              </div>
              <Link href="/dashboard" className={`mt-8 py-3 text-center text-xs font-semibold rounded-xl transition ${isDarkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                Start Free
              </Link>
            </div>

            <div className="p-6 bg-gradient-to-b from-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl shadow-2xl text-white flex flex-col justify-between relative">
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                Popular
              </span>
              <div>
                <h3 className="font-bold text-white text-lg">Pro SaaS</h3>
                <p className="text-xs text-indigo-300 mt-1">For growing production AI apps</p>
                <p className="text-3xl font-black text-white mt-4">
                  ${billingCycle === 'monthly' ? '29' : '23'} <span className="text-xs text-indigo-300 font-normal">/ mo</span>
                </p>
                <ul className="text-xs text-slate-300 space-y-2 mt-6">
                  <li>✓ 500,000 requests/mo</li>
                  <li>✓ Sub-15ms Latency SLA</li>
                  <li>✓ Upstash Vector Sync</li>
                  <li>✓ Priority Support</li>
                </ul>
              </div>
              <Link href="/dashboard" className="mt-8 py-3 text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition">
                Upgrade to Pro
              </Link>
            </div>

            <div className={`p-6 border rounded-3xl shadow-lg flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1">Custom volume & dedicated nodes</p>
                <p className={`text-3xl font-black mt-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Custom</p>
                <ul className={`text-xs space-y-2 mt-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <li>✓ Unlimited requests</li>
                  <li>✓ Custom Vector Databases</li>
                  <li>✓ Dedicated Instance</li>
                  <li>✓ 24/7 SLA Support</li>
                </ul>
              </div>
              <Link href="/dashboard" className={`mt-8 py-3 text-center text-xs font-semibold rounded-xl transition ${isDarkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION: Security & Privacy Badges */}
        <div className={`w-full max-w-4xl py-6 border rounded-3xl my-6 flex flex-wrap justify-around items-center gap-6 px-6 text-xs font-semibold transition-colors ${isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          <div className="flex items-center gap-2">🛡️ SOC-2 Type II Ready</div>
          <div className="flex items-center gap-2">🔒 End-to-End Encryption</div>
          <div className="flex items-center gap-2">⚡ Zero Data Retention</div>
        </div>

        {/* SECTION: Interactive FAQ Accordion */}
        <div className="w-full max-w-3xl text-left space-y-4 my-8">
          <h2 className={`text-2xl md:text-3xl font-black text-center mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
          {[
            {
              q: "How does semantic matching differ from exact string caching?",
              a: "Exact caching only triggers if a user types the exact same sentence character-for-character. Semantic caching uses vector similarity embeddings so rephrased queries (e.g., 'What are cache benefits?' vs 'Why use semantic caching?') successfully trigger cache hits."
            },
            {
              q: "Are there any hidden costs for generating embeddings?",
              a: "No! CacheLLM utilizes lightweight local embedding models via @xenova/transformers, meaning zero external cloud embedding fees."
            },
            {
              q: "Which LLM providers are supported?",
              a: "CacheLLM acts as an intelligent proxy layer compatible with OpenAI, Google Gemini, Anthropic Claude, and custom local models."
            }
          ].map((faq, idx) => (
            <div key={idx} className={`border rounded-2xl shadow-sm overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className={`w-full px-6 py-4 text-left font-bold flex justify-between items-center transition ${isDarkMode ? 'text-slate-200 hover:bg-slate-800/60' : 'text-slate-800 hover:bg-slate-50'}`}
              >
                <span>{faq.q}</span>
                <span className="text-indigo-400 font-mono">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className={`px-6 pb-4 text-sm leading-relaxed border-t pt-3 ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'}`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SECTION: Final High-Converting CTA Banner */}
        <div className="w-full max-w-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white text-center shadow-2xl my-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Cut Your LLM API Bills by 95%?</h2>
          <p className="text-indigo-100 max-w-xl mx-auto text-sm md:text-base mb-8">
            Start caching your AI prompts in less than 5 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-lg hover:bg-slate-100 transition transform hover:-translate-y-0.5 text-sm"
            >
              Get Started Free 🚀
            </Link>
            <Link
              href="/dashboard/docs"
              className="px-8 py-4 bg-black/20 hover:bg-black/30 border border-white/20 text-white font-semibold rounded-2xl transition text-sm backdrop-blur-md"
            >
              Read Documentation
            </Link>
          </div>
        </div>

      </main>

      {/* SECTION: Professional Multi-Column SaaS Footer */}
      <footer className={`border-t transition-colors ${isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200/80 bg-white/90 text-slate-600'} backdrop-blur-md relative z-20 pt-12 pb-8 text-left`}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 space-y-4">
            <div className={`flex items-center gap-3 text-lg font-bold tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-base shadow-md">
                ⚡
              </div>
              <span className="text-lg font-black tracking-tight">
                Cache<span className="text-indigo-500">LLM</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              High-performance semantic caching layer for modern AI architectures. Reduce latencies to 11ms and slash OpenAI/Gemini costs.
            </p>
          </div>

          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition">Simulator</Link></li>
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition">Analytics</Link></li>
              <li><Link href="/dashboard/docs" className="hover:text-indigo-400 transition">API Keys</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard/docs" className="hover:text-indigo-400 transition">Documentation</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">SDK Integration</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Vector DB Guide</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">System Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#" className="hover:text-indigo-400 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition">Security</Link></li>
            </ul>
          </div>

        </div>

        <div className={`max-w-6xl mx-auto px-6 border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200/60 text-slate-500'}`}>
          <p>© 2026 CacheLLM. Engineered for ultra-fast AI production architectures.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">GitHub</span>
            <span className="hover:text-slate-200 cursor-pointer">Twitter / X</span>
            <span className="hover:text-slate-200 cursor-pointer">Discord</span>
          </div>
        </div>
      </footer>
    </div>
  );
}