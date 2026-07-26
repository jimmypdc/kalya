'use client';

import { useEffect, useState, type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Accessible tabbed panel. Both panels stay in the DOM (good for SEO and
 * instant switching); the inactive one is hidden. Server-rendered content
 * (e.g. the photo gallery / events list) can be passed in as `content`.
 *
 * Deep-linkable: /memorial#events opens the "events" tab directly, and
 * switching tabs updates the URL hash so the current tab can be shared.
 */
export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  // On mount, honor a #hash that names a tab (e.g. /memorial#events).
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tabs.some((t) => t.id === hash)) setActive(hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function select(id: string) {
    setActive(id);
    // Reflect the tab in the URL without scrolling or adding history entries.
    window.history.replaceState(null, '', `#${id}`);
  }

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
              onClick={() => select(tab.id)}
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
