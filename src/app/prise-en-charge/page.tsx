'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Target,
  BookOpen,
  Lightbulb,
  Play,
  UserCog,
} from 'lucide-react';
import {
  therapyPhases,
  evToAsPathway,
  modeGuidances,
  clinicalProtocols,
} from '@/data/clinical-guide';
import { techniques, techniqueCategories } from '@/data/techniques';

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

const tabs = [
  { id: 'parcours', label: 'Parcours thérapeutique', icon: Play },
  { id: 'modes', label: 'Travailler par mode', icon: Target },
  { id: 'protocoles', label: 'Protocoles cliniques', icon: BookOpen },
  { id: 'techniques', label: 'Techniques (25)', icon: Lightbulb },
  { id: 'cascade', label: 'Simulateur cascade', icon: ChevronRight },
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
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Prise en charge
          </h1>
          <p className="text-sm text-slate-500">
            Guide clinique interactif — Phases, protocoles, techniques et
            outils pour accompagner le patient de l&apos;Enfant Vulnérable vers
            l&apos;Adulte Sain.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center whitespace-nowrap ${
                  active
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'parcours' && <ParcoursTab />}
        {activeTab === 'modes' && <ModesTab />}
        {activeTab === 'protocoles' && <ProtocolesTab />}
        {activeTab === 'techniques' && <TechniquesTab />}
        {activeTab === 'cascade' && <CascadeTab />}
      </div>

      {/* Section Supervision — toujours visible en bas */}
      <SupervisionSection />
    </div>
  );
}

// ===========================================================================
// TAB 1 : Parcours thérapeutique (phases + flowchart EV → AS)
// ===========================================================================

function ParcoursTab() {
  return (
    <div className="space-y-12">
      {/* Timeline des 5 phases */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Les 5 phases de la thérapie des schémas
        </h2>
        <div className="space-y-4">
          {therapyPhases.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
      </section>

      {/* Parcours EV → AS */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          Parcours : de l&apos;Enfant Vulnérable vers l&apos;Adulte Sain
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Le chemin clinique pour accéder à la vulnérabilité, guérir les
          blessures et construire l&apos;autonomie de l&apos;Adulte Sain.
        </p>
        <div className="relative">
          {evToAsPathway.map((step, i) => (
            <PathwayStepCard key={step.id} step={step} isLast={i === evToAsPathway.length - 1} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PhaseCard({ phase }: { phase: (typeof therapyPhases)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 mt-0.5"
          style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
        >
          {phase.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800" style={{ color: phase.color }}>
              {phase.name}
            </h3>
          </div>
          <p className="text-sm text-slate-600 mt-0.5">{phase.objective}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{phase.description}</p>

          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Outils et instruments
          </h4>
          <ul className="space-y-1 mb-4">
            {phase.tools.map((tool, i) => (
              <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: phase.color }} />
                {tool}
              </li>
            ))}
          </ul>

          {phase.instrumentLinks && phase.instrumentLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {phase.instrumentLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-slate-50"
                  style={{ borderColor: phase.color, color: phase.color }}
                >
                  <ExternalLink className="w-3 h-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
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
      {/* Vertical line + dot */}
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
      {/* Content */}
      <div className={`pb-6 ${isLast ? '' : ''}`}>
        <h3 className="font-bold text-sm" style={{ color: step.color }}>
          {step.label}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 italic">Mode cible : {step.targetMode}</p>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">{step.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {step.tools.map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium text-white"
              style={{ backgroundColor: step.color }}
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
      <p className="text-sm text-slate-500">
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
  const [open, setOpen] = useState(false);

  const linkedProtocols = clinicalProtocols.filter((p) =>
    guidance.protocolIds.includes(p.id)
  );

  return (
    <div className="bg-white rounded-xl border-2 shadow-sm" style={{ borderColor: guidance.color }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50/50 transition-colors"
      >
        <div
          className="w-3 h-3 rounded-full mt-1.5 shrink-0"
          style={{ backgroundColor: guidance.color }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800">{guidance.modeName}</h3>
          <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{guidance.objective}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 border-t pt-4 space-y-5" style={{ borderColor: `${guidance.color}30` }}>
          {/* Objectif */}
          <div>
            <p className="text-sm text-slate-700 leading-relaxed">{guidance.objective}</p>
          </div>

          {/* Approches */}
          <div>
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approches recommandées
            </h4>
            <ul className="space-y-1.5">
              {guidance.approaches.map((a, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Pièges */}
          <div>
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-700 mb-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Pièges à éviter
            </h4>
            <ul className="space-y-1.5">
              {guidance.pitfalls.map((p, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">!</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Indicateurs */}
          <div>
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-blue-700 mb-2">
              <Target className="w-3.5 h-3.5" /> Indicateurs de progression
            </h4>
            <ul className="space-y-1.5">
              {guidance.indicators.map((ind, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5 shrink-0">&rarr;</span>
                  {ind}
                </li>
              ))}
            </ul>
          </div>

          {/* Protocoles liés */}
          {linkedProtocols.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                Protocoles associés
              </h4>
              <div className="flex flex-wrap gap-2">
                {linkedProtocols.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    <BookOpen className="w-3 h-3" />
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lien fiches */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href={`/fiches?mode=${guidance.modeId}`}
              className="text-xs font-medium hover:underline"
              style={{ color: guidance.color }}
            >
              Voir la fiche complète du mode &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// TAB 3 : Protocoles cliniques
// ===========================================================================

function ProtocolesTab() {
  // Séparer supervision des protocoles thérapeutiques
  const therapeuticProtocols = clinicalProtocols.filter((p) => p.id !== 'gerer-schemas-therapeute');

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Protocoles pas-à-pas avec les phrases exactes à utiliser en séance.
        Chaque fiche contient les instructions pour le patient et le script
        clinique détaillé pour le thérapeute.
      </p>
      {therapeuticProtocols.map((protocol) => (
        <ProtocolCard key={protocol.id} protocol={protocol} />
      ))}
    </div>
  );
}

function ProtocolCard({ protocol }: { protocol: (typeof clinicalProtocols)[number] }) {
  const [open, setOpen] = useState(false);

  const phaseLabels = therapyPhases
    .filter((p) => protocol.phaseIds.includes(p.id))
    .map((p) => p.name);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800">{protocol.name}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{protocol.summary}</p>
          {phaseLabels.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {phaseLabels.map((label) => (
                <span key={label} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-medium">
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
          {/* Instructions patient */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1.5">
              Instructions pour le patient
            </h4>
            <p className="text-sm text-blue-800 leading-relaxed italic">
              &laquo; {protocol.patientInstructions} &raquo;
            </p>
          </div>

          {/* Étapes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
              Script clinique — Instructions pour le thérapeute
            </h4>
            <div className="space-y-2">
              {protocol.steps.map((step, i) => (
                <ProtocolStepItem key={i} step={step} index={i} />
              ))}
            </div>
          </div>

          {/* Lien diagramme */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-3">
            <Link
              href="/outils/conceptualisation"
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Diagramme de conceptualisation
            </Link>
            <Link
              href="/fiches"
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Fiches schémas et modes
            </Link>
          </div>
        </div>
      )}
    </div>
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
      <div className="bg-emerald-50 border-l-3 border-emerald-500 rounded-r-lg px-4 py-2.5">
        <p className="text-sm text-emerald-800 italic leading-relaxed">{step.text}</p>
      </div>
    );
  }
  if (step.type === 'note') {
    return (
      <div className="bg-amber-50 border-l-3 border-amber-400 rounded-r-lg px-4 py-2.5">
        <p className="text-sm text-amber-800 leading-relaxed flex items-start gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          {step.text}
        </p>
      </div>
    );
  }
  // instruction
  return (
    <div className="flex items-start gap-2.5 px-1 py-1">
      <span className="text-[11px] font-mono text-slate-400 mt-0.5 shrink-0 w-5 text-right">
        {index + 1}.
      </span>
      <p className="text-sm text-slate-700 leading-relaxed">{step.text}</p>
    </div>
  );
}

// ===========================================================================
// TAB 4 : Techniques (les 25 existantes)
// ===========================================================================

function TechniquesTab() {
  return (
    <div className="space-y-8">
      <p className="text-sm text-slate-500">
        Les 25 techniques thérapeutiques utilisées en thérapie des schémas,
        organisées par catégorie. Chaque technique est détaillée avec son
        utilisation et sa justification clinique.
      </p>
      {techniqueCategories.map((cat) => {
        const catTechniques = techniques.filter((t) => t.categoryId === cat.id);
        if (catTechniques.length === 0) return null;
        return (
          <div key={cat.id}>
            <h3
              className="text-sm font-bold uppercase tracking-wide mb-3 pb-2 border-b"
              style={{ color: cat.color, borderColor: `${cat.color}30` }}
            >
              {cat.name} ({catTechniques.length})
            </h3>
            <div className="space-y-3">
              {catTechniques.map((tech) => (
                <TechniqueCard key={tech.id} technique={tech} catColor={cat.color} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="pt-4 border-t border-slate-200">
        <Link
          href="/fiches"
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Voir toutes les fiches (schémas, modes, troubles)
        </Link>
      </div>
    </div>
  );
}

function TechniqueCard({
  technique,
  catColor,
}: {
  technique: (typeof techniques)[number];
  catColor: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
      >
        <span
          className="w-2 h-2 rounded-full mt-1.5 shrink-0"
          style={{ backgroundColor: catColor }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-slate-800">{technique.name}</h4>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{technique.mechanism}</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">{technique.mechanism}</p>
          {technique.howTo && (
            <div className="bg-blue-50 rounded-lg p-3">
              <h5 className="text-xs font-bold text-blue-700 mb-1">Comment utiliser</h5>
              <p className="text-sm text-blue-800 leading-relaxed">{technique.howTo}</p>
            </div>
          )}
          {technique.whyUse && (
            <div className="bg-emerald-50 rounded-lg p-3">
              <h5 className="text-xs font-bold text-emerald-700 mb-1">Pourquoi cet outil</h5>
              <p className="text-sm text-emerald-800 leading-relaxed">{technique.whyUse}</p>
            </div>
          )}
          {technique.warnings && (
            <div className="bg-amber-50 rounded-lg p-3">
              <h5 className="text-xs font-bold text-amber-700 mb-1">Précautions</h5>
              <p className="text-sm text-amber-800 flex items-start gap-1.5">
                <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                {technique.warnings}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// TAB 5 : Cascade (lien vers la page existante)
// ===========================================================================

function CascadeTab() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        Le simulateur de cascade montre comment un événement déclencheur
        active un schéma, qui active un mode, qui produit un comportement
        — et comment la thérapie intervient à chaque étape.
      </p>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <Play className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
        <h3 className="font-bold text-slate-800 text-lg mb-2">
          Simulateur de cascade schéma → mode → comportement
        </h3>
        <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
          Visualisez pas-à-pas le processus d&apos;activation des schémas
          avec 3 profils cliniques illustratifs.
        </p>
        <Link
          href="/cascade"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          Ouvrir le simulateur
        </Link>
      </div>
    </div>
  );
}

// ===========================================================================
// SECTION SUPERVISION (bas de page, couleur différente)
// ===========================================================================

function SupervisionSection() {
  const [open, setOpen] = useState(false);
  const protocol = clinicalProtocols.find((p) => p.id === 'gerer-schemas-therapeute');
  if (!protocol) return null;

  return (
    <div className="bg-teal-50 border-t-2 border-teal-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-start gap-4 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <UserCog className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-teal-800">
              Pour le thérapeute : Gérer ses propres schémas
            </h2>
            <p className="text-sm text-teal-600 mt-1">
              Exercice de supervision en binôme. Identifiez vos propres
              schémas activés lors de séances difficiles et apprenez à gérer
              le contre-transfert schématique.
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-teal-500 shrink-0 mt-2 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="mt-6 bg-white rounded-xl border border-teal-200 shadow-sm p-5 space-y-4">
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="text-xs font-bold uppercase tracking-wide text-teal-700 mb-1.5">
                Instructions pour le thérapeute supervisé
              </h4>
              <p className="text-sm text-teal-800 italic leading-relaxed">
                &laquo; {protocol.patientInstructions} &raquo;
              </p>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
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
