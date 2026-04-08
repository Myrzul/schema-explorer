'use client';

import { useState, useCallback } from 'react';
import { cascades } from '@/data';
import { schemas, modes } from '@/data';
import { domainColors, modeCategoryColors } from '@/lib/colors';
import type { CascadeSequence, CascadeStep } from '@/types';
import { ChevronRight, RotateCcw, Play, Stethoscope, AlertTriangle, RefreshCw } from 'lucide-react';

// ---------------------------------------------------------------------------
// Entity color helpers
// ---------------------------------------------------------------------------

function stepColor(step: CascadeStep) {
  switch (step.entityType) {
    case 'trigger':
      return { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' };
    case 'schema': {
      const s = schemas.find((sc) => sc.id === step.entityId);
      if (s) {
        const dc = domainColors[s.domainId];
        return { bg: dc.bg, border: dc.border, text: dc.text };
      }
      return { bg: '#F3F4F6', border: '#9CA3AF', text: '#1F2937' };
    }
    case 'mode': {
      const m = modes.find((mo) => mo.id === step.entityId);
      if (m) {
        const mc = modeCategoryColors[m.category];
        return { bg: mc.bg, border: mc.border, text: mc.text };
      }
      return { bg: '#EDE9FE', border: '#8B5CF6', text: '#4C1D95' };
    }
    case 'coping-style':
      return { bg: '#FFF7ED', border: '#F97316', text: '#9A3412' };
    case 'behavior':
      return { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B' };
    case 'consequence':
      return { bg: '#F3F4F6', border: '#6B7280', text: '#374151' };
    default:
      return { bg: '#F3F4F6', border: '#9CA3AF', text: '#1F2937' };
  }
}

function entityTypeLabel(type: CascadeStep['entityType']) {
  const labels: Record<string, string> = {
    trigger: 'Déclencheur',
    schema: 'Schéma',
    mode: 'Mode',
    'coping-style': 'Style de coping',
    behavior: 'Comportement',
    consequence: 'Conséquence',
  };
  return labels[type] ?? type;
}

// ---------------------------------------------------------------------------
// Step Card
// ---------------------------------------------------------------------------

function StepCard({
  step,
  index,
  isActive,
  isRevealed,
  onReveal,
  showTherapeutic,
}: {
  step: CascadeStep;
  index: number;
  isActive: boolean;
  isRevealed: boolean;
  onReveal: () => void;
  showTherapeutic: boolean;
}) {
  const color = stepColor(step);
  return (
    <div className="flex gap-4">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 shrink-0 ${
            isRevealed
              ? 'scale-100 opacity-100'
              : 'scale-75 opacity-30'
          }`}
          style={{
            backgroundColor: isRevealed ? color.bg : '#F3F4F6',
            borderColor: isRevealed ? color.border : '#D1D5DB',
            color: isRevealed ? color.text : '#9CA3AF',
          }}
        >
          {step.order}
        </div>
        {index < 6 && (
          <div
            className={`w-0.5 flex-1 min-h-[24px] transition-all duration-300 ${
              isRevealed ? 'opacity-100' : 'opacity-20'
            }`}
            style={{ backgroundColor: isRevealed ? color.border : '#D1D5DB' }}
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-6 transition-all duration-300 ${isRevealed ? 'opacity-100' : 'opacity-30'}`}>
        {!isRevealed ? (
          <button
            onClick={onReveal}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors py-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Cliquez pour révéler l&apos;étape suivante
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border"
                style={{ backgroundColor: color.bg, borderColor: color.border, color: color.text }}
              >
                {entityTypeLabel(step.entityType)}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">{step.label}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{step.explanation}</p>

            {showTherapeutic && step.therapeuticResponse && (
              <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px] font-semibold uppercase text-emerald-700">
                    Réponse thérapeutique
                  </span>
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  {step.therapeuticResponse}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export default function CascadePage() {
  const [selectedCascade, setSelectedCascade] = useState<CascadeSequence | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showTherapeutic, setShowTherapeutic] = useState(true);

  const handleSelect = useCallback((cascade: CascadeSequence) => {
    setSelectedCascade(cascade);
    setRevealedCount(1); // Auto-reveal the trigger
  }, []);

  const handleRevealNext = useCallback(() => {
    if (!selectedCascade) return;
    setRevealedCount((c) => Math.min(c + 1, selectedCascade.steps.length));
  }, [selectedCascade]);

  const handleRevealAll = useCallback(() => {
    if (!selectedCascade) return;
    setRevealedCount(selectedCascade.steps.length);
  }, [selectedCascade]);

  const handleReset = useCallback(() => {
    setSelectedCascade(null);
    setRevealedCount(0);
  }, []);

  const allRevealed = selectedCascade && revealedCount >= selectedCascade.steps.length;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Simulateur de Cascade
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Explorez les séquences d&apos;activation schématique pas à pas.
            Choisissez un profil et un déclencheur, puis révélez chaque étape
            pour comprendre l&apos;enchaînement schéma → mode → comportement.
          </p>
        </div>

        {/* Profile selector */}
        {!selectedCascade && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Choisissez une séquence
            </h2>
            <div className="grid gap-4">
              {cascades.map((cascade) => (
                <button
                  key={cascade.id}
                  onClick={() => handleSelect(cascade)}
                  className="text-left rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {cascade.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-500">
                    <AlertTriangle className="inline w-3.5 h-3.5 mr-1 text-amber-500" />
                    {cascade.triggerDescription}
                  </p>
                  <div className="mt-2 text-xs text-slate-400">
                    {cascade.steps.length} étapes
                    {cascade.isLoop && ' • Boucle auto-entretenue'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active cascade */}
        {selectedCascade && (
          <div>
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-slate-800 text-sm">
                  {selectedCascade.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedCascade.triggerDescription}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTherapeutic}
                    onChange={(e) => setShowTherapeutic(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  Réponses thérapeutiques
                </label>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retour
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {selectedCascade.steps.map((step, i) => (
                <StepCard
                  key={step.order}
                  step={step}
                  index={i}
                  isActive={i === revealedCount}
                  isRevealed={i < revealedCount}
                  onReveal={handleRevealNext}
                  showTherapeutic={showTherapeutic}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-4">
              {!allRevealed && (
                <>
                  <button
                    onClick={handleRevealNext}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Étape suivante
                  </button>
                  <button
                    onClick={handleRevealAll}
                    className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Tout révéler
                  </button>
                </>
              )}
              {allRevealed && selectedCascade.isLoop && (
                <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
                  <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>
                    <strong>Boucle auto-entretenue</strong> — La conséquence renforce le schéma initial,
                    relançant la séquence.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
