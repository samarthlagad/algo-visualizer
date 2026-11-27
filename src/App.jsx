import { useState } from 'react';
import SortingPage from './pages/SortingPage';
import SearchPage from './pages/SearchPage';

export default function App() {
  const [tab, setTab] = useState('sorting');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl p-6">
        <nav className="mb-6 flex gap-2 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setTab('sorting')}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              tab === 'sorting'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Sorting
          </button>
          <button
            type="button"
            onClick={() => setTab('searching')}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              tab === 'searching'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Searching
          </button>
        </nav>

        {tab === 'sorting' ? <SortingPage /> : <SearchPage />}
      </div>
    </div>
  );
}