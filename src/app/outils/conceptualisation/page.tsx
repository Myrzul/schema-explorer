'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, RotateCcw, Plus, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ConceptualisationData {
  patientName: string;
  date: string;
  // Section 1: Problèmes actuels
  currentProblems: string;
  // Section 2: Origines dans l'enfance
  childhoodOrigins: string;
  temperament: string;
  // Section 3: Besoins non comblés
  unmetNeeds: string[];
  // Section 4: Schémas identifiés
  schemas: { name: string; intensity: string; notes: string }[];
  // Section 5: Modes
  modes: { name: string; triggers: string; behaviors: string }[];
  // Section 6: Stratégies de coping
  copingStrategies: { style: string; behaviors: string }[];
  // Section 7: Relation thérapeutique
  therapeuticRelation: string;
  // Section 8: Objectifs
  objectives: string;
  // Section 9: Plan de traitement
  treatmentPlan: string;
}

const emptyData: ConceptualisationData = {
  patientName: '',
  date: new Date().toISOString().split('T')[0],
  currentProblems: '',
  childhoodOrigins: '',
  temperament: '',
  unmetNeeds: [''],
  schemas: [{ name: '', intensity: '', notes: '' }],
  modes: [{ name: '', triggers: '', behaviors: '' }],
  copingStrategies: [{ style: '', behaviors: '' }],
  therapeuticRelation: '',
  objectives: '',
  treatmentPlan: '',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConceptualisationPage() {
  const [data, setData] = useState<ConceptualisationData>({ ...emptyData });

  const update = useCallback(<K extends keyof ConceptualisationData>(key: K, value: ConceptualisationData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = () => setData({ ...emptyData, date: new Date().toISOString().split('T')[0] });

  const handleDownloadPDF = () => {
    const w = window.open('', '_blank');
    if (!w) return;

    const needsList = data.unmetNeeds.filter(Boolean).map((n) => `<li>${n}</li>`).join('');
    const schemasRows = data.schemas.filter((s) => s.name).map((s) =>
      `<tr><td style="padding:6px;border:1px solid #ddd">${s.name}</td><td style="padding:6px;border:1px solid #ddd;text-align:center">${s.intensity}</td><td style="padding:6px;border:1px solid #ddd">${s.notes}</td></tr>`
    ).join('');
    const modesRows = data.modes.filter((m) => m.name).map((m) =>
      `<tr><td style="padding:6px;border:1px solid #ddd">${m.name}</td><td style="padding:6px;border:1px solid #ddd">${m.triggers}</td><td style="padding:6px;border:1px solid #ddd">${m.behaviors}</td></tr>`
    ).join('');
    const copingRows = data.copingStrategies.filter((c) => c.style).map((c) =>
      `<tr><td style="padding:6px;border:1px solid #ddd">${c.style}</td><td style="padding:6px;border:1px solid #ddd">${c.behaviors}</td></tr>`
    ).join('');

    w.document.write(`<!DOCTYPE html><html><head><title>Conceptualisation — ${data.patientName || 'Patient'}</title>
    <style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;color:#333;font-size:13px;line-height:1.6}
    h1{font-size:20px;color:#b8453a;margin-bottom:4px}h2{font-size:14px;margin-top:20px;padding-bottom:4px;border-bottom:2px solid #b8453a;color:#b8453a}
    .meta{color:#666;font-size:12px;margin-bottom:16px}
    .section{margin-bottom:12px}
    table{width:100%;border-collapse:collapse;margin:8px 0;font-size:12px}
    th{background:#fef2f0;padding:6px;border:1px solid #ddd;text-align:left;font-weight:600}
    ul{margin:4px 0;padding-left:20px}
    .field{white-space:pre-wrap}
    @media print{body{margin:20px}h2{break-after:avoid}}</style></head><body>
    <h1>Diagramme de Conceptualisation de Cas</h1>
    <p class="meta">${data.patientName ? `Patient : ${data.patientName} — ` : ''}Date : ${data.date}</p>

    <h2>1. Problèmes actuels</h2><div class="field">${data.currentProblems || '—'}</div>

    <h2>2. Origines dans l'enfance</h2><div class="field">${data.childhoodOrigins || '—'}</div>
    ${data.temperament ? `<p><strong>Tempérament :</strong> ${data.temperament}</p>` : ''}

    <h2>3. Besoins émotionnels non comblés</h2>${needsList ? `<ul>${needsList}</ul>` : '<p>—</p>'}

    <h2>4. Schémas identifiés</h2>
    ${schemasRows ? `<table><thead><tr><th>Schéma</th><th>Intensité</th><th>Notes</th></tr></thead><tbody>${schemasRows}</tbody></table>` : '<p>—</p>'}

    <h2>5. Modes de fonctionnement</h2>
    ${modesRows ? `<table><thead><tr><th>Mode</th><th>Déclencheurs</th><th>Comportements</th></tr></thead><tbody>${modesRows}</tbody></table>` : '<p>—</p>'}

    <h2>6. Stratégies de coping</h2>
    ${copingRows ? `<table><thead><tr><th>Style</th><th>Comportements</th></tr></thead><tbody>${copingRows}</tbody></table>` : '<p>—</p>'}

    <h2>7. Dynamique de la relation thérapeutique</h2><div class="field">${data.therapeuticRelation || '—'}</div>

    <h2>8. Objectifs thérapeutiques</h2><div class="field">${data.objectives || '—'}</div>

    <h2>9. Plan de traitement</h2><div class="field">${data.treatmentPlan || '—'}</div>

    <script>window.print()</script></body></html>`);
    w.document.close();
  };

  return (
    <div className="flex-1 overflow-y-auto">
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

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Patient info */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom du patient" value={data.patientName} onChange={(v) => update('patientName', v)} />
          <Field label="Date" value={data.date} onChange={(v) => update('date', v)} type="date" />
        </div>

        {/* 1. Current problems */}
        <Section number={1} title="Problèmes actuels" subtitle="Motif de consultation, symptômes, difficultés relationnelles">
          <TextArea value={data.currentProblems} onChange={(v) => update('currentProblems', v)} placeholder="Décrivez les problèmes actuels du patient..." rows={4} />
        </Section>

        {/* 2. Childhood origins */}
        <Section number={2} title="Origines dans l'enfance" subtitle="Événements marquants, dynamique familiale, traumatismes">
          <TextArea value={data.childhoodOrigins} onChange={(v) => update('childhoodOrigins', v)} placeholder="Histoire de vie, événements clés de l'enfance..." rows={4} />
          <Field label="Tempérament (Cloninger)" value={data.temperament} onChange={(v) => update('temperament', v)} placeholder="Ex : haut évitement du danger, faible recherche de nouveauté..." />
        </Section>

        {/* 3. Unmet needs */}
        <Section number={3} title="Besoins émotionnels non comblés" subtitle="Sécurité, autonomie, limites, expression, spontanéité">
          <DynamicList
            items={data.unmetNeeds}
            onChange={(items) => update('unmetNeeds', items)}
            placeholder="Ex : Sécurité liée à l'attachement"
          />
        </Section>

        {/* 4. Schemas */}
        <Section number={4} title="Schémas identifiés" subtitle="Schémas précoces inadaptés activés">
          <div className="space-y-3">
            {data.schemas.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_1fr_32px] gap-2 items-start">
                <input className="input-field" placeholder="Schéma" value={s.name} onChange={(e) => {
                  const n = [...data.schemas]; n[i] = { ...n[i], name: e.target.value }; update('schemas', n);
                }} />
                <input className="input-field text-center" placeholder="1-6" value={s.intensity} onChange={(e) => {
                  const n = [...data.schemas]; n[i] = { ...n[i], intensity: e.target.value }; update('schemas', n);
                }} />
                <input className="input-field" placeholder="Notes" value={s.notes} onChange={(e) => {
                  const n = [...data.schemas]; n[i] = { ...n[i], notes: e.target.value }; update('schemas', n);
                }} />
                <button onClick={() => { const n = data.schemas.filter((_, j) => j !== i); update('schemas', n.length ? n : [{ name: '', intensity: '', notes: '' }]); }}
                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button onClick={() => update('schemas', [...data.schemas, { name: '', intensity: '', notes: '' }])}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ajouter un schéma
            </button>
          </div>
        </Section>

        {/* 5. Modes */}
        <Section number={5} title="Modes de fonctionnement" subtitle="Modes identifiés, déclencheurs et comportements associés">
          <div className="space-y-3">
            {data.modes.map((m, i) => (
              <div key={i} className="rounded-lg border border-slate-200 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input className="input-field flex-1" placeholder="Mode (ex : Enfant Vulnérable)" value={m.name} onChange={(e) => {
                    const n = [...data.modes]; n[i] = { ...n[i], name: e.target.value }; update('modes', n);
                  }} />
                  <button onClick={() => { const n = data.modes.filter((_, j) => j !== i); update('modes', n.length ? n : [{ name: '', triggers: '', behaviors: '' }]); }}
                    className="text-slate-300 hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input className="input-field w-full" placeholder="Déclencheurs" value={m.triggers} onChange={(e) => {
                  const n = [...data.modes]; n[i] = { ...n[i], triggers: e.target.value }; update('modes', n);
                }} />
                <input className="input-field w-full" placeholder="Comportements observés" value={m.behaviors} onChange={(e) => {
                  const n = [...data.modes]; n[i] = { ...n[i], behaviors: e.target.value }; update('modes', n);
                }} />
              </div>
            ))}
            <button onClick={() => update('modes', [...data.modes, { name: '', triggers: '', behaviors: '' }])}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ajouter un mode
            </button>
          </div>
        </Section>

        {/* 6. Coping */}
        <Section number={6} title="Stratégies de coping" subtitle="Évitement, compensation, soumission">
          <div className="space-y-3">
            {data.copingStrategies.map((c, i) => (
              <div key={i} className="grid grid-cols-[150px_1fr_32px] gap-2 items-start">
                <select className="input-field" value={c.style} onChange={(e) => {
                  const n = [...data.copingStrategies]; n[i] = { ...n[i], style: e.target.value }; update('copingStrategies', n);
                }}>
                  <option value="">Style...</option>
                  <option value="Soumission">Soumission</option>
                  <option value="Évitement">Évitement</option>
                  <option value="Compensation">Compensation</option>
                </select>
                <input className="input-field" placeholder="Comportements concrets" value={c.behaviors} onChange={(e) => {
                  const n = [...data.copingStrategies]; n[i] = { ...n[i], behaviors: e.target.value }; update('copingStrategies', n);
                }} />
                <button onClick={() => { const n = data.copingStrategies.filter((_, j) => j !== i); update('copingStrategies', n.length ? n : [{ style: '', behaviors: '' }]); }}
                  className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button onClick={() => update('copingStrategies', [...data.copingStrategies, { style: '', behaviors: '' }])}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Ajouter une stratégie
            </button>
          </div>
        </Section>

        {/* 7. Therapeutic relation */}
        <Section number={7} title="Relation thérapeutique" subtitle="Schémas activés dans la relation, transfert, contre-transfert">
          <TextArea value={data.therapeuticRelation} onChange={(v) => update('therapeuticRelation', v)} placeholder="Dynamiques relationnelles observées en séance..." rows={3} />
        </Section>

        {/* 8. Objectives */}
        <Section number={8} title="Objectifs thérapeutiques" subtitle="Objectifs à court et long terme">
          <TextArea value={data.objectives} onChange={(v) => update('objectives', v)} placeholder="1. ...\n2. ...\n3. ..." rows={4} />
        </Section>

        {/* 9. Treatment plan */}
        <Section number={9} title="Plan de traitement" subtitle="Techniques et interventions prévues">
          <TextArea value={data.treatmentPlan} onChange={(v) => update('treatmentPlan', v)} placeholder="Phase 1 : ...\nPhase 2 : ..." rows={4} />
        </Section>

        {/* Download button */}
        <div className="pt-4 pb-8">
          <button onClick={handleDownloadPDF}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Télécharger le diagramme en PDF
          </button>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          font-size: 13px;
          color: #334155;
          outline: none;
          transition: border-color 0.15s;
          background: white;
        }
        .input-field:focus { border-color: #94a3b8; }
        .input-field::placeholder { color: #cbd5e1; }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Section({ number, title, subtitle, children }: {
  number: number; title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-3">
        <span className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold border border-red-200 shrink-0">
          {number}
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-800">{title}</h2>
          <p className="text-[11px] text-slate-400">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
        placeholder={placeholder}
      />
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400 resize-y leading-relaxed"
    />
  );
}

function DynamicList({ items, onChange, placeholder }: {
  items: string[]; onChange: (items: string[]) => void; placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
            placeholder={placeholder}
            value={item}
            onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
          />
          <button onClick={() => { const n = items.filter((_, j) => j !== i); onChange(n.length ? n : ['']); }}
            className="text-slate-300 hover:text-red-400 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])}
        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
        <Plus className="w-3.5 h-3.5" /> Ajouter
      </button>
    </div>
  );
}
