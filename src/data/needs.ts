import type { EmotionalNeed } from '@/types';

export const needs: EmotionalNeed[] = [
  {
    id: 'securite-attachement',
    number: 1,
    name: "Sécurité liée à l'attachement (stabilité, sécurité, éducation attentive, acceptation)",
    domainId: 'separation-rejet',
  },
  {
    id: 'autonomie-competence',
    number: 2,
    name: 'Autonomie, compétence, identité',
    domainId: 'manque-autonomie',
  },
  {
    id: 'liberte-expression',
    number: 3,
    name: "Liberté d'exprimer ses besoins et émotions",
    domainId: 'orientation-autres',
  },
  {
    id: 'spontaneite-jeu',
    number: 4,
    name: 'Spontanéité et jeu',
    domainId: 'survigilance-inhibition',
  },
  {
    id: 'limites-autocontrole',
    number: 5,
    name: 'Limites et autocontrôle',
    domainId: 'manque-limites',
  },
];
