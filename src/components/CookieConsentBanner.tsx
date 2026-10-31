'use client';

import React, { useState, useEffect } from 'react';

export function CookieConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-2xl z-50 flex flex-col gap-3">
      <p className="text-sm text-slate-300">
        We use essential cookies to ensure community security, track group stats, and save your preferred filter settings.
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => {
            localStorage.setItem('cookie_consent', 'accepted');
            setShow(false);
          }}
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
