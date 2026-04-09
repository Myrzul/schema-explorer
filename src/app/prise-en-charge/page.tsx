'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Target,
  BookOpen,
  Brain,
  Puzzle,
  Swords,
  HandHelping,
  Play,
  UserCog,
  Stethoscope,
} from 'lucide-react';
import {
  therapyPhases,
  evToAsPathway,
  modeGuidances,
  clinicalProtocols,
} from '@/data/clinical-guide';
import { techniques, techniqueCategories } from '@/data/techniques';
import type { TherapeuticTechnique } from '@/types';

// ---------------------------------------------------------------------------
// Shared ExpandableCard (same pattern as Fiches)
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
// Tabs
// ---------------------------------------------------------------------------

const tabs = [
  { id: 'parcours', label: 'Parcours', icon: <Play className="w-4 h-4" /> },
  { id: 'modes', label: 'Par mode', icon: <Target className="w-4 h-4" /> },
  { id: 'protocoles', label: 'Protocoles', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'techniques', label: 'Techniques (25)', icon: <Stethoscope className="w-4 h-4" /> },
  { id: 'cascade', label: 'Cascade', icon: <ChevronRight className="w-4 h-4" /> },
] as const;

type TabId = (typeof tabs)[number]['id'];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PriseEnChargePage() {
  const [activeTab, setActiveTab] = useState<TabId>('parcours');

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Prise en charge</h1>
          <p className="text-sm text-slate-500">
            Guide clinique — Phases, protocoles, techniques et outils pour
            accompagner le patient de l&apos;Enfant Vulnérable vers
            l&apos;Adulte Sain.
          </p>
        </div>

        {/* Tabs — identical to Fiches */}
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

        {/* Content */}
        {activeTab === 'parcours' && <ParcoursTab />}
        {activeTab === 'modes' && <ModesTab />}
        {activeTab === 'protocoles' && <ProtocolesTab />}
        {activeTab === 'techniques' && <TechniquesGroupedView />}
        {activeTab === 'cascade' && <CascadeTab />}
      </div>

      {/* Section Supervision — toujours visible en bas */}
      <SupervisionSection />
    </div>
  );
}

// ===========================================================================
// TAB 1 : Parcours thérapeutique
// ===========================================================================

function ParcoursTab() {
  return (
    <div className="space-y-10">
      {/* Timeline des 5 phases */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-100 text-indigo-700">
            <Play className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Les 5 phases de la thérapie</h2>
            <p className="text-xs text-slate-400">Déroulement chronologique de la prise en charge</p>
          </div>
        </div>
        <div className="space-y-3">
          {therapyPhases.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
      </section>

      {/* Parcours EV → AS */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-100 text-violet-700">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Parcours : Enfant Vulnérable &rarr; Adulte Sain
            </h2>
            <p className="text-xs text-slate-400">Le chemin clinique en 8 étapes</p>
          </div>
        </div>
        <div className="mt-4">
          {evToAsPathway.map((step, i) => (
            <PathwayStepCard key={step.id} step={step} isLast={i === evToAsPathway.length - 1} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PhaseCard({ phase }: { phase: (typeof therapyPhases)[number] }) {
  return (
    <ExpandableCard
      header={
        <div className="flex items-center gap-3">
          <span className="text-lg">{phase.icon}</span>
          <span className="font-semibold text-sm" style={{ color: phase.color }}>
            {phase.name}
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">{phase.objective}</span>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <p className="text-slate-600 leading-relaxed">{phase.description}</p>

        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Outils et instruments</h4>
          <ul className="space-y-1">
            {phase.tools.map((tool, i) => (
              <li key={i} className="text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: phase.color }} />
                {tool}
              </li>
            ))}
          </ul>
        </div>

        {phase.instrumentLinks && phase.instrumentLinks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {phase.instrumentLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-medium hover:bg-slate-50"
                style={{ borderColor: phase.color, color: phase.color }}
              >
                <ExternalLink className="w-3 h-3" />
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </ExpandableCard>
  );
}

function PathwayStepCard({
  step,
  isLast,
}: {
  step: (typeof evToAsPathway)[number];
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: step.color }}
        >
          {step.order}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-8 my-1" style={{ backgroundColor: `${step.color}40` }} />
        )}
      </div>
      <div className="pb-6">
        <h3 className="font-bold text-sm" style={{ color: step.color }}>
          {step.label}
        </h3>
        <p className="text-[10px] text-slate-400 mt-0.5">Mode cible : {step.targetMode}</p>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">{step.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {step.tools.map((t, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
              style={{ borderColor: `${step.color}60`, color: step.color, backgroundColor: `${step.color}10` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// TAB 2 : Travailler par mode
// ===========================================================================

function ModesTab() {
  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-500 leading-relaxed">
        Pour chaque mode actif chez votre patient, retrouvez les approches
        recommandées, les pièges à éviter et les indicateurs de progression.
      </p>
      {modeGuidances.map((mg) => (
        <ModeGuidanceCard key={mg.modeId} guidance={mg} />
      ))}
    </div>
  );
}

function ModeGuidanceCard({ guidance }: { guidance: (typeof modeGuidances)[number] }) {
  const linkedProtocols = clinicalProtocols.filter((p) =>
    guidance.protocolIds.includes(p.id)
  );

  return (
    <ExpandableCard
      header={
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${guidance.color}15`, color: guidance.color }}
          >
            <Brain className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-800 text-sm">{guidance.modeName}</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">{guidance.category}</span>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <p className="text-slate-600 leading-relaxed">{guidance.objective}</p>

        {/* Approches — encadré vert */}
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <h4 className="text-[11px] font-semibold uppercase text-emerald-700 mb-1.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approches recommandées
          </h4>
          <ul className="space-y-1">
            {guidance.approaches.map((a, i) => (
              <li key={i} className="text-xs text-emerald-900 leading-relaxed flex items-start gap-1.5">
                <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Pièges — encadré ambre */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <h4 className="text-[11px] font-semibold uppercase text-amber-700 mb-1.5 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Pièges à éviter
          </h4>
          <ul className="space-y-1">
            {guidance.pitfalls.map((p, i) => (
              <li key={i} className="text-xs text-amber-800 leading-relaxed flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5 shrink-0">!</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Indicateurs — encadré bleu */}
        <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
          <h4 className="text-[11px] font-semibold uppercase text-sky-700 mb-1.5 flex items-center gap-1">
            <Target className="w-3.5 h-3.5" /> Indicateurs de progression
          </h4>
          <ul className="space-y-1">
            {guidance.indicators.map((ind, i) => (
              <li key={i} className="text-xs text-sky-900 leading-relaxed flex items-start gap-1.5">
                <span className="text-sky-500 mt-0.5 shrink-0">&rarr;</span>
                {ind}
              </li>
            ))}
          </ul>
        </div>

        {/* Protocoles liés */}
        {linkedProtocols.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-1">Protocoles associés</h4>
            <div className="flex flex-wrap gap-1.5">
              {linkedProtocols.map((p) => (
                <span
                  key={p.id}
                  className="text-[11px] px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-medium"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Lien fiches */}
        <Link
          href="/fiches"
          className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
          style={{ color: guidance.color }}
        >
          <ExternalLink className="w-3 h-3" />
          Voir la fiche du mode
        </Link>
      </div>
    </ExpandableCard>
  );
}

// ===========================================================================
// TAB 3 : Protocoles cliniques
// ===========================================================================

function ProtocolesTab() {
  const therapeuticProtocols = clinicalProtocols.filter((p) => p.id !== 'gerer-schemas-therapeute');

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 leading-relaxed mb-3">
        Protocoles pas-à-pas avec les phrases exactes à utiliser en séance.
      </p>
      {therapeuticProtocols.map((protocol) => (
        <ProtocolCard key={protocol.id} protocol={protocol} />
      ))}
    </div>
  );
}

function ProtocolCard({ protocol }: { protocol: (typeof clinicalProtocols)[number] }) {
  const phaseLabels = therapyPhases
    .filter((p) => protocol.phaseIds.includes(p.id))
    .map((p) => p.name);

  return (
    <ExpandableCard
      header={
        <div className="flex items-center gap-3 flex-wrap">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span className="font-semibold text-slate-800 text-sm">{protocol.name}</span>
          {phaseLabels.map((label) => (
            <span key={label} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-medium">
              {label}
            </span>
          ))}
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <p className="text-slate-600 leading-relaxed">{protocol.summary}</p>

        {/* Instructions patient */}
        <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
          <h4 className="text-[11px] font-semibold uppercase text-sky-700 mb-1">Instructions pour le patient</h4>
          <p className="text-xs text-sky-900 leading-relaxed italic">
            &laquo; {protocol.patientInstructions} &raquo;
          </p>
        </div>

        {/* Étapes */}
        <div>
          <h4 className="text-[11px] font-semibold uppercase text-slate-400 mb-2">
            Script clinique — Instructions thérapeute
          </h4>
          <div className="space-y-2">
            {protocol.steps.map((step, i) => (
              <ProtocolStepItem key={i} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Liens */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
          <Link
            href="/outils/conceptualisation"
            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
          >
            <ExternalLink className="w-3 h-3" /> Diagramme de conceptualisation
          </Link>
          <Link
            href="/fiches"
            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
          >
            <ExternalLink className="w-3 h-3" /> Fiches schémas et modes
          </Link>
        </div>
      </div>
    </ExpandableCard>
  );
}

function ProtocolStepItem({
  step,
  index,
}: {
  step: { type: string; text: string };
  index: number;
}) {
  if (step.type === 'verbatim') {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
        <p className="text-xs text-emerald-800 italic leading-relaxed">{step.text}</p>
      </div>
    );
  }
  if (step.type === 'note') {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
        <p className="text-xs text-amber-800 leading-relaxed flex items-start gap-1.5">
          <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
          {step.text}
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2 px-1 py-0.5">
      <span className="text-[10px] font-mono text-slate-400 mt-0.5 shrink-0 w-4 text-right">
        {index + 1}.
      </span>
      <p className="text-xs text-slate-700 leading-relaxed">{step.text}</p>
    </div>
  );
}

// ===========================================================================
// TAB 4 : Techniques (identique au Fiches)
// ===========================================================================

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

// ===========================================================================
// TAB 5 : Cascade
// ===========================================================================

function CascadeTab() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 leading-relaxed">
        Le simulateur de cascade montre comment un événement déclencheur
        active un schéma, qui active un mode, qui produit un comportement.
      </p>
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <Play className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-800 mb-2">
          Simulateur de cascade
        </h3>
        <p className="text-sm text-slate-500 mb-5 max-w-md mx-auto">
          Visualisez pas-à-pas le processus d&apos;activation des schémas
          avec 3 profils cliniques illustratifs.
        </p>
        <Link
          href="/cascade"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          Ouvrir le simulateur
        </Link>
      </div>
    </div>
  );
}

// ===========================================================================
// SECTION SUPERVISION (bas de page, fond teal)
// ===========================================================================

function SupervisionSection() {
  const [open, setOpen] = useState(false);
  const protocol = clinicalProtocols.find((p) => p.id === 'gerer-schemas-therapeute');
  if (!protocol) return null;

  return (
    <div className="bg-teal-50 border-t-2 border-teal-300">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-4 text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <UserCog className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-teal-800">
              Pour le thérapeute : Gérer ses propres schémas
            </h2>
            <p className="text-xs text-teal-600 mt-0.5">
              Exercice de supervision en binôme — contre-transfert schématique.
            </p>
          </div>
          {open ? (
            <ChevronUp className="w-4 h-4 text-teal-500 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-teal-500 shrink-0" />
          )}
        </button>

        {open && (
          <div className="mt-4 bg-white rounded-xl border border-teal-200 p-5 space-y-4">
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-3">
              <h4 className="text-[11px] font-semibold uppercase text-teal-700 mb-1">
                Instructions pour le thérapeute supervisé
              </h4>
              <p className="text-xs text-teal-800 italic leading-relaxed">
                &laquo; {protocol.patientInstructions} &raquo;
              </p>
            </div>

            <h4 className="text-[11px] font-semibold uppercase text-slate-400">
              Script pour le superviseur
            </h4>
            <div className="space-y-2">
              {protocol.steps.map((step, i) => (
                <ProtocolStepItem key={i} step={step} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
