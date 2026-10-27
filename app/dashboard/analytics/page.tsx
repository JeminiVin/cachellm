'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Sample analytics data
const weeklyData = [
  { day: 'Mon', hits: 1420, misses: 210, latencySaved: 1.1 },
  { day: 'Tue', hits: 1890, misses: 190, latencySaved: 1.3 },
  { day: 'Wed', hits: 2300, misses: 310, latencySaved: 1.2 },
  { day: 'Thu', hits: 2780, misses: 240, latencySaved: 1.4 },
  { day: 'Fri', hits: 1890, misses: 180, latencySaved: 1.1 },
  { day: 'Sat', hits: 2390, misses: 120, latencySaved: 1.5 },
  { day: 'Sun', hits: 3490, misses: 290, latencySaved: 1.6 },
];

const distributionData = [
  { name: 'Cache Hits (Vector Match)', value: 84.2, color: '#6366f1' },
  { name: 'LLM Misses (Fallback)', value: 15.8, color: '#f59e0b' },
];

const latencyComparisonData = [
  { name: 'Direct OpenAI/Gemini', latency: 850, fill: '#64748b' },
  { name: 'CacheLLM Semantic Hit', latency: 11, fill: '#10b981' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Performance Analytics</h1>
          <p className="text-slate-400 text-sm mt-1">
            Monitor semantic cache hit rates, latency reduction, and cumulative cost savings.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex bg-[#0f172a] border border-slate-800 rounded-xl p-1 gap-1">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                timeRange === range
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-lg">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Total Queries</p>
          <p className="text-3xl font-bold mt-2 text-white">16,160</p>
          <span className="text-xs text-emerald-400 mt-1 block">↑ +18% from last week</span>
        </div>

        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-lg">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Cache Hits</p>
          <p className="text-3xl font-bold mt-2 text-indigo-400">14,160</p>
          <span className="text-xs text-indigo-300 mt-1 block">84.2% overall hit ratio</span>
        </div>

        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-lg">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Avg Latency Saved</p>
          <p className="text-3xl font-bold mt-2 text-emerald-400">1.35s</p>
          <span className="text-xs text-emerald-300 mt-1 block">Per cached query</span>
        </div>

        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-lg">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Total Money Saved</p>
          <p className="text-3xl font-bold mt-2 text-amber-400">$161.60</p>
          <span className="text-xs text-amber-300 mt-1 block">Provider API costs saved</span>
        </div>
      </div>

      {/* Main Area Chart: Cache Hits vs Misses */}
      <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Cache Hits vs LLM Misses Volume</h3>
          <span className="text-xs font-mono text-indigo-400">Upstash Vector Proximity Match</span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMisses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Area type="monotone" dataKey="hits" name="Cache Hits" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorHits)" />
              <Area type="monotone" dataKey="misses" name="LLM Misses" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorMisses)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section: Donut Ratio & Latency Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Cache Hit Distribution Pie */}
        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-lg font-bold text-white">Cache Ratio Distribution</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Speed Comparison Bar Chart */}
        <div className="p-6 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Average Response Time (ms)</h3>
            <span className="text-xs font-mono text-emerald-400">98% Speedup</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyComparisonData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="ms" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: any) => [`${value} ms`, 'Response Time']}
                />
                <Bar dataKey="latency" radius={[8, 8, 0, 0]}>
                  {latencyComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}