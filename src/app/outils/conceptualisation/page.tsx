'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, RotateCcw, ChevronDown, X } from 'lucide-react';
import { schemas } from '@/data/schemas';
import { modes } from '@/data/modes';
import { domains } from '@/data/domains';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface DiagramData {
  patientName: string;
  date: string;
  experiencesPassees: string;
  selectedSchemaIds: string[];
  schemasLibre: string;
  selectedModeIds: string[];
  strategiesLibre: string;
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
  selectedSchemaIds: [],
  schemasLibre: '',
  selectedModeIds: [],
  strategiesLibre: '',
  consequences: '',
  evenementsDeclencheurs: '',
  penseesAutomatiques: '',
  emotions: '',
  comportements: '',
};

// Tous les modes groupés par catégorie
const modeGroups = [
  { label: 'Modes Enfant', category: 'enfant', color: '#2563EB' },
  { label: 'Modes Coping — Évitement', category: 'coping-dysfonctionnel', styleId: 'evitement', color: '#7C3AED' },
  { label: 'Modes Coping — Soumission', category: 'coping-dysfonctionnel', styleId: 'soumission', color: '#6366F1' },
  { label: 'Modes Coping — Compensation', category: 'coping-dysfonctionnel', styleId: 'compensation', color: '#EA580C' },
  { label: 'Modes Parent Dysfonctionnel', category: 'parent-dysfonctionnel', color: '#DC2626' },
  { label: 'Mode Adulte Sain', category: 'sain', color: '#16A34A' },
] as const;

const getModesByGroup = (g: typeof modeGroups[number]) =>
  modes.filter((m) =>
    m.category === g.category &&
    (!('styleId' in g) || !g.styleId || m.copingStyleId === g.styleId)
  );

// Schémas groupés par domaine
const domainColors: Record<string, string> = {
  'separation-rejet': '#DC2626',
  'manque-autonomie': '#EA580C',
  'manque-limites': '#CA8A04',
  'orientation-autres': '#16A34A',
  'survigilance-inhibition': '#2563EB',
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

  const updateStr = useCallback((key: keyof DiagramData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleSchema = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      selectedSchemaIds: prev.selectedSchemaIds.includes(id)
        ? prev.selectedSchemaIds.filter((s) => s !== id)
        : [...prev.selectedSchemaIds, id],
    }));
  }, []);

  const toggleMode = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      selectedModeIds: prev.selectedModeIds.includes(id)
        ? prev.selectedModeIds.filter((s) => s !== id)
        : [...prev.selectedModeIds, id],
    }));
  }, []);

  const handleReset = () => setData({ ...emptyData, date: new Date().toISOString().split('T')[0] });

  // Texte combiné pour le PDF
  const schemasText = useMemo(() => {
    const selected = data.selectedSchemaIds
      .map((id) => schemas.find((s) => s.id === id))
      .filter(Boolean)
      .map((s) => `• ${s!.name} — ${s!.centralBelief}`)
      .join('\n');
    return [selected, data.schemasLibre].filter(Boolean).join('\n');
  }, [data.selectedSchemaIds, data.schemasLibre]);

  const strategiesText = useMemo(() => {
    const selected = data.selectedModeIds
      .map((id) => modes.find((m) => m.id === id))
      .filter(Boolean)
      .map((m) => `• ${m!.name}`)
      .join('\n');
    return [selected, data.strategiesLibre].filter(Boolean).join('\n');
  }, [data.selectedModeIds, data.strategiesLibre]);

  const handleDownloadPDF = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    const esc = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const nl2br = (s: string) => esc(s).replace(/\n/g, '<br/>');
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Conceptualisation — ${esc(data.patientName || 'Patient')}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;margin:30px auto;max-width:780px;color:#333;font-size:12px;line-height:1.5}
h1{font-size:18px;color:#b8453a;margin-bottom:2px}
.meta{color:#666;font-size:11px;margin-bottom:20px}
.row{display:flex;gap:16px;margin-bottom:6px}
.row .col{flex:1;min-width:0}
.row .col-left{flex:0 0 45%}
.row .col-right{flex:0 0 53%}
.box{border:2px solid #334155;border-radius:8px;padding:10px 12px;background:white;min-height:50px}
.box-title{font-weight:700;font-size:11px;color:#334155;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.3px}
.box-content{font-size:11px;color:#444;line-height:1.55;word-wrap:break-word;overflow-wrap:break-word}
.arrow{text-align:center;color:#64748b;font-size:18px;line-height:1;padding:2px 0}
.arrow-row{display:flex;gap:16px;margin-bottom:6px}
.arrow-row .col{flex:1;display:flex;justify-content:center}
.arrow-row .col-left{flex:0 0 45%}
.arrow-row .col-right{flex:0 0 53%}
.arrow-horiz{display:flex;align-items:center;justify-content:center;color:#64748b;font-size:14px;padding:0 4px}
.top-row{display:flex;gap:0;margin-bottom:6px;align-items:stretch}
.top-row .col-left{flex:0 0 45%}
.top-row .arrow-horiz{flex:0 0 2%;display:flex;align-items:center;justify-content:center}
.top-row .col-right{flex:0 0 53%}
@media print{body{margin:15px}@page{size:A4;margin:15mm}}
</style></head><body>
<h1>Diagramme de Conceptualisation de Cas</h1>
<p class="meta">${data.patientName ? `Patient : ${esc(data.patientName)} &mdash; ` : ''}Date : ${data.date}</p>

<!-- Ligne 1 : Expériences → Schémas -->
<div class="top-row">
  <div class="col-left"><div class="box">
    <div class="box-title">Exp\u00e9riences du pass\u00e9 :</div>
    <div class="box-content">${nl2br(data.experiencesPassees) || '&mdash;'}</div>
  </div></div>
  <div class="arrow-horiz">&rarr;</div>
  <div class="col-right"><div class="box">
    <div class="box-title">Sch\u00e9mas :</div>
    <div class="box-content">${nl2br(schemasText) || '&mdash;'}</div>
  </div></div>
</div>

<!-- Flèches ↓ ↓ -->
<div class="arrow-row">
  <div class="col col-left"><div class="arrow">&darr;</div></div>
  <div class="col col-right"><div class="arrow">&darr;</div></div>
</div>

<!-- Ligne 2 : Conséquences | Stratégies/Modes -->
<div class="row">
  <div class="col col-left"><div class="box">
    <div class="box-title">Cons\u00e9quences :</div>
    <div class="box-content">${nl2br(data.consequences) || '&mdash;'}</div>
  </div></div>
  <div class="col col-right"><div class="box">
    <div class="box-title">Strat\u00e9gies / Modes :</div>
    <div class="box-content">${nl2br(strategiesText) || '&mdash;'}</div>
  </div></div>
</div>

<!-- Flèches ↑ ↓ -->
<div class="arrow-row">
  <div class="col col-left"><div class="arrow">&uarr;</div></div>
  <div class="col col-right"><div class="arrow">&darr;</div></div>
</div>

<!-- Ligne 3 : Comportements | Événements déclencheurs -->
<div class="row">
  <div class="col col-left"><div class="box">
    <div class="box-title">Comportements :</div>
    <div class="box-content">${nl2br(data.comportements) || '&mdash;'}</div>
  </div></div>
  <div class="col col-right"><div class="box">
    <div class="box-title">\u00c9v\u00e9nements d\u00e9clencheurs actuels :</div>
    <div class="box-content">${nl2br(data.evenementsDeclencheurs) || '&mdash;'}</div>
  </div></div>
</div>

<!-- Flèches ↑ ↓ -->
<div class="arrow-row">
  <div class="col col-left"><div class="arrow">&uarr;</div></div>
  <div class="col col-right"><div class="arrow">&darr;</div></div>
</div>

<!-- Ligne 4 : Émotions ← Pensées automatiques -->
<div class="top-row">
  <div class="col-left"><div class="box">
    <div class="box-title">\u00c9motions :</div>
    <div class="box-content">${nl2br(data.emotions) || '&mdash;'}</div>
  </div></div>
  <div class="arrow-horiz">&larr;</div>
  <div class="col-right"><div class="box">
    <div class="box-title">Pens\u00e9es automatiques :</div>
    <div class="box-content">${nl2br(data.penseesAutomatiques) || '&mdash;'}</div>
  </div></div>
</div>

<script>setTimeout(function(){window.print()},200)<\/script>
</body></html>`);
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
            <input type="text" value={data.patientName} onChange={(e) => updateStr('patientName', e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white" placeholder="Prénom Nom" />
          </div>
          <div className="w-40">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Date</label>
            <input type="date" value={data.date} onChange={(e) => updateStr('date', e.target.value)}
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
            onChange={(v) => updateStr('experiencesPassees', v)}
            placeholder="Événements marquants de l'enfance, dynamique familiale, traumatismes..."
            style={{ position: 'absolute', top: 0, left: 0, width: '38%', minHeight: 130 }}
            color="#1E40AF"
          />
          <SchemaSelector
            selectedIds={data.selectedSchemaIds}
            onToggle={toggleSchema}
            freeText={data.schemasLibre}
            onFreeTextChange={(v) => updateStr('schemasLibre', v)}
            style={{ position: 'absolute', top: 0, right: 0, width: '52%', minHeight: 130 }}
          />

          {/* Row 2 */}
          <DiagramBox
            title="Conséquences :"
            value={data.consequences}
            onChange={(v) => updateStr('consequences', v)}
            placeholder="Renforcement des schémas, ruptures, isolement..."
            style={{ position: 'absolute', top: 220, left: 0, width: '38%', minHeight: 180 }}
            color="#854D0E"
          />
          <ModeSelector
            selectedIds={data.selectedModeIds}
            onToggle={toggleMode}
            freeText={data.strategiesLibre}
            onFreeTextChange={(v) => updateStr('strategiesLibre', v)}
            style={{ position: 'absolute', top: 220, right: 0, width: '52%', minHeight: 180 }}
          />

          {/* Row 3 */}
          <DiagramBox
            title="Comportements :"
            value={data.comportements}
            onChange={(v) => updateStr('comportements', v)}
            placeholder="Retrait, agressivité, dépendance affective..."
            style={{ position: 'absolute', top: 560, left: 0, width: '38%', minHeight: 130 }}
            color="#166534"
          />
          <DiagramBox
            title="Événements déclencheurs actuels :"
            value={data.evenementsDeclencheurs}
            onChange={(v) => updateStr('evenementsDeclencheurs', v)}
            placeholder="Critique du conjoint, absence d'un proche, conflit au travail..."
            style={{ position: 'absolute', top: 480, right: 0, width: '52%', minHeight: 150 }}
            color="#9A3412"
          />

          {/* Row 4 */}
          <DiagramBox
            title="Émotions :"
            value={data.emotions}
            onChange={(v) => updateStr('emotions', v)}
            placeholder="Tristesse, colère, honte, anxiété..."
            style={{ position: 'absolute', top: 770, left: '5%', width: '32%', minHeight: 120 }}
            color="#991B1B"
          />
          <DiagramBox
            title="Pensées automatiques :"
            value={data.penseesAutomatiques}
            onChange={(v) => updateStr('penseesAutomatiques', v)}
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
      className="rounded-xl border-2 bg-white shadow-sm"
      style={{ ...style, borderColor: color }}
    >
      <div className="px-3 py-1.5 rounded-t-[10px]" style={{ backgroundColor: `${color}10` }}>
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

// ---------------------------------------------------------------------------
// SchemaSelector — sélection multi-schémas groupés par domaine + texte libre
// ---------------------------------------------------------------------------

function SchemaSelector({
  selectedIds,
  onToggle,
  freeText,
  onFreeTextChange,
  style,
}: {
  selectedIds: string[];
  onToggle: (id: string) => void;
  freeText: string;
  onFreeTextChange: (v: string) => void;
  style: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const color = '#b8453a';

  const selectedSchemas = selectedIds
    .map((id) => schemas.find((s) => s.id === id))
    .filter(Boolean);

  const schemasByDomain = useMemo(() => {
    return domains.map((d) => ({
      domain: d,
      items: schemas.filter((s) => s.domainId === d.id),
    }));
  }, []);

  return (
    <div
      className="rounded-xl border-2 bg-white shadow-sm"
      style={{ ...style, borderColor: color }}
    >
      <div className="px-3 py-1.5 rounded-t-[10px]" style={{ backgroundColor: `${color}10` }}>
        <h3 className="text-xs font-bold" style={{ color }}>Schémas :</h3>
      </div>
      <div className="px-2 py-1.5">
        {/* Tags des schémas sélectionnés */}
        {selectedSchemas.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {selectedSchemas.map((s) => (
              <span
                key={s!.id}
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium text-white cursor-pointer hover:opacity-80"
                style={{ backgroundColor: domainColors[s!.domainId] || '#64748b' }}
                onClick={() => onToggle(s!.id)}
                title={s!.centralBelief}
              >
                {s!.name}
                <X className="w-2.5 h-2.5" />
              </span>
            ))}
          </div>
        )}
        {/* Bouton dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-2 py-1 rounded-md border border-slate-200 text-[11px] text-slate-500 hover:bg-slate-50"
          >
            <span>+ Ajouter un schéma…</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="fixed z-[100] bg-white border border-slate-200 rounded-lg shadow-xl max-h-72 overflow-y-auto"
              style={{ width: 'min(420px, 90vw)' }}>
              {schemasByDomain.map(({ domain, items }) => (
                <div key={domain.id}>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide sticky top-0 bg-slate-50 border-b border-slate-100"
                    style={{ color: domainColors[domain.id] }}>
                    {domain.name}
                  </div>
                  {items.map((s) => {
                    const checked = selectedIds.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => onToggle(s.id)}
                        className={`w-full text-left px-2 py-1.5 text-[11px] hover:bg-slate-50 flex items-start gap-2 ${checked ? 'bg-red-50/50' : ''}`}
                      >
                        <span className={`mt-0.5 w-3 h-3 rounded border flex-shrink-0 flex items-center justify-center ${checked ? 'bg-red-600 border-red-600 text-white' : 'border-slate-300'}`}>
                          {checked && <span className="text-[8px]">✓</span>}
                        </span>
                        <span>
                          <span className="font-medium text-slate-700">{s.name}</span>
                          <span className="block text-[10px] text-slate-400 leading-tight mt-0.5">{s.centralBelief}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
          {/* Backdrop pour fermer */}
          {open && <div className="fixed inset-0 z-[99]" onClick={() => setOpen(false)} />}
        </div>
        {/* Texte libre */}
        <textarea
          value={freeText}
          onChange={(e) => onFreeTextChange(e.target.value)}
          placeholder="Notes libres…"
          className="w-full mt-1.5 px-2 py-1 text-xs text-slate-700 leading-relaxed resize-none focus:outline-none placeholder:text-slate-300 border-t border-slate-100"
          rows={2}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ModeSelector — sélection multi-modes coping groupés par style + texte libre
// ---------------------------------------------------------------------------

function ModeSelector({
  selectedIds,
  onToggle,
  freeText,
  onFreeTextChange,
  style,
}: {
  selectedIds: string[];
  onToggle: (id: string) => void;
  freeText: string;
  onFreeTextChange: (v: string) => void;
  style: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const color = '#5B21B6';

  const selectedModes = selectedIds
    .map((id) => modes.find((m) => m.id === id))
    .filter(Boolean);

  return (
    <div
      className="rounded-xl border-2 bg-white shadow-sm"
      style={{ ...style, borderColor: color }}
    >
      <div className="px-3 py-1.5 rounded-t-[10px]" style={{ backgroundColor: `${color}10` }}>
        <h3 className="text-xs font-bold" style={{ color }}>Stratégies / Modes :</h3>
      </div>
      <div className="px-2 py-1.5">
        {/* Tags des modes sélectionnés */}
        {selectedModes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {selectedModes.map((m) => {
              const grp = modeGroups.find((g) =>
                g.category === m!.category &&
                (!('styleId' in g) || !g.styleId || m!.copingStyleId === g.styleId)
              );
              return (
                <span
                  key={m!.id}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium text-white cursor-pointer hover:opacity-80"
                  style={{ backgroundColor: grp?.color || '#64748b' }}
                  onClick={() => onToggle(m!.id)}
                >
                  {m!.name}
                  <X className="w-2.5 h-2.5" />
                </span>
              );
            })}
          </div>
        )}
        {/* Bouton dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-2 py-1 rounded-md border border-slate-200 text-[11px] text-slate-500 hover:bg-slate-50"
          >
            <span>+ Ajouter un mode…</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="fixed z-[100] bg-white border border-slate-200 rounded-lg shadow-xl max-h-72 overflow-y-auto"
              style={{ width: 'min(380px, 90vw)' }}>
              {modeGroups.map((group) => {
                const items = getModesByGroup(group);
                if (items.length === 0) return null;
                return (
                  <div key={group.label}>
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide sticky top-0 bg-slate-50 border-b border-slate-100"
                      style={{ color: group.color }}>
                      {group.label}
                    </div>
                    {items.map((m) => {
                      const checked = selectedIds.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          onClick={() => onToggle(m.id)}
                          className={`w-full text-left px-2 py-1.5 text-[11px] hover:bg-slate-50 flex items-start gap-2 ${checked ? 'bg-violet-50/50' : ''}`}
                        >
                          <span className={`mt-0.5 w-3 h-3 rounded border flex-shrink-0 flex items-center justify-center ${checked ? 'bg-violet-600 border-violet-600 text-white' : 'border-slate-300'}`}>
                            {checked && <span className="text-[8px]">✓</span>}
                          </span>
                          <span>
                            <span className="font-medium text-slate-700">{m.name}</span>
                            <span className="block text-[10px] text-slate-400 leading-tight mt-0.5">{m.description.slice(0, 80)}{m.description.length > 80 ? '…' : ''}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
          {/* Backdrop pour fermer */}
          {open && <div className="fixed inset-0 z-[99]" onClick={() => setOpen(false)} />}
        </div>
        {/* Texte libre */}
        <textarea
          value={freeText}
          onChange={(e) => onFreeTextChange(e.target.value)}
          placeholder="Soumission : …&#10;Évitement : …&#10;Compensation : …"
          className="w-full mt-1.5 px-2 py-1 text-xs text-slate-700 leading-relaxed resize-none focus:outline-none placeholder:text-slate-300 border-t border-slate-100"
          rows={2}
        />
      </div>
    </div>
  );
}
