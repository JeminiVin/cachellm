import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-[#0f172a] p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-lg font-bold tracking-wider">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              ⚡
            </div>
            <span>Cache<span className="text-indigo-500">LLM</span></span>
          </div>

          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/60 transition">
              📊 Overview
            </Link>
            <Link href="/dashboard/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/60 transition">
              📈 Analytics
            </Link>
            <Link href="/dashboard/docs" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/60 transition">
              📚 Docs
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/60 transition">
              ⚙️ Settings
            </Link>
          </nav>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          CacheLLM v1.0.0
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}