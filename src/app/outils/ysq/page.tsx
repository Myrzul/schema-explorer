'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function YSQPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-6 py-3 border-b border-slate-200 bg-white flex items-center gap-3">
        <Link href="/outils" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-sm font-semibold text-slate-800">YSQ-L3 — Questionnaire des Schémas de Young</h1>
      </div>
      <iframe
        ref={iframeRef}
        src="/ysq-l3.html"
        className="flex-1 w-full border-0"
        title="YSQ-L3"
      />
    </div>
  );
}
