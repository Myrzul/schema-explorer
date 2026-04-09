'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  AlertTriangle,
  Target,
  Zap,
  ArrowRight,
  LifeBuoy,
  FileDown,
  X,
} from 'lucide-react';
import {
  therapyPhases,
  evToAsPathway,
  clinicalProtocols,
  blockedSituationDiagnoses,
  generateRecommendations,
  getRelevantPathwaySteps,
} from '@/data/clinical-guide';
import type {
  SessionProfile,
  SessionRecommendation,
} from '@/data/clinical-guide';
import { schemas } from '@/data/schemas';
import { modes } from '@/data/modes';
import { domains } from '@/data/domains';
import { techniques } from '@/data/techniques';

// ===========================================================================
// PAGE ASSISTANT DE SÉANCE
// ===========================================================================

export default function AssistantPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Assistant de séance
          </h1>
          <p className="text-sm text-slate-500">
            Configurez le profil de votre patient pour obtenir des
            recommandations personnalisées basées sur le modèle de Young.
          </p>
        </div>

        {/* Bandeau d'avertissement */}
        <WarningBanner />

        {/* Assistant interactif */}
        <SessionAssistant />
      </div>
    </div>
  );
}

// ===========================================================================
// BANDEAU D'AVERTISSEMENT
// ===========================================================================

function WarningBanner() {
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 mb-8">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-amber-800">
            Outil pédagogique et théorique
          </h3>
          <p className="text-xs text-amber-700 leading-relaxed mt-1">
            Cet assistant est basé sur le modèle de Jeffrey Young et a une
            visée <strong>exclusivement pédagogique</strong>. Les
            recommandations générées sont théoriques et ne remplacent en aucun
            cas le jugement clinique du thérapeute, la supervision et
            l&apos;adaptation au contexte unique de chaque patient. En situation
            réelle, <strong>la clinique prime toujours sur le protocole</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// ASSISTANT DE SÉANCE INTERACTIF
// ===========================================================================

type AssistantStep = 1 | 2 | 3;

function SessionAssistant() {
  const [step, setStep] = useState<AssistantStep>(1);

  const [phaseId, setPhaseId] = useState('changement');
  const [selectedModeIds, setSelectedModeIds] = useState<string[]>([]);
  const [selectedSchemaIds, setSelectedSchemaIds] = useState<string[]>([]);
  const [situationLibre, setSituationLibre] = useState('');
  const [showBlocked, setShowBlocked] = useState(false);

  const profile: SessionProfile = useMemo(
    () => ({ phaseId, selectedModeIds, selectedSchemaIds, situationLibre }),
    [phaseId, selectedModeIds, selectedSchemaIds, situationLibre]
  );

  const recommendations = useMemo(
    () => (step >= 2 ? generateRecommendations(profile) : []),
    [profile, step]
  );

  const pathwaySteps = useMemo(
    () => (step >= 3 ? getRelevantPathwaySteps(profile) : []),
    [profile, step]
  );

  const canProceed =
    selectedModeIds.length > 0 || selectedSchemaIds.length > 0;

  const handleGenerate = useCallback(() => {
    if (canProceed) setStep(2);
  }, [canProceed]);

  const handleShowPathway = useCallback(() => {
    setStep(3);
  }, []);

  const handleReset = useCallback(() => {
    setStep(1);
    setSelectedModeIds([]);
    setSelectedSchemaIds([]);
    setSituationLibre('');
    setPhaseId('changement');
  }, []);

  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50/50 to-white p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Assistant de séance
            </h2>
            <p className="text-[10px] text-slate-400">
              Profil patient &rarr; Recommandations &rarr; Parcours EV&rarr;AS
            </p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => {
                if (s === 1) setStep(1);
                else if (s === 2 && canProceed) setStep(2);
                else if (s === 3 && step >= 2) setStep(3);
              }}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                step >= s
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {step === 1 && (
        <StepProfile
          phaseId={phaseId}
          setPhaseId={setPhaseId}
          selectedModeIds={selectedModeIds}
          setSelectedModeIds={setSelectedModeIds}
          selectedSchemaIds={selectedSchemaIds}
          setSelectedSchemaIds={setSelectedSchemaIds}
          situationLibre={situationLibre}
          setSituationLibre={setSituationLibre}
          canProceed={canProceed}
          onGenerate={handleGenerate}
          onShowBlocked={() => setShowBlocked(true)}
        />
      )}

      {step === 2 && (
        <StepRecommendations
          recommendations={recommendations}
          profile={profile}
          onBack={() => setStep(1)}
          onShowPathway={handleShowPathway}
          onShowBlocked={() => setShowBlocked(true)}
        />
      )}

      {step === 3 && (
        <StepPathway
          pathwaySteps={pathwaySteps}
          onBack={() => setStep(2)}
          onReset={handleReset}
        />
      )}

      {showBlocked && (
        <BlockedSituationDialog onClose={() => setShowBlocked(false)} />
      )}
    </div>
  );
}

// ===========================================================================
// STEP 1 : PROFIL PATIENT
// ===========================================================================

function StepProfile({
  phaseId,
  setPhaseId,
  selectedModeIds,
  setSelectedModeIds,
  selectedSchemaIds,
  setSelectedSchemaIds,
  situationLibre,
  setSituationLibre,
  canProceed,
  onGenerate,
  onShowBlocked,
}: {
  phaseId: string;
  setPhaseId: (id: string) => void;
  selectedModeIds: string[];
  setSelectedModeIds: (ids: string[]) => void;
  selectedSchemaIds: string[];
  setSelectedSchemaIds: (ids: string[]) => void;
  situationLibre: string;
  setSituationLibre: (v: string) => void;
  canProceed: boolean;
  onGenerate: () => void;
  onShowBlocked: () => void;
}) {
  const toggleMode = (id: string) => {
    setSelectedModeIds(
      selectedModeIds.includes(id)
        ? selectedModeIds.filter((m) => m !== id)
        : [...selectedModeIds, id]
    );
  };

  const toggleSchema = (id: string) => {
    setSelectedSchemaIds(
      selectedSchemaIds.includes(id)
        ? selectedSchemaIds.filter((s) => s !== id)
        : [...selectedSchemaIds, id]
    );
  };

  const modeGroups = [
    { label: 'Modes Enfant', ids: modes.filter((m) => m.category === 'enfant').map((m) => m.id) },
    { label: 'Modes Coping', ids: modes.filter((m) => m.category === 'coping-dysfonctionnel').map((m) => m.id) },
    { label: 'Modes Parent', ids: modes.filter((m) => m.category === 'parent-dysfonctionnel').map((m) => m.id) },
    { label: 'Adulte Sain', ids: modes.filter((m) => m.category === 'sain').map((m) => m.id) },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-violet-600 uppercase tracking-wide">
          Étape 1
        </span>
        <span className="text-xs text-slate-400">&mdash; Profil du patient</span>
      </div>

      {/* Phase selector */}
      <div>
        <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
          Phase de la thérapie
        </label>
        <div className="flex flex-wrap gap-1.5">
          {therapyPhases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setPhaseId(phase.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                phaseId === phase.id
                  ? 'border-violet-400 bg-violet-100 text-violet-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-violet-200'
              }`}
            >
              {phase.icon} {phase.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mode selector */}
      <div>
        <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
          Modes actifs du patient
          <span className="text-slate-400 font-normal ml-1">
            (sélectionnez un ou plusieurs)
          </span>
        </label>
        <div className="space-y-3">
          {modeGroups.map((group) => (
            <div key={group.label}>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {group.ids.map((id) => {
                  const mode = modes.find((m) => m.id === id);
                  if (!mode) return null;
                  const active = selectedModeIds.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleMode(id)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border font-medium transition-all ${
                        active
                          ? 'border-violet-400 bg-violet-100 text-violet-800 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-violet-200'
                      }`}
                    >
                      {mode.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schema selector */}
      <div>
        <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
          Schémas actifs
          <span className="text-slate-400 font-normal ml-1">
            (sélectionnez un ou plusieurs)
          </span>
        </label>
        <div className="space-y-3">
          {domains.map((domain) => {
            const domainSchemas = schemas.filter((s) => s.domainId === domain.id);
            return (
              <div key={domain.id}>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wide"
                  style={{ color: domain.color }}
                >
                  {domain.number}. {domain.name}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {domainSchemas.map((schema) => {
                    const active = selectedSchemaIds.includes(schema.id);
                    return (
                      <button
                        key={schema.id}
                        onClick={() => toggleSchema(schema.id)}
                        title={schema.centralBelief}
                        className={`text-[11px] px-2.5 py-1 rounded-full border font-medium transition-all ${
                          active
                            ? 'shadow-sm'
                            : 'bg-white text-slate-500 hover:border-violet-200'
                        }`}
                        style={
                          active
                            ? {
                                borderColor: domain.color,
                                backgroundColor: `${domain.colorLight}`,
                                color: domain.color,
                              }
                            : { borderColor: '#e2e8f0' }
                        }
                      >
                        {schema.code} {schema.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Situation clinique libre */}
      <div>
        <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
          Situation clinique
          <span className="text-slate-400 font-normal ml-1">(optionnel)</span>
        </label>
        <textarea
          value={situationLibre}
          onChange={(e) => setSituationLibre(e.target.value)}
          placeholder="Décrivez brièvement la situation actuelle du patient, le contexte de la séance, un événement déclencheur..."
          className="w-full text-xs border border-slate-200 rounded-lg p-3 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 resize-none"
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onShowBlocked}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors"
        >
          <LifeBuoy className="w-3.5 h-3.5" />
          Situation bloquée ?
        </button>

        <button
          onClick={onGenerate}
          disabled={!canProceed}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
            canProceed
              ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Générer les recommandations
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ===========================================================================
// STEP 2 : RECOMMANDATIONS
// ===========================================================================

const priorityColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  recommande: { bg: 'bg-violet-50', border: 'border-violet-300', text: 'text-violet-800', badge: 'bg-violet-600' },
  haute: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', badge: 'bg-amber-500' },
  moyenne: { bg: 'bg-sky-50', border: 'border-sky-300', text: 'text-sky-800', badge: 'bg-sky-500' },
  basse: { bg: 'bg-slate-50', border: 'border-slate-300', text: 'text-slate-700', badge: 'bg-slate-400' },
};

const priorityLabels: Record<string, string> = {
  recommande: 'recommandé',
  haute: 'haute',
  moyenne: 'moyenne',
  basse: 'basse',
};

function StepRecommendations({
  recommendations,
  profile,
  onBack,
  onShowPathway,
  onShowBlocked,
}: {
  recommendations: SessionRecommendation[];
  profile: SessionProfile;
  onBack: () => void;
  onShowPathway: () => void;
  onShowBlocked: () => void;
}) {
  const selectedModeNames = profile.selectedModeIds
    .map((id) => modes.find((m) => m.id === id)?.name)
    .filter(Boolean);
  const selectedSchemaNames = profile.selectedSchemaIds
    .map((id) => schemas.find((s) => s.id === id)?.name)
    .filter(Boolean);
  const phaseName = therapyPhases.find((p) => p.id === profile.phaseId)?.name || '';

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-violet-600 uppercase tracking-wide">
          Étape 2
        </span>
        <span className="text-xs text-slate-400">
          &mdash; Recommandations ({recommendations.length})
        </span>
      </div>

      {/* Profil résumé */}
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <h4 className="text-[10px] font-semibold uppercase text-slate-400 mb-2">
          Profil configuré
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 font-medium">
            {phaseName}
          </span>
          {selectedModeNames.map((name) => (
            <span key={name} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-medium">
              {name}
            </span>
          ))}
          {selectedSchemaNames.map((name) => (
            <span key={name} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 font-medium">
              {name}
            </span>
          ))}
        </div>
        {profile.situationLibre && (
          <p className="text-[11px] text-slate-500 mt-2 italic">
            &laquo; {profile.situationLibre} &raquo;
          </p>
        )}
      </div>

      {/* Recommendation cards */}
      <div className="space-y-3">
        {recommendations.map((rec) => {
          const colors = priorityColors[rec.priority] || priorityColors.basse;
          return (
            <div
              key={rec.id}
              className={`rounded-lg border ${colors.border} ${colors.bg} p-4`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`${colors.badge} text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 mt-0.5`}
                >
                  {priorityLabels[rec.priority] || rec.priority}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-semibold ${colors.text}`}>
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {rec.description}
                  </p>

                  {rec.warnings.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {rec.warnings.map((w, i) => (
                        <p
                          key={i}
                          className="text-[11px] text-amber-700 flex items-start gap-1"
                        >
                          <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                          {w}
                        </p>
                      ))}
                    </div>
                  )}

                  {(rec.techniqueIds.length > 0 ||
                    rec.protocolIds.length > 0) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {rec.techniqueIds.map((tid) => {
                        const t = techniques.find((x) => x.id === tid);
                        return t ? (
                          <span
                            key={tid}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-slate-200 bg-white text-slate-600 font-medium"
                          >
                            {t.name}
                          </span>
                        ) : null;
                      })}
                      {rec.protocolIds.map((pid) => {
                        const p = clinicalProtocols.find((x) => x.id === pid);
                        return p ? (
                          <span
                            key={pid}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 font-medium"
                          >
                            {p.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          Aucune recommandation spécifique pour ce profil.
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            &larr; Modifier le profil
          </button>
          <button
            onClick={onShowBlocked}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            Situation bloquée ?
          </button>
          <button
            onClick={() => exportMemoAsPdf(profile, recommendations)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
          >
            <FileDown className="w-3.5 h-3.5" />
            Mémo de séance (PDF)
          </button>
        </div>
        <button
          onClick={onShowPathway}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-lg font-medium text-sm hover:bg-violet-700 shadow-sm transition-all"
        >
          Voir le parcours EV &rarr; AS
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// --- PDF export ---

function exportMemoAsPdf(
  profile: SessionProfile,
  recommendations: SessionRecommendation[]
) {
  const phaseName =
    therapyPhases.find((p) => p.id === profile.phaseId)?.name || profile.phaseId;
  const modeNames = profile.selectedModeIds
    .map((id) => modes.find((m) => m.id === id)?.name)
    .filter(Boolean);
  const schemaNames = profile.selectedSchemaIds
    .map((id) => {
      const s = schemas.find((x) => x.id === id);
      return s ? `${s.code} ${s.name}` : null;
    })
    .filter(Boolean);

  const recHtml = recommendations
    .map(
      (r) => `
      <div style="border:1px solid #ddd;border-radius:8px;padding:12px;margin-bottom:10px;${
        r.priority === 'recommande'
          ? 'border-color:#7c3aed;background:#f5f3ff;'
          : r.priority === 'haute'
          ? 'border-color:#f59e0b;background:#fffbeb;'
          : ''
      }">
        <strong style="text-transform:uppercase;font-size:10px;color:#666;">${
          priorityLabels[r.priority] || r.priority
        }</strong>
        <h3 style="margin:4px 0;font-size:14px;">${r.title}</h3>
        <p style="font-size:12px;color:#555;margin:4px 0;">${r.description}</p>
        ${
          r.warnings.length > 0
            ? `<div style="margin-top:6px;">${r.warnings
                .map(
                  (w) =>
                    `<p style="font-size:11px;color:#b45309;">⚠ ${w}</p>`
                )
                .join('')}</div>`
            : ''
        }
        ${
          r.techniqueIds.length > 0
            ? `<p style="font-size:11px;color:#666;margin-top:6px;">Techniques : ${r.techniqueIds
                .map((tid) => techniques.find((t) => t.id === tid)?.name)
                .filter(Boolean)
                .join(', ')}</p>`
            : ''
        }
      </div>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8">
<title>Mémo de séance — SchemaExplorer</title>
<style>
  body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;color:#1e293b;}
  h1{font-size:20px;border-bottom:2px solid #7c3aed;padding-bottom:8px;margin-bottom:16px;}
  h2{font-size:15px;color:#7c3aed;margin:20px 0 8px;}
  .tag{display:inline-block;font-size:11px;padding:2px 8px;border-radius:20px;margin:2px;border:1px solid #ddd;}
  .footer{margin-top:30px;padding-top:12px;border-top:1px solid #ddd;font-size:10px;color:#999;text-align:center;}
  @media print{body{margin:0;padding:20px;}}
</style></head><body>
<h1>Mémo de séance</h1>
<p style="font-size:11px;color:#999;">Généré le ${new Date().toLocaleDateString('fr-FR')} — SchemaExplorer (outil pédagogique)</p>

<h2>Profil du patient</h2>
<p><strong>Phase :</strong> ${phaseName}</p>
<p><strong>Modes actifs :</strong> ${modeNames.length > 0 ? modeNames.map((n) => `<span class="tag">${n}</span>`).join(' ') : 'Aucun sélectionné'}</p>
<p><strong>Schémas actifs :</strong> ${schemaNames.length > 0 ? schemaNames.map((n) => `<span class="tag">${n}</span>`).join(' ') : 'Aucun sélectionné'}</p>
${profile.situationLibre ? `<p><strong>Situation clinique :</strong> <em>${profile.situationLibre}</em></p>` : ''}

<h2>Recommandations (${recommendations.length})</h2>
${recHtml}

<div class="footer">
  ⚠ Outil pédagogique et théorique — le jugement clinique prime toujours sur le protocole.<br>
  SchemaExplorer — Basé sur le modèle de Jeffrey Young
</div>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 300);
  }
}

// ===========================================================================
// STEP 3 : PARCOURS EV → AS ANIMÉ
// ===========================================================================

function StepPathway({
  pathwaySteps,
  onBack,
  onReset,
}: {
  pathwaySteps: { step: (typeof evToAsPathway)[number]; relevance: 'high' | 'medium' | 'low' }[];
  onBack: () => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-violet-600 uppercase tracking-wide">
          Étape 3
        </span>
        <span className="text-xs text-slate-400">
          &mdash; Parcours Enfant Vulnérable &rarr; Adulte Sain
        </span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Les étapes mises en avant correspondent aux modes et schémas de votre
        patient. Les étapes grisées restent pertinentes dans le parcours global
        mais ne sont pas prioritaires pour ce profil.
      </p>

      <div className="space-y-0">
        {pathwaySteps.map(({ step, relevance }, i) => {
          const isLast = i === pathwaySteps.length - 1;
          const opacity = relevance === 'high' ? 1 : relevance === 'medium' ? 0.7 : 0.35;
          const scale = relevance === 'high' ? 'scale-100' : 'scale-95';

          return (
            <div
              key={step.id}
              className={`flex gap-4 transition-all duration-300 ${scale}`}
              style={{ opacity }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: step.color }}
                >
                  {step.order}
                </div>
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 min-h-8 my-1"
                    style={{ backgroundColor: `${step.color}40` }}
                  />
                )}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-2">
                  <h3
                    className="font-bold text-sm"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </h3>
                  {relevance === 'high' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-600 text-white font-bold uppercase">
                      Prioritaire
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Mode cible : {step.targetMode}
                </p>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {step.tools.map((t, j) => (
                    <span
                      key={j}
                      className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                      style={{
                        borderColor: `${step.color}60`,
                        color: step.color,
                        backgroundColor: `${step.color}10`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="text-xs font-medium text-slate-500 hover:text-slate-700"
        >
          &larr; Retour aux recommandations
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium text-sm hover:bg-slate-700 shadow-sm transition-all"
        >
          Nouveau profil
        </button>
      </div>
    </div>
  );
}

// ===========================================================================
// BLOCKED SITUATION DIALOG
// ===========================================================================

function BlockedSituationDialog({ onClose }: { onClose: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = blockedSituationDiagnoses.find((d) => d.id === selectedId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto z-10">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-sm text-slate-800">
              Diagnostic rapide — Situation bloquée
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {!selected ? (
            <>
              <p className="text-xs text-slate-500 mb-3">
                Identifiez ce qui bloque la progression thérapeutique :
              </p>
              {blockedSituationDiagnoses.map((diag) => (
                <button
                  key={diag.id}
                  onClick={() => setSelectedId(diag.id)}
                  className="w-full text-left rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50 p-3 transition-colors"
                >
                  <h4 className="text-sm font-semibold text-slate-800">
                    {diag.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {diag.description}
                  </p>
                </button>
              ))}
            </>
          ) : (
            <>
              <button
                onClick={() => setSelectedId(null)}
                className="text-xs text-slate-500 hover:text-slate-700 mb-2"
              >
                &larr; Retour à la liste
              </button>

              <h4 className="text-sm font-bold text-slate-800">
                {selected.label}
              </h4>
              <p className="text-xs text-slate-600">{selected.description}</p>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <h5 className="text-[11px] font-semibold uppercase text-amber-700 mb-1.5">
                  Causes possibles
                </h5>
                <ul className="space-y-1">
                  {selected.possibleCauses.map((c, i) => (
                    <li
                      key={i}
                      className="text-xs text-amber-800 flex items-start gap-1.5"
                    >
                      <span className="text-amber-500 mt-0.5 shrink-0">!</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <h5 className="text-[11px] font-semibold uppercase text-emerald-700 mb-1.5">
                  Actions suggérées
                </h5>
                <ul className="space-y-1">
                  {selected.suggestedActions.map((a, i) => (
                    <li
                      key={i}
                      className="text-xs text-emerald-800 flex items-start gap-1.5"
                    >
                      <span className="text-emerald-500 mt-0.5 shrink-0">
                        +
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
