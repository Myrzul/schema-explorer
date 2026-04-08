import type { CopingStyle } from '@/types';

export const copingStyles: CopingStyle[] = [
  {
    id: 'soumission',
    name: 'Soumission',
    metaphor: 'Capitulation',
    mechanism: "Rejoue le schéma tel quel. Se soumet comme dans l'enfance.",
    modeId: 'soumis-obeissant',
  },
  {
    id: 'evitement',
    name: 'Évitement',
    metaphor: 'Fuite',
    mechanism: 'Fuit le schéma : déni, évasion, minimisation, détachement.',
    modeId: 'protecteur-detache',
  },
  {
    id: 'compensation',
    name: 'Compensation',
    metaphor: 'Contre-attaque',
    mechanism: 'Combat le schéma en apparaissant comme son opposé.',
    modeId: 'auto-magnificateur',
  },
];
