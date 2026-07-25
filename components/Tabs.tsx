'use client';

import { useState, type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Accessible tabbed panel. Both panels stay in the DOM (good for SEO and
 * instant switching); the inactive one is hidden. Server-rendered content
 * (e.g. the photo gallery / events list) can be passed in as `content`.
 */
export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Memorial content"
        className="mx-auto flex w-full max-w-md gap-1 rounded-full bg-teal-50 p-1"
      >
        {tabs.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                selected
                  ? 'bg-teal-900 text-white shadow-sm'
                  : 'text-teal-800 hover:bg-teal-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={active !== tab.id}
          className="mt-10"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
