import type { Domain } from '@/types';

export const domains: Domain[] = [
  {
    id: 'separation-rejet',
    number: 1,
    name: 'Séparation & Rejet',
    color: '#FECACA',
    colorLight: '#FEF2F2',
    needId: 'securite-attachement',
    familyDescription: 'Familles instables, maltraitantes, froides, rejetantes, isolées. Ces patients sont souvent les plus sérieusement touchés.',
  },
  {
    id: 'manque-autonomie',
    number: 2,
    name: "Manque d'Autonomie & de Performance",
    color: '#FED7AA',
    colorLight: '#FFF7ED',
    needId: 'autonomie-competence',
    familyDescription: "Familles surprotectrices, fusionnelles, ne favorisant pas l'indépendance.",
  },
  {
    id: 'manque-limites',
    number: 3,
    name: 'Manque de Limites',
    color: '#FEF08A',
    colorLight: '#FEFCE8',
    needId: 'limites-autocontrole',
    familyDescription: "Familles trop permissives, enfant gâté ou idolâtré sans amour authentique.",
  },
  {
    id: 'orientation-autres',
    number: 4,
    name: 'Orientation vers les Autres',
    color: '#BBF7D0',
    colorLight: '#F0FDF4',
    needId: 'liberte-expression',
    familyDescription: "Le patient sacrifie ses propres besoins pour obtenir l'approbation ou éviter le rejet (acceptation conditionnelle).",
  },
  {
    id: 'survigilance-inhibition',
    number: 5,
    name: 'Survigilance & Inhibition',
    color: '#BFDBFE',
    colorLight: '#EFF6FF',
    needId: 'spontaneite-jeu',
    familyDescription: 'Familles perfectionnistes, rigides, intransigeantes, punitives.',
  },
];
