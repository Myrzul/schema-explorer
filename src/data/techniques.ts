import type { TherapeuticTechnique } from '@/types';

export const techniques: TherapeuticTechnique[] = [
  {
    id: 'imagerie',
    name: 'Imagerie',
    target: 'Schéma (niveau émotionnel)',
    mechanism: "Transforme la \"cognition froide\" en \"cognition chaude\". Accède aux réseaux neuronaux amygdaliens. Contourne le Protecteur Détaché.",
  },
  {
    id: 'dialogue-chaises',
    name: 'Dialogue des chaises (Gestalt)',
    target: 'Modes',
    mechanism: "Externalise le conflit entre modes. Donne une voix à l'Enfant Vulnérable face au Parent Punitif.",
  },
  {
    id: 're-parentage-partiel',
    name: 'Re-parentage partiel',
    target: 'Relation thérapeutique → Modes',
    mechanism: "Thérapeute = base sûre (Bowlby). Internalisation progressive de l'Adulte Sain. Le thérapeute devient la base sûre que le patient n'a jamais eue.",
  },
  {
    id: 'restructuration-cognitive',
    name: 'Restructuration cognitive',
    target: 'Cognitions du schéma',
    mechanism: "Efficace pour les patients à bon niveau de fonctionnement.",
    warnings: "RENFORCE le Protecteur Détaché et le Surcontrôle Émotionnel. À utiliser avec précaution.",
  },
  {
    id: 'modification-comportementale',
    name: 'Modification comportementale',
    target: "Styles d'adaptation",
    mechanism: "Remplace les comportements dirigés par les schémas par des comportements adaptés.",
  },
  {
    id: 'confrontation-empathique',
    name: 'Confrontation empathique',
    target: 'Relation thérapeutique',
    mechanism: "Combine soutien et challenge. \"Je comprends pourquoi vous faites ça ET ça vous maintient dans le problème.\"",
  },
  {
    id: 'lettres-parents',
    name: 'Lettres aux parents',
    target: 'Schéma (émotionnel)',
    mechanism: "Exprime colère et douleur aux figures parentales. Travail de deuil des besoins non comblés.",
  },
  {
    id: 'brainspotting',
    name: 'Brainspotting',
    target: 'Protecteur Détaché / mémoire implicite',
    mechanism: "Court-circuite le cortex pour atteindre les réseaux amygdaliens (proto-soi de Damasio). Particulièrement utile quand l'imagerie échoue.",
  },
];
