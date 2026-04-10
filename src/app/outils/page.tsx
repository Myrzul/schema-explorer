'use client';

import Link from 'next/link';
import { ClipboardList, Brain, FileText, Zap } from 'lucide-react';

const tools = [
  {
    id: 'ysq',
    name: 'YSQ-L3',
    subtitle: 'Questionnaire des Schémas de Young',
    description: '232 items — Identifie la présence et l\'intensité des 18 schémas précoces inadaptés.',
    icon: <ClipboardList className="w-6 h-6" />,
    color: '#3d6b5e',
    bgColor: '#eaf4f0',
    href: '/outils/ysq',
  },
  {
    id: 'des',
    name: 'DES-II',
    subtitle: 'Échelle des Expériences Dissociatives',
    description: '28 items — Évalue la fréquence des expériences dissociatives (dépersonnalisation, amnésie, absorption).',
    icon: <Brain className="w-6 h-6" />,
    color: '#7a4a9a',
    bgColor: '#f5f0ff',
    href: '/outils/des',
  },
  {
    id: 'conceptualisation',
    name: 'Diagramme de Conceptualisation',
    subtitle: 'Outil ISST interactif',
    description: 'Remplissez le diagramme de conceptualisation de cas en thérapie des schémas, puis téléchargez-le en PDF.',
    icon: <FileText className="w-6 h-6" />,
    color: '#b8453a',
    bgColor: '#fef2f0',
    href: '/outils/conceptualisation',
  },
  {
    id: 'memo-flash',
    name: 'Fiche Mémo-Flash',
    subtitle: 'Young, Wattenmaker & Wattenmaker (1996)',
    description: 'Fiche à remplir en séance ou entre les séances : identification du schéma, mise à l\'épreuve de la réalité et instruction comportementale.',
    icon: <Zap className="w-6 h-6" />,
    color: '#D97706',
    bgColor: '#FFFBEB',
    href: '/fiche-memo-flash.pdf',
  },
];

export default function OutilsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Outils & Questionnaires</h1>
          <p className="text-sm text-slate-500">
            Questionnaires interactifs et outils cliniques pour l&apos;évaluation en thérapie des schémas.
          </p>
        </div>

        <div className="grid gap-4">
          {tools.map((tool) => {
            const isPdf = tool.href.endsWith('.pdf');
            const card = (
              <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: tool.bgColor, color: tool.color }}
                  >
                    {tool.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-bold text-slate-800">{tool.name}</h2>
                      <span className="text-xs text-slate-400">{tool.subtitle}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              </div>
            );
            return isPdf ? (
              <a key={tool.id} href={tool.href} download className="group">
                {card}
              </a>
            ) : (
              <Link key={tool.id} href={tool.href} className="group">
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
