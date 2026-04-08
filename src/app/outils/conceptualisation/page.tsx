'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, RotateCcw } from 'lucide-react';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface DiagramData {
  patientName: string;
  date: string;
  experiencesPassees: string;
  schemas: string;
  strategies: string;
  consequences: string;
  evenementsDeclencheurs: string;
  penseesAutomatiques: string;
  emotions: string;
  comportements: string;
}

const emptyData: DiagramData = {
  patientName: '',
  date: new Date().toISOString().split('T')[0],
  experiencesPassees: '',
  schemas: '',
  strategies: '',
  consequences: '',
  evenementsDeclencheurs: '',
  penseesAutomatiques: '',
  emotions: '',
  comportements: '',
};

// ---------------------------------------------------------------------------
// Arrow SVG helpers
// ---------------------------------------------------------------------------

function ArrowRight({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
  );
}

function ArrowCurve({ d }: { d: string }) {
  return (
    <path d={d} fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConceptualisationPage() {
  const [data, setData] = useState<DiagramData>({ ...emptyData });

  const update = useCallback((key: keyof DiagramData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = () => setData({ ...emptyData, date: new Date().toISOString().split('T')[0] });

  const handleDownloadPDF = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>Conceptualisation — ${data.patientName || 'Patient'}</title>
<style>
body{font-family:system-ui,sans-serif;margin:30px auto;max-width:800px;color:#333;font-size:13px}
h1{font-size:18px;color:#b8453a;margin-bottom:2px}
.meta{color:#666;font-size:11px;margin-bottom:24px}
.diagram{position:relative;width:100%;height:800px}
.box{position:absolute;border:2px solid #334155;border-radius:8px;padding:10px 12px;background:white;min-height:80px}
.box-title{font-weight:700;font-size:12px;color:#334155;margin-bottom:4px}
.box-content{font-size:11px;color:#555;white-space:pre-wrap;line-height:1.5}
svg{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}
@media print{body{margin:15px}.diagram{page-break-inside:avoid}}
</style></head><body>
<h1>Diagramme de Conceptualisation de Cas</h1>
<p class="meta">${data.patientName ? `Patient : ${data.patientName} — ` : ''}Date : ${data.date}</p>
<div class="diagram">
  <svg viewBox="0 0 800 800">
    <defs><marker id="ah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/></marker></defs>
    <!-- Expériences → Schémas -->
    <line x1="310" y1="60" x2="400" y2="60" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
    <!-- Expériences → Conséquences -->
    <path d="M 155 120 L 155 200" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
    <!-- Schémas → Stratégies -->
    <line x1="580" y1="120" x2="580" y2="200" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
    <!-- Stratégies → Événements -->
    <line x1="580" y1="360" x2="580" y2="420" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
    <!-- Événements → Pensées auto -->
    <line x1="580" y1="560" x2="580" y2="620" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
    <!-- Pensées auto → Émotions -->
    <line x1="400" y1="700" x2="320" y2="700" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
    <!-- Émotions → Comportements -->
    <line x1="200" y1="650" x2="200" y2="580" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
    <!-- Comportements → Conséquences -->
    <line x1="200" y1="440" x2="200" y2="380" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
    <!-- Conséquences → Schémas -->
    <path d="M 310 240 Q 360 160 400 80" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#ah)"/>
  </svg>
  <div class="box" style="left:10px;top:20px;width:280px;height:90px">
    <div class="box-title">Expériences du passé :</div><div class="box-content">${data.experiencesPassees || '—'}</div>
  </div>
  <div class="box" style="left:410px;top:20px;width:340px;height:90px">
    <div class="box-title">Schémas :</div><div class="box-content">${data.schemas || '—'}</div>
  </div>
  <div class="box" style="left:10px;top:210px;width:280px;height:160px">
    <div class="box-title">Conséquences :</div><div class="box-content">${data.consequences || '—'}</div>
  </div>
  <div class="box" style="left:410px;top:210px;width:340px;height:140px">
    <div class="box-title">Stratégies :</div><div class="box-content">${data.strategies || '—'}</div>
  </div>
  <div class="box" style="left:410px;top:430px;width:340px;height:120px">
    <div class="box-title">Événements déclencheurs actuels :</div><div class="box-content">${data.evenementsDeclencheurs || '—'}</div>
  </div>
  <div class="box" style="left:60px;top:450px;width:260px;height:120px">
    <div class="box-title">Comportements :</div><div class="box-content">${data.comportements || '—'}</div>
  </div>
  <div class="box" style="left:100px;top:650px;width:220px;height:100px">
    <div class="box-title">Émotions :</div><div class="box-content">${data.emotions || '—'}</div>
  </div>
  <div class="box" style="left:410px;top:630px;width:340px;height:120px">
    <div class="box-title">Pensées automatiques :</div><div class="box-content">${data.penseesAutomatiques || '—'}</div>
  </div>
</div>
<script>window.print()<\/script></body></html>`);
    w.document.close();
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="px-6 py-3 border-b border-slate-200 bg-white sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/outils" className="text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-sm font-semibold text-slate-800">Diagramme de Conceptualisation</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDownloadPDF} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700">
            <Download className="w-3.5 h-3.5" />
            Télécharger PDF
          </button>
          <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-xs hover:bg-slate-50">
            <RotateCcw className="w-3.5 h-3.5" />
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Patient info */}
      <div className="max-w-5xl mx-auto px-6 pt-6 pb-2">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Patient</label>
            <input type="text" value={data.patientName} onChange={(e) => update('patientName', e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white" placeholder="Prénom Nom" />
          </div>
          <div className="w-40">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Date</label>
            <input type="date" value={data.date} onChange={(e) => update('date', e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white" />
          </div>
        </div>
      </div>

      {/* Visual diagram */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="relative" style={{ minHeight: '960px' }}>

          {/* SVG Arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 960 960" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="arrowhead" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
            </defs>
            {/* Expériences passées → Schémas */}
            <ArrowRight x1={370} y1={70} x2={440} y2={70} />
            {/* Expériences passées → Conséquences (diagonal) */}
            <ArrowCurve d="M 200 140 L 200 220" />
            {/* Schémas → Stratégies */}
            <ArrowCurve d="M 660 140 L 660 220" />
            {/* Conséquences → Schémas (diagonal) */}
            <ArrowCurve d="M 370 270 Q 410 180 440 90" />
            {/* Stratégies → Événements déclencheurs */}
            <ArrowCurve d="M 660 420 L 660 480" />
            {/* Événements déclencheurs → Pensées automatiques */}
            <ArrowCurve d="M 660 640 L 660 700" />
            {/* Pensées automatiques → Émotions */}
            <ArrowCurve d="M 440 810 L 370 810" />
            {/* Émotions → Comportements */}
            <ArrowCurve d="M 200 770 L 200 700" />
            {/* Comportements → Conséquences */}
            <ArrowCurve d="M 200 560 L 200 420" />
          </svg>

          {/* Boxes — Row 1 */}
          <DiagramBox
            title="Expériences du passé :"
            value={data.experiencesPassees}
            onChange={(v) => update('experiencesPassees', v)}
            placeholder="Événements marquants de l'enfance, dynamique familiale, traumatismes..."
            style={{ position: 'absolute', top: 0, left: 0, width: '38%', minHeight: 130 }}
            color="#1E40AF"
          />
          <DiagramBox
            title="Schémas :"
            value={data.schemas}
            onChange={(v) => update('schemas', v)}
            placeholder="Abandon, Méfiance/Abus, Manque Affectif..."
            style={{ position: 'absolute', top: 0, right: 0, width: '52%', minHeight: 130 }}
            color="#b8453a"
          />

          {/* Row 2 */}
          <DiagramBox
            title="Conséquences :"
            value={data.consequences}
            onChange={(v) => update('consequences', v)}
            placeholder="Renforcement des schémas, ruptures, isolement..."
            style={{ position: 'absolute', top: 220, left: 0, width: '38%', minHeight: 180 }}
            color="#854D0E"
          />
          <DiagramBox
            title="Stratégies :"
            value={data.strategies}
            onChange={(v) => update('strategies', v)}
            placeholder="Soumission : ... \nÉvitement : ...\nCompensation : ..."
            style={{ position: 'absolute', top: 220, right: 0, width: '52%', minHeight: 180 }}
            color="#5B21B6"
          />

          {/* Row 3 */}
          <DiagramBox
            title="Comportements :"
            value={data.comportements}
            onChange={(v) => update('comportements', v)}
            placeholder="Retrait, agressivité, dépendance affective..."
            style={{ position: 'absolute', top: 560, left: 0, width: '38%', minHeight: 130 }}
            color="#166534"
          />
          <DiagramBox
            title="Événements déclencheurs actuels :"
            value={data.evenementsDeclencheurs}
            onChange={(v) => update('evenementsDeclencheurs', v)}
            placeholder="Critique du conjoint, absence d'un proche, conflit au travail..."
            style={{ position: 'absolute', top: 480, right: 0, width: '52%', minHeight: 150 }}
            color="#9A3412"
          />

          {/* Row 4 */}
          <DiagramBox
            title="Émotions :"
            value={data.emotions}
            onChange={(v) => update('emotions', v)}
            placeholder="Tristesse, colère, honte, anxiété..."
            style={{ position: 'absolute', top: 770, left: '5%', width: '32%', minHeight: 120 }}
            color="#991B1B"
          />
          <DiagramBox
            title="Pensées automatiques :"
            value={data.penseesAutomatiques}
            onChange={(v) => update('penseesAutomatiques', v)}
            placeholder="« Je vais être abandonné(e) », « Je suis nul(le) »..."
            style={{ position: 'absolute', top: 700, right: 0, width: '52%', minHeight: 140 }}
            color="#7a4a9a"
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DiagramBox
// ---------------------------------------------------------------------------

function DiagramBox({
  title,
  value,
  onChange,
  placeholder,
  style,
  color,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  style: React.CSSProperties;
  color: string;
}) {
  return (
    <div
      className="rounded-xl border-2 bg-white shadow-sm overflow-hidden"
      style={{ ...style, borderColor: color }}
    >
      <div className="px-3 py-1.5" style={{ backgroundColor: `${color}10` }}>
        <h3 className="text-xs font-bold" style={{ color }}>{title}</h3>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-xs text-slate-700 leading-relaxed resize-none focus:outline-none placeholder:text-slate-300"
        style={{ minHeight: 'calc(100% - 32px)' }}
        rows={4}
      />
    </div>
  );
}
