import { useState } from 'react';
import SortingPage from './pages/SortingPage';
import SearchPage from './pages/SearchPage';
import DataStructuresPage from './pages/DataStructuresPage';

export default function App() {
  const [tab, setTab] = useState('sorting');

  const tabs = [
    { id: 'sorting', label: 'Sorting' },
    { id: 'searching', label: 'Searching' },
    { id: 'structures', label: 'Stack & Queue' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl p-6">
        <nav className="mb-6 flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                tab === t.id
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === 'sorting' && <SortingPage />}
        {tab === 'searching' && <SearchPage />}
        {tab === 'structures' && <DataStructuresPage />}
      </div>
    </div>
  );
}