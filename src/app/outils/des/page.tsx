'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, RotateCcw, ChevronRight } from 'lucide-react';

// ---------------------------------------------------------------------------
// DES-II items (Bernstein & Putnam, 1986; Carlson & Putnam, 1993)
// French validated version
// ---------------------------------------------------------------------------

const DES_ITEMS = [
  "Certaines personnes ont parfois l'expérience de conduire une voiture et de réaliser soudain qu'elles ne se souviennent pas de ce qui s'est passé pendant tout ou partie du trajet.",
  "Certaines personnes s'aperçoivent parfois qu'elles écoutent quelqu'un parler et réalisent soudain qu'elles n'ont pas entendu tout ou partie de ce qui a été dit.",
  "Certaines personnes ont parfois l'expérience de se retrouver dans un endroit sans savoir comment elles y sont arrivées.",
  "Certaines personnes ont parfois l'expérience de se retrouver habillées avec des vêtements qu'elles ne se souviennent pas avoir mis.",
  "Certaines personnes ont parfois l'expérience de trouver parmi leurs affaires de nouvelles choses qu'elles ne se souviennent pas avoir achetées.",
  "Certaines personnes sont parfois abordées par des gens qu'elles ne connaissent pas et qui les appellent par un autre nom ou qui affirment les avoir déjà rencontrées.",
  "Certaines personnes ont parfois l'impression de se tenir à côté d'elles-mêmes ou de se regarder faire quelque chose, et elles se voient effectivement comme si elles regardaient une autre personne.",
  "On dit parfois à certaines personnes qu'elles ne reconnaissent pas leurs amis ou les membres de leur famille.",
  "Certaines personnes s'aperçoivent parfois qu'elles n'ont aucun souvenir de certains événements importants de leur vie (par exemple un mariage ou une remise de diplôme).",
  "Certaines personnes ont parfois l'expérience d'être accusées de mensonge alors qu'elles ne pensent pas avoir menti.",
  "Certaines personnes ont parfois l'impression de regarder le monde à travers un brouillard, de sorte que les gens et les objets apparaissent lointains ou flous.",
  "Certaines personnes ont parfois l'expérience de ne pas être sûres que les choses qui leur sont arrivées se sont réellement produites ou si elles les ont seulement rêvées.",
  "Certaines personnes ont parfois l'expérience de se retrouver dans un endroit familier mais de le trouver étrange et inconnu.",
  "Certaines personnes ont parfois l'expérience de se retrouver absorbées par la télévision ou un film au point de ne plus du tout être conscientes de ce qui se passe autour d'elles.",
  "Certaines personnes ont parfois l'expérience d'être tellement absorbées dans un fantasme ou une rêverie qu'elles ont l'impression que cela leur arrive réellement.",
  "Certaines personnes ont parfois l'expérience de se retrouver dans un endroit familier mais de ne plus savoir comment s'y rendre.",
  "Certaines personnes s'aperçoivent parfois que, lorsqu'elles regardent la télévision ou un film, elles sont tellement absorbées par l'histoire qu'elles ne sont plus conscientes de ce qui se passe autour d'elles.",
  "Certaines personnes s'aperçoivent parfois qu'elles sont tellement impliquées dans un fantasme ou une rêverie que cela leur semble réellement arriver.",
  "Certaines personnes s'aperçoivent parfois qu'elles sont capables d'ignorer la douleur.",
  "Certaines personnes s'aperçoivent parfois qu'elles restent assises à regarder dans le vide, sans penser à rien et ne se rendent pas compte du temps qui passe.",
  "Certaines personnes s'aperçoivent parfois que, lorsqu'elles sont seules, elles se parlent à voix haute.",
  "Certaines personnes s'aperçoivent parfois que, dans une situation donnée, elles agissent de façon tellement différente par rapport à une autre situation qu'elles ont l'impression d'être deux personnes différentes.",
  "Certaines personnes s'aperçoivent parfois que, dans certaines situations, elles sont capables de faire des choses avec une facilité et une spontanéité étonnantes qui leur seraient en temps normal difficiles (par exemple, sport, travail, activités sociales).",
  "Certaines personnes s'aperçoivent parfois qu'elles ne peuvent pas se rappeler si elles ont fait quelque chose ou si elles ont seulement pensé à le faire (par exemple, elles ne savent pas si elles ont posté une lettre ou si elles ont seulement pensé à la poster).",
  "Certaines personnes trouvent parfois des preuves qu'elles ont fait des choses dont elles ne se souviennent pas avoir faites.",
  "Certaines personnes trouvent parfois des écrits, des dessins ou des notes parmi leurs affaires qu'elles ont dû faire mais dont elles ne se souviennent pas.",
  "Certaines personnes entendent parfois des voix dans leur tête qui leur disent de faire des choses ou qui commentent ce qu'elles font.",
  "Certaines personnes ont parfois l'impression de regarder le monde à travers un brouillard, de sorte que les gens et les objets apparaissent lointains ou irréels.",
];

// Subscales
const SUBSCALES = {
  'Amnésie dissociative': [3, 4, 5, 6, 8, 9, 10, 25, 26],
  'Dépersonnalisation/Déréalisation': [7, 11, 12, 13, 16, 28],
  'Absorption/Engagement imaginatif': [2, 14, 15, 17, 18, 20, 22, 23],
};

// DES Taxon items (pathological dissociation)
const TAXON_ITEMS = [3, 5, 7, 8, 12, 13, 22, 27];

const SCALE_OPTIONS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DESPage() {
  const [patientName, setPatientName] = useState('');
  const [patientDate, setPatientDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnswer = useCallback((itemIdx: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [itemIdx]: value }));
  }, []);

  const answeredCount = Object.keys(answers).length;
  const totalScore = answeredCount > 0
    ? Object.values(answers).reduce((a, b) => a + b, 0) / answeredCount
    : 0;

  const computeSubscale = (items: number[]) => {
    const vals = items.map((i) => answers[i - 1]).filter((v) => v !== undefined);
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  };

  const taxonScore = computeSubscale(TAXON_ITEMS);

  const handleReset = () => {
    setAnswers({});
    setStarted(false);
    setShowResults(false);
    setPatientName('');
  };

  const handleDownloadPDF = () => {
    // Generate printable HTML and trigger print
    const w = window.open('', '_blank');
    if (!w) return;

    const subscaleRows = Object.entries(SUBSCALES).map(([name, items]) => {
      const score = computeSubscale(items);
      return `<tr><td style="padding:8px;border:1px solid #ddd">${name}</td><td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:bold">${score.toFixed(1)}%</td></tr>`;
    }).join('');

    const itemRows = DES_ITEMS.map((text, i) => {
      const val = answers[i];
      return `<tr><td style="padding:6px;border:1px solid #eee;width:30px;text-align:center;color:#888">${i + 1}</td><td style="padding:6px;border:1px solid #eee;font-size:12px">${text}</td><td style="padding:6px;border:1px solid #eee;text-align:center;font-weight:bold">${val !== undefined ? val + '%' : '—'}</td></tr>`;
    }).join('');

    w.document.write(`<!DOCTYPE html><html><head><title>DES-II — ${patientName || 'Patient'}</title>
    <style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;color:#333;font-size:14px}
    h1{font-size:20px;margin-bottom:4px}h2{font-size:16px;margin-top:24px}
    .meta{color:#666;font-size:13px;margin-bottom:20px}
    .score-big{font-size:32px;font-weight:bold;text-align:center;margin:16px 0}
    .interpretation{padding:12px;border-radius:8px;margin:12px 0;font-size:13px}
    table{width:100%;border-collapse:collapse;margin:12px 0}
    @media print{body{margin:20px}}</style></head><body>
    <h1>DES-II — Échelle des Expériences Dissociatives</h1>
    <div class="meta">${patientName ? `Patient : ${patientName} — ` : ''}Date : ${patientDate} — Items répondus : ${answeredCount}/28</div>
    <div class="score-big" style="color:${totalScore >= 30 ? '#b8453a' : totalScore >= 20 ? '#c87d2a' : '#3d6b5e'}">${totalScore.toFixed(1)}%</div>
    <div class="interpretation" style="background:${totalScore >= 30 ? '#fef2f2;border:1px solid #fca5a5' : totalScore >= 20 ? '#fff7ed;border:1px solid #fed7aa' : '#f0fdf4;border:1px solid #bbf7d0'}">
    ${totalScore >= 30 ? '<strong>Score ≥ 30% :</strong> Score cliniquement significatif. Suggère la présence possible d\'un trouble dissociatif. Une évaluation clinique approfondie est recommandée.' : totalScore >= 20 ? '<strong>Score 20-29% :</strong> Score modéré. Des expériences dissociatives sont présentes. À explorer cliniquement.' : '<strong>Score < 20% :</strong> Dans la norme. Les expériences dissociatives rapportées sont dans les limites normales.'}
    </div>
    <div class="interpretation" style="background:#f5f0ff;border:1px solid #c4b5fd">
    <strong>Score DES-Taxon : ${taxonScore.toFixed(1)}%</strong> — ${taxonScore >= 20 ? 'Élevé : suggère une dissociation pathologique (vs absorption normale).' : 'Dans les limites normales.'}
    </div>
    <h2>Sous-échelles</h2>
    <table><thead><tr><th style="padding:8px;border:1px solid #ddd;text-align:left">Sous-échelle</th><th style="padding:8px;border:1px solid #ddd">Score moyen</th></tr></thead><tbody>${subscaleRows}</tbody></table>
    <h2>Détail des réponses</h2>
    <table><thead><tr><th style="padding:6px;border:1px solid #eee">#</th><th style="padding:6px;border:1px solid #eee;text-align:left">Item</th><th style="padding:6px;border:1px solid #eee">Réponse</th></tr></thead><tbody>${itemRows}</tbody></table>
    <script>window.print()</script></body></html>`);
    w.document.close();
  };

  // Intro screen
  if (!started) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-3 border-b border-slate-200 bg-white flex items-center gap-3">
          <Link href="/outils" className="text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-sm font-semibold text-slate-800">DES-II — Échelle des Expériences Dissociatives</h1>
        </div>
        <div className="max-w-xl mx-auto px-6 py-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Échelle des Expériences Dissociatives</h1>
            <p className="text-sm text-slate-500">DES-II — Bernstein & Putnam (1986), Carlson & Putnam (1993)</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 mb-6">
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Ce questionnaire comprend <strong>28 items</strong> décrivant des expériences que vous pouvez avoir dans votre vie quotidienne.
              Pour chaque item, indiquez le pourcentage de temps où cette expérience vous arrive
              (de <strong>0%</strong> = jamais à <strong>100%</strong> = en permanence).
            </p>
            <div className="bg-violet-50 rounded-lg p-3 text-xs text-violet-800">
              <strong>Note :</strong> Ce questionnaire est un outil de dépistage, pas un outil diagnostique.
              Un score élevé nécessite une évaluation clinique approfondie.
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Nom du patient (optionnel)</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
                placeholder="Prénom Nom"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Date</label>
              <input
                type="date"
                value={patientDate}
                onChange={(e) => setPatientDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors"
          >
            Commencer le questionnaire
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const getColor = (score: number) => score >= 30 ? '#b8453a' : score >= 20 ? '#c87d2a' : '#3d6b5e';

    return (
      <div className="flex-1 overflow-y-auto" ref={resultsRef}>
        <div className="px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowResults(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-sm font-semibold text-slate-800">Résultats DES-II</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleDownloadPDF} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-medium hover:bg-violet-700">
              <Download className="w-3.5 h-3.5" />
              Télécharger PDF
            </button>
            <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-xs hover:bg-slate-50">
              <RotateCcw className="w-3.5 h-3.5" />
              Recommencer
            </button>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-6 py-8 space-y-6">
          {/* Global score */}
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Score global DES-II</p>
            <p className="text-5xl font-bold" style={{ color: getColor(totalScore) }}>{totalScore.toFixed(1)}%</p>
            <p className="text-xs text-slate-400 mt-1">{answeredCount}/28 items répondus</p>
          </div>

          {/* Interpretation */}
          <div className={`rounded-xl p-4 border ${totalScore >= 30 ? 'bg-red-50 border-red-200' : totalScore >= 20 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <p className="text-sm leading-relaxed" style={{ color: getColor(totalScore) }}>
              {totalScore >= 30
                ? 'Score ≥ 30% : Score cliniquement significatif. Suggère la présence possible d\'un trouble dissociatif. Une évaluation clinique approfondie est recommandée (SCID-D, DDQ).'
                : totalScore >= 20
                ? 'Score 20-29% : Score modéré. Des expériences dissociatives notables sont présentes. À explorer cliniquement.'
                : 'Score < 20% : Dans la norme. Les expériences dissociatives rapportées sont dans les limites normales.'}
            </p>
          </div>

          {/* Taxon */}
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-violet-700 uppercase">DES-Taxon (dissociation pathologique)</span>
              <span className="text-lg font-bold text-violet-700">{taxonScore.toFixed(1)}%</span>
            </div>
            <p className="text-xs text-violet-600">
              {taxonScore >= 20
                ? 'Score élevé : suggère une dissociation pathologique (vs absorption normale). Items : amnésie, dépersonnalisation, voix.'
                : 'Dans les limites normales. Les expériences rapportées relèvent davantage de l\'absorption que de la dissociation pathologique.'}
            </p>
          </div>

          {/* Subscales */}
          <div>
            <h2 className="text-sm font-bold text-slate-800 mb-3">Sous-échelles</h2>
            <div className="space-y-3">
              {Object.entries(SUBSCALES).map(([name, items]) => {
                const score = computeSubscale(items);
                return (
                  <div key={name} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{name}</span>
                      <span className="text-sm font-bold" style={{ color: getColor(score) }}>{score.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(score, 100)}%`, backgroundColor: getColor(score) }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{items.length} items</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questionnaire screen
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setStarted(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-sm font-semibold text-slate-800">DES-II</h1>
          </div>
          <span className="text-xs text-slate-400">{answeredCount}/28</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-100 mt-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{ width: `${(answeredCount / 28) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-6 space-y-6">
        {DES_ITEMS.map((text, i) => (
          <div
            key={i}
            className={`rounded-xl border p-4 transition-colors ${answers[i] !== undefined ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200'}`}
          >
            <div className="flex gap-3 mb-3">
              <span className="text-xs font-mono text-slate-400 mt-0.5">{i + 1}.</span>
              <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 ml-6">
              {SCALE_OPTIONS.map((val) => (
                <button
                  key={val}
                  onClick={() => handleAnswer(i, val)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
                    answers[i] === val
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4 pb-8">
          <button
            onClick={() => setShowResults(true)}
            disabled={answeredCount === 0}
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Voir les résultats {answeredCount < 28 && `(${answeredCount}/28 répondus)`}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
