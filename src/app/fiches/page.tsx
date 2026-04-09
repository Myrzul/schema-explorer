'use client';

import { useState } from 'react';
import { schemas, modes, disorders, domains, copingStyles, techniques, techniqueCategories } from '@/data';
import { domainColors, modeCategoryColors } from '@/lib/colors';
import type { Schema, SchemaMode, PersonalityDisorder, TherapeuticTechnique } from '@/types';
import { BookOpen, Brain, Users, Puzzle, Stethoscope, ChevronDown, ChevronUp, Shield, Swords, HandHelping, AlertTriangle } from 'lucide-react';
import type { CopingStyleId } from '@/types';

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

type TabId = 'schemas' | 'modes' | 'troubles';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'schemas', label: 'Schémas (18)', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'modes', label: 'Modes (22)', icon: <Brain className="w-4 h-4" /> },
  { id: 'troubles', label: 'Troubles TP (8)', icon: <Users className="w-4 h-4" /> },
];

// ---------------------------------------------------------------------------
// Expandable card wrapper
// ---------------------------------------------------------------------------

function ExpandableCard({
  children,
  header,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-shadow hover:shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <div className="flex-1">{header}</div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Schema Card
// ---------------------------------------------------------------------------

function SchemaCard({ schema }: { schema: Schema }) {
  const dc = domainColors[schema.domainId];
  const domain = domains.find((d) => d.id === schema.domainId);

  return (
    <ExpandableCard
      header={
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-400">{schema.code}</span>
          <span className="font-semibold text-slate-800 text-sm">{schema.name}</span>
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
            style={{ backgroundColor: dc.bg, borderColor: dc.border, color: dc.text }}
          >
            {domain?.name}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${
              schema.type === 'conditionnel'
                ? 'border-dashed border-slate-300 text-slate-400'
                : 'border-slate-400 text-slate-600'
            }`}
          >
            {schema.type === 'conditionnel' ? 'Conditionnel' : 'Inconditionnel'}
          </span>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Croyance centrale</h4>
          <p className="italic text-slate-700">&laquo; {schema.centralBelief} &raquo;</p>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Description</h4>
          <p className="text-slate-600 leading-relaxed">{schema.description}</p>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-2">Réponses de coping</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {(['soumission', 'evitement', 'compensation'] as const).map((style) => (
              <div key={style} className="rounded-lg border border-slate-200 p-2.5 bg-slate-50">
                <div className="font-semibold text-slate-600 capitalize mb-1">
                  {copingStyles.find((c) => c.id === style)?.name ?? style}
                </div>
                <p className="text-slate-500">{schema.copingResponses[style]}</p>
              </div>
            ))}
          </div>
        </div>

        {schema.modeIds.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Modes associés</h4>
            <div className="flex flex-wrap gap-1">
              {schema.modeIds.map((id) => {
                const m = modes.find((mo) => mo.id === id);
                const mc = m ? modeCategoryColors[m.category] : null;
                return (
                  <span
                    key={id}
                    className="text-[11px] px-2 py-0.5 rounded-full border"
                    style={mc ? { backgroundColor: mc.bg, borderColor: mc.border, color: mc.text } : {}}
                  >
                    {m?.name ?? id}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {schema.disorderIds && schema.disorderIds.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Troubles associés</h4>
            <div className="flex flex-wrap gap-1">
              {schema.disorderIds.map((id) => {
                const d = disorders.find((dd) => dd.id === id);
                return (
                  <span key={id} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-600">
                    {d?.name ?? id}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {schema.clinicalNotes && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Notes cliniques</h4>
            <p className="text-xs text-slate-500 italic leading-relaxed">{schema.clinicalNotes}</p>
          </div>
        )}
      </div>
    </ExpandableCard>
  );
}

// ---------------------------------------------------------------------------
// Mode Card
// ---------------------------------------------------------------------------

function ModeCard({ mode }: { mode: SchemaMode }) {
  const mc = modeCategoryColors[mode.category];
  const categoryLabels: Record<string, string> = {
    enfant: 'Mode Enfant',
    'coping-dysfonctionnel': 'Mode Coping',
    'parent-dysfonctionnel': 'Mode Parent',
    sain: 'Mode Sain',
  };

  return (
    <ExpandableCard
      header={
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-800 text-sm">{mode.name}</span>
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
            style={{ backgroundColor: mc.bg, borderColor: mc.border, color: mc.text }}
          >
            {categoryLabels[mode.category] ?? mode.category}
          </span>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Affect dominant</h4>
          <p className="text-slate-700">{mode.affect}</p>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Description</h4>
          <p className="text-slate-600 leading-relaxed">{mode.description}</p>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Notes cliniques</h4>
          <p className="text-xs text-slate-500 italic leading-relaxed">{mode.clinicalNotes}</p>
        </div>

        {mode.therapeuticGoal && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Objectif thérapeutique</h4>
            <p className="text-slate-600">{mode.therapeuticGoal}</p>
          </div>
        )}

        {mode.recognitionCues && mode.recognitionCues.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Indices de reconnaissance</h4>
            <div className="space-y-2">
              {mode.recognitionCues.map((cue, i) => (
                <div key={i} className="text-xs bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <p><span className="font-medium text-slate-600">Q :</span> {cue.question}</p>
                  <p><span className="font-medium text-slate-600">R :</span> {cue.response}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode.schemaIds.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Schémas associés</h4>
            <div className="flex flex-wrap gap-1">
              {mode.schemaIds.map((id) => {
                const s = schemas.find((sc) => sc.id === id);
                const sdc = s ? domainColors[s.domainId] : null;
                return (
                  <span
                    key={id}
                    className="text-[11px] px-2 py-0.5 rounded-full border"
                    style={sdc ? { backgroundColor: sdc.bg, borderColor: sdc.border, color: sdc.text } : {}}
                  >
                    {s ? `${s.code} ${s.name}` : id}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ExpandableCard>
  );
}

// ---------------------------------------------------------------------------
// Disorder Card
// ---------------------------------------------------------------------------

function DisorderCard({ disorder }: { disorder: PersonalityDisorder }) {
  return (
    <ExpandableCard
      header={
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-800 text-sm">{disorder.name}</span>
          <span className="text-[10px] text-slate-400">
            {disorder.specificModes.length} modes spécifiques
          </span>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Schémas dominants</h4>
          <div className="flex flex-wrap gap-1">
            {disorder.dominantSchemaIds.map((id) => {
              const s = schemas.find((sc) => sc.id === id);
              const sdc = s ? domainColors[s.domainId] : null;
              return (
                <span
                  key={id}
                  className="text-[11px] px-2 py-0.5 rounded-full border"
                  style={sdc ? { backgroundColor: sdc.bg, borderColor: sdc.border, color: sdc.text } : {}}
                >
                  {s ? `${s.code} ${s.name}` : id}
                </span>
              );
            })}
          </div>
        </div>

        {disorder.activeModeIds.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Modes actifs</h4>
            <div className="flex flex-wrap gap-1">
              {disorder.activeModeIds.map((id) => {
                const m = modes.find((mo) => mo.id === id);
                const mc = m ? modeCategoryColors[m.category] : null;
                return (
                  <span
                    key={id}
                    className="text-[11px] px-2 py-0.5 rounded-full border"
                    style={mc ? { backgroundColor: mc.bg, borderColor: mc.border, color: mc.text } : {}}
                  >
                    {m?.name ?? id}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Style de coping dominant</h4>
          <p className="text-slate-600">{disorder.dominantCopingStyle}</p>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Dynamique modale</h4>
          <p className="text-slate-600 leading-relaxed">{disorder.modalDynamic}</p>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Adulte Sain</h4>
          <p className="text-slate-600">{disorder.healthyAdultStatus}</p>
        </div>

        {disorder.specificModes.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-2">Modes spécifiques</h4>
            <div className="space-y-3">
              {disorder.specificModes.map((sm) => {
                const baseMode = modes.find((m) => m.id === sm.baseModeId);
                const mc = baseMode ? modeCategoryColors[baseMode.category] : null;
                return (
                  <div
                    key={sm.id}
                    className="rounded-lg border p-3 text-xs"
                    style={mc ? { borderColor: mc.border, backgroundColor: `${mc.bg}40` } : {}}
                  >
                    <div className="font-semibold text-slate-800 mb-1">{sm.name}</div>
                    <p className="text-slate-600 mb-1.5">{sm.description}</p>
                    <p className="text-slate-500 italic">{sm.clinicalNotes}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {disorder.clinicalNotes && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Notes cliniques</h4>
            <p className="text-xs text-slate-500 italic leading-relaxed">{disorder.clinicalNotes}</p>
          </div>
        )}
      </div>
    </ExpandableCard>
  );
}

// ---------------------------------------------------------------------------
// Technique Card
// ---------------------------------------------------------------------------

function TechniqueCard({ technique }: { technique: TherapeuticTechnique }) {
  return (
    <ExpandableCard
      header={
        <div className="flex items-center gap-3">
          <Puzzle className="w-4 h-4 text-fuchsia-500" />
          <span className="font-semibold text-slate-800 text-sm">{technique.name}</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">{technique.target}</span>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Cible</h4>
          <p className="text-slate-600">{technique.target}</p>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Mécanisme</h4>
          <p className="text-slate-600 leading-relaxed">{technique.mechanism}</p>
        </div>
        {technique.howTo && (
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
            <h4 className="text-[11px] font-semibold uppercase text-sky-700 mb-1">Comment l&apos;utiliser</h4>
            <p className="text-xs text-sky-900 leading-relaxed">{technique.howTo}</p>
          </div>
        )}
        {technique.whyUse && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <h4 className="text-[11px] font-semibold uppercase text-emerald-700 mb-1">Pourquoi l&apos;utiliser</h4>
            <p className="text-xs text-emerald-900 leading-relaxed">{technique.whyUse}</p>
          </div>
        )}
        {technique.warnings && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <h4 className="text-[11px] font-semibold uppercase text-amber-700 mb-1">Précautions</h4>
            <p className="text-xs text-amber-800 leading-relaxed">{technique.warnings}</p>
          </div>
        )}
      </div>
    </ExpandableCard>
  );
}

// ---------------------------------------------------------------------------
// Modes Grouped View — by category + coping strategy
// ---------------------------------------------------------------------------

const copingStrategyMeta: Record<CopingStyleId, { label: string; subtitle: string; icon: React.ReactNode; color: string; bgColor: string; borderColor: string }> = {
  evitement: {
    label: 'Modes d\'Évitement',
    subtitle: 'Stratégie de Fuite — Apaiser ou fuir les émotions douloureuses de l\'Enfant Vulnérable',
    icon: <Shield className="w-5 h-5" />,
    color: '#5B21B6',
    bgColor: '#F5F3FF',
    borderColor: '#A78BFA',
  },
  compensation: {
    label: 'Modes Compensateurs',
    subtitle: 'Stratégie de Combat — Agir à l\'opposé du schéma pour compenser les manques',
    icon: <Swords className="w-5 h-5" />,
    color: '#9A3412',
    bgColor: '#FFF7ED',
    borderColor: '#F97316',
  },
  soumission: {
    label: 'Mode de Soumission',
    subtitle: 'Stratégie de Figement — Accepter le schéma et ressentir directement la douleur',
    icon: <HandHelping className="w-5 h-5" />,
    color: '#1E40AF',
    bgColor: '#EFF6FF',
    borderColor: '#60A5FA',
  },
};

function ModesGroupedView() {
  const enfantModes = modes.filter((m) => m.category === 'enfant');
  const evitementModes = modes.filter((m) => m.category === 'coping-dysfonctionnel' && m.copingStyleId === 'evitement');
  const compensationModes = modes.filter((m) => m.category === 'coping-dysfonctionnel' && m.copingStyleId === 'compensation');
  const soumissionModes = modes.filter((m) => m.category === 'coping-dysfonctionnel' && m.copingStyleId === 'soumission');
  const parentModes = modes.filter((m) => m.category === 'parent-dysfonctionnel');
  const sainModes = modes.filter((m) => m.category === 'sain');

  return (
    <div className="space-y-8">
      {/* Modes Enfant */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DBEAFE', color: '#1E40AF' }}>
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Modes Enfant</h2>
            <p className="text-xs text-slate-400">Persistance d&apos;états émotionnels infantiles intenses</p>
          </div>
        </div>
        <div className="space-y-3">
          {enfantModes.map((mode) => <ModeCard key={mode.id} mode={mode} />)}
        </div>
      </section>

      {/* Modes Coping — 3 strategies */}
      <section>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E9D5FF', color: '#5B21B6' }}>
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Modes de Coping (Modes Stratégiques)</h2>
            <p className="text-xs text-slate-400">Systèmes de défense face aux schémas : fuite, combat ou figement</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-5 ml-10">
          Ces modes sont des tentatives d&apos;adaptation développées dans l&apos;enfance pour protéger l&apos;individu
          ou satisfaire ses besoins face à son environnement.
        </p>

        <div className="space-y-6">
          {/* Évitement */}
          {renderCopingStrategy('evitement', evitementModes)}
          {/* Compensation */}
          {renderCopingStrategy('compensation', compensationModes)}
          {/* Soumission */}
          {renderCopingStrategy('soumission', soumissionModes)}
        </div>
      </section>

      {/* Modes Parent Dysfonctionnel */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FECACA', color: '#991B1B' }}>
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Modes Parent Dysfonctionnel</h2>
            <p className="text-xs text-slate-400">Internalisation des fonctionnements parentaux pathologiques</p>
          </div>
        </div>
        <div className="space-y-3">
          {parentModes.map((mode) => <ModeCard key={mode.id} mode={mode} />)}
        </div>
      </section>

      {/* Adulte Sain */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Mode Adulte Sain</h2>
            <p className="text-xs text-slate-400">Le mode que le thérapeute incarne et aide le patient à développer</p>
          </div>
        </div>
        <div className="space-y-3">
          {sainModes.map((mode) => <ModeCard key={mode.id} mode={mode} />)}
        </div>
      </section>
    </div>
  );
}

function renderCopingStrategy(strategyId: CopingStyleId, strategyModes: SchemaMode[]) {
  const meta = copingStrategyMeta[strategyId];
  const style = copingStyles.find((c) => c.id === strategyId);
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: meta.borderColor, backgroundColor: meta.bgColor }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span style={{ color: meta.color }}>{meta.icon}</span>
        <h3 className="font-bold text-sm" style={{ color: meta.color }}>{meta.label}</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium" style={{ borderColor: meta.borderColor, color: meta.color }}>
          {style?.metaphor}
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-4 ml-7">{meta.subtitle}</p>
      <div className="space-y-3">
        {strategyModes.map((mode) => <ModeCard key={mode.id} mode={mode} />)}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Techniques Grouped View — by category
// ---------------------------------------------------------------------------

const categoryIcons: Record<string, React.ReactNode> = {
  evaluation: <BookOpen className="w-4 h-4" />,
  emotionnel: <Brain className="w-4 h-4" />,
  cognitif: <Puzzle className="w-4 h-4" />,
  comportemental: <Swords className="w-4 h-4" />,
  relationnel: <HandHelping className="w-4 h-4" />,
};

function TechniquesGroupedView() {
  return (
    <div className="space-y-8">
      {techniqueCategories.map((cat) => {
        const catTechniques = techniques.filter((t) => t.categoryId === cat.id);
        if (catTechniques.length === 0) return null;
        return (
          <section key={cat.id}>
            <div
              className="rounded-xl border p-4 mb-3"
              style={{ borderColor: cat.borderColor, backgroundColor: cat.bgColor }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span style={{ color: cat.color }}>{categoryIcons[cat.id]}</span>
                <h2 className="font-bold text-sm" style={{ color: cat.color }}>
                  {cat.name}
                </h2>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                  style={{ borderColor: cat.borderColor, color: cat.color }}
                >
                  {catTechniques.length} techniques
                </span>
              </div>
              <p className="text-xs text-slate-500 ml-7">{cat.description}</p>
            </div>
            <div className="space-y-3">
              {catTechniques.map((t) => (
                <TechniqueCard key={t.id} technique={t} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Domain filter for schemas
// ---------------------------------------------------------------------------

function DomainFilter({
  activeDomain,
  onSelect,
}: {
  activeDomain: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onSelect(null)}
        className={`text-xs px-3 py-1 rounded-full border transition-colors ${
          !activeDomain
            ? 'bg-slate-900 text-white border-slate-900'
            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
        }`}
      >
        Tous
      </button>
      {domains.map((d) => {
        const dc = domainColors[d.id];
        const active = activeDomain === d.id;
        return (
          <button
            key={d.id}
            onClick={() => onSelect(active ? null : d.id)}
            className="text-xs px-3 py-1 rounded-full border transition-colors"
            style={{
              backgroundColor: active ? dc.bg : 'white',
              borderColor: active ? dc.border : '#E2E8F0',
              color: active ? dc.text : '#64748B',
            }}
          >
            {d.name}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function FichesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('schemas');
  const [domainFilter, setDomainFilter] = useState<string | null>(null);

  const filteredSchemas = domainFilter
    ? schemas.filter((s) => s.domainId === domainFilter)
    : schemas;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Fiches Détaillées</h1>
          <p className="text-sm text-slate-500">
            Consultez les fiches descriptives de chaque concept du modèle de Young.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schemas tab */}
        {activeTab === 'schemas' && (
          <div>
            <DomainFilter activeDomain={domainFilter} onSelect={setDomainFilter} />
            <div className="space-y-3">
              {filteredSchemas.map((schema) => (
                <SchemaCard key={schema.id} schema={schema} />
              ))}
            </div>
          </div>
        )}

        {/* Modes tab */}
        {activeTab === 'modes' && (
          <ModesGroupedView />
        )}

        {/* Disorders tab */}
        {activeTab === 'troubles' && (
          <div className="space-y-3">
            {/* DSM-5-TR Warning */}
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 mb-2">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-800">
                    Avertissement — Classification DSM-5-TR
                  </h3>
                  <p className="text-xs text-amber-700 leading-relaxed mt-1">
                    La thérapie des schémas utilise une conceptualisation
                    <strong> dimensionnelle et transcatégorielle</strong> des
                    troubles de la personnalité. Les catégories présentées ici
                    correspondent à la section II du DSM-5-TR (modèle
                    catégoriel classique). Le modèle alternatif de la section III
                    (AMPD) propose une approche dimensionnelle plus compatible
                    avec le modèle de Young. Ces fiches sont fournies à titre
                    <strong> indicatif et pédagogique</strong> — un diagnostic
                    de trouble de la personnalité requiert une évaluation
                    clinique approfondie.
                  </p>
                </div>
              </div>
            </div>
            {disorders.map((disorder) => (
              <DisorderCard key={disorder.id} disorder={disorder} />
            ))}
          </div>
        )}

        {/* Techniques moved to Prise en charge */}
      </div>
    </div>
  );
}
