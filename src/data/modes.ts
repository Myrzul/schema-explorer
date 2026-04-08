import type { SchemaMode } from '@/types';

export const modes: SchemaMode[] = [
  // ========== Modes Enfant ==========
  {
    id: 'enfant-vulnerable',
    name: 'Enfant Vulnérable',
    category: 'enfant',
    affect: 'Triste, effrayé, fragile, sans défense, impuissant',
    description:
      "LE mode central à soigner. Représente l'enfant intérieur blessé, porteur des émotions liées aux besoins non comblés. Pré-verbal chez les borderlines (< 3 ans).",
    clinicalNotes:
      "Marilyn Monroe représentait ce côté sans défense. Ce mode est la cible principale du re-parentage partiel : le thérapeute doit d'abord valider puis apaiser cet enfant intérieur.",
    schemaIds: [
      'abandon-instabilite',
      'mefiance-abus',
      'manque-affectif',
      'isolement-social',
      'dependance-incompetence',
      'peur-danger-maladie',
      'fusionnement-personnalite-atrophiee',
      'negativite-pessimisme',
      'echec',
    ],
    therapeuticGoal: 'Éduquer, soutenir et protéger',
    recognitionCues: [
      { question: 'Que ressentez-vous ?', response: 'Expressions de tristesse, peur, impuissance' },
    ],
  },
  {
    id: 'enfant-colereux',
    name: 'Enfant Coléreux',
    category: 'enfant',
    affect: 'Furieux, hurle, impulsions violentes',
    description:
      "Réaction directe aux besoins non comblés. Colère légitime de l'enfant dont les droits fondamentaux sont bafoués. Souvent caché sous le Protecteur Détaché.",
    clinicalNotes:
      "Correspond au système RAGE de Panksepp. Si le thérapeute ne contacte pas ce mode, le patient quitte la thérapie ou s'automutile.",
    schemaIds: [
      'abandon-instabilite',
      'mefiance-abus',
      'manque-affectif',
      'assujettissement',
    ],
    therapeuticGoal: 'Poser des limites tout en validant la colère',
  },
  {
    id: 'enfant-impulsif',
    name: 'Enfant Impulsif/Indiscipliné',
    category: 'enfant',
    affect: 'Insouciant, impatient, incontrôlé, gâté',
    description:
      "Peter Pan. Agit selon ses désirs immédiats. Basse tolérance à la frustration. Non lié aux besoins fondamentaux mais au manque de limites.",
    clinicalNotes:
      "À la différence de l'Enfant Coléreux (colère légitime liée à des besoins non comblés), l'Enfant Impulsif agit par caprice et manque d'autodiscipline.",
    schemaIds: ['droits-exageres', 'controle-soi-insuffisant'],
    therapeuticGoal: "Poser des limites : réciprocité et autodiscipline",
  },
  {
    id: 'enfant-heureux',
    name: 'Enfant Heureux',
    category: 'enfant',
    affect: 'Aimé, satisfait, spontané',
    description:
      "But thérapeutique pour cet état. Représente la santé émotionnelle : l'enfant dont les besoins fondamentaux sont comblés.",
    clinicalNotes:
      "Aucun schéma activé. Ce mode est le signe que les besoins émotionnels sont satisfaits de manière saine.",
    schemaIds: [],
    therapeuticGoal: "Renforcer et développer",
  },

  // ========== Modes Coping Dysfonctionnel ==========
  {
    id: 'protecteur-detache',
    name: 'Protecteur Détaché',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'evitement',
    affect: 'Plat, vide, mécanique, robotisé',
    description:
      "Se coupe de ses émotions et de ses besoins. Masque affectif vide. Isole des autres. Bloque l'accès à l'Enfant Vulnérable.",
    clinicalNotes:
      "Le travail cognitif le RENFORCE. Réponse au système FEAR de Panksepp → inhibe les systèmes prosociaux (Porges). Ne pas confondre avec l'Adulte Sain : le PD dit \"je ne ressens rien\".",
    schemaIds: [
      'abandon-instabilite',
      'mefiance-abus',
      'surcontrole-emotionnel',
    ],
    therapeuticGoal: 'Remplacer — contourner pour accéder à l\'Enfant Vulnérable',
    recognitionCues: [
      { question: 'Que ressentez-vous ?', response: '"Rien" / "Je me sens insensibilisé"' },
      { question: "Qu'avez-vous envie de faire ?", response: '"Je ne sais pas"' },
      { question: 'Que ressentez-vous envers moi ?', response: '"Rien"' },
    ],
  },
  {
    id: 'soumis-obeissant',
    name: 'Soumis Obéissant',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'soumission',
    affect: 'Passif, dépendant, docile',
    description:
      "Tient le rôle de l'enfant impuissant. Cherche à plaire à tout prix. Autorise parfois l'abus pour protéger la relation.",
    clinicalNotes:
      "Ne pas confondre avec l'Adulte Sain : le SO dit \"je veux vous aider\" (par soumission, pas par choix). Le PD dit \"je ne ressens rien\" ; le SO dit \"je veux vous aider\".",
    schemaIds: [
      'dependance-incompetence',
      'fusionnement-personnalite-atrophiee',
      'assujettissement',
      'abnegation',
      'recherche-approbation',
    ],
    therapeuticGoal: 'Modérer — développer l\'affirmation de soi',
  },
  {
    id: 'auto-magnificateur',
    name: 'Auto-Magnificateur / Compensateur',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'compensation',
    affect: 'Arrogant, supérieur, enflé',
    description:
      "Se bat contre le schéma en paraissant son opposé. Grandiosité, recherche d'admiration. Peut alterner avec l'Enfant Vulnérable chez les narcissiques.",
    clinicalNotes:
      "Chez le narcissique, c'est le mode de base AVEC les autres. Les critères DSM-IV du narcissisme ne décrivent que ce mode, ignorant la souffrance réelle.",
    schemaIds: ['droits-exageres', 'recherche-approbation'],
    therapeuticGoal: 'Modérer — confrontation empathique',
  },

  // ========== Modes Parent Dysfonctionnel ==========
  {
    id: 'parent-punitif',
    name: 'Parent Punitif',
    category: 'parent-dysfonctionnel',
    affect: 'Dur, critique, implacable, qui ne pardonne pas',
    description:
      "Internalisation d'un parent dévalorisant et punitif. Punit l'expression des besoins. Le mode le plus destructeur.",
    clinicalNotes:
      "But thérapeutique : l'ÉLIMINER complètement (pas juste le modérer, à la différence des autres modes). Suicidalité : distinguer si elle vient du Parent Punitif (punition) ou de l'Enfant Abandonné (mettre fin à la douleur).",
    schemaIds: ['imperfection-honte', 'negativite-pessimisme', 'punition'],
    therapeuticGoal: "ÉLIMINER complètement",
  },
  {
    id: 'parent-exigeant',
    name: 'Parent Exigeant',
    category: 'parent-dysfonctionnel',
    affect: 'Pressant, perfectionniste, intransigeant',
    description:
      "Internalisation d'un parent avec des standards très élevés. Pression constante, impitoyable car la perfection est impossible.",
    clinicalNotes:
      "Associé aux familles perfectionnistes et rigides. La pression est interne et permanente.",
    schemaIds: ['surcontrole-emotionnel', 'ideaux-exigeants'],
    therapeuticGoal: 'Modérer significativement',
  },

  // ========== Mode Adulte Sain ==========
  {
    id: 'adulte-sain',
    name: 'Adulte Sain',
    category: 'sain',
    affect: 'Fort, aimant, équilibré, raisonnable',
    description:
      "Le but thérapeutique. Au début, c'est le THÉRAPEUTE qui incarne l'Adulte Sain. Progressivement, le patient l'internalise. Logique de Bowlby : le thérapeute devient la base sûre.",
    clinicalNotes:
      "3 fonctions : (1) Éduquer, soutenir et protéger l'Enfant Vulnérable. (2) Poser des limites à l'Enfant Coléreux et Impulsif. (3) Combattre ou modérer les modes dysfonctionnels.",
    schemaIds: [],
    therapeuticGoal: 'Renforcer et développer — c\'est le but de la thérapie',
    recognitionCues: [
      { question: 'Que ressentez-vous ?', response: 'Description émotionnelle nuancée' },
      { question: "Qu'avez-vous envie de faire ?", response: 'Exprime un désir ou une direction' },
      { question: 'Que ressentez-vous envers moi ?', response: 'Connexion authentique exprimée' },
    ],
  },
];
