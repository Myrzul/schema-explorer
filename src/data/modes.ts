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

  // ========== Modes Coping Dysfonctionnel — Évitement ==========
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
    id: 'protecteur-evitant',
    name: 'Protecteur Évitant',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'evitement',
    affect: 'Distant, isolé, indépendant à l\'excès',
    description:
      "Se caractérise par un isolement social, une indépendance excessive et une déconnexion des autres pour éviter toute activation de schéma.",
    clinicalNotes:
      "Retrait social actif, à distinguer du Protecteur Détaché (retrait psychologique). Le patient évite physiquement les situations plutôt que de se couper émotionnellement.",
    schemaIds: ['isolement-social', 'mefiance-abus', 'imperfection-honte'],
    therapeuticGoal: 'Remplacer — exposition progressive aux relations',
  },
  {
    id: 'auto-stimulateur',
    name: 'Auto-Stimulateur',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'evitement',
    affect: 'Agité, en recherche de sensations, compulsif',
    description:
      "Recherche compulsivement l'excitation ou la distraction pour combler un sentiment de vide ou d'ennui (achats compulsifs, conduite risquée, substances excitantes, pornographie).",
    clinicalNotes:
      "Mécanisme de fuite par sur-stimulation. Le patient ne fuit pas les gens mais les émotions, en les noyant sous l'excitation.",
    schemaIds: ['controle-soi-insuffisant', 'surcontrole-emotionnel'],
    therapeuticGoal: 'Modérer — identifier le vide sous-jacent',
  },
  {
    id: 'auto-tranquilliseur',
    name: 'Auto-Tranquilliseur',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'evitement',
    affect: 'Engourdi, apaisé artificiellement, passif',
    description:
      "Utilise des activités compulsives pour distraire l'attention et s'apaiser : addictions sédatives (alcool, cannabis), boulimie, scarifications, ou absorption excessive dans internet/TV.",
    clinicalNotes:
      "À distinguer de l'Auto-Stimulateur : ici le but est l'apaisement, pas l'excitation. Les deux fuient la douleur mais par des voies opposées.",
    schemaIds: ['controle-soi-insuffisant', 'manque-affectif'],
    therapeuticGoal: 'Modérer — développer des stratégies d\'apaisement saines',
  },
  {
    id: 'protecteur-colereux',
    name: 'Protecteur en Colère',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'evitement',
    affect: 'Colère défensive, irritable, menaçant',
    description:
      "Utilise un « écran de colère » pour tenir les autres à distance et se protéger ainsi des émotions négatives ou de ceux perçus comme menaçants.",
    clinicalNotes:
      "À distinguer de l'Enfant Coléreux (colère légitime liée à des besoins non comblés). Ici la colère est stratégique et défensive, pas une expression de souffrance.",
    schemaIds: ['mefiance-abus', 'abandon-instabilite'],
    therapeuticGoal: 'Modérer — accéder à la vulnérabilité sous la colère',
  },

  // ========== Modes Coping Dysfonctionnel — Soumission ==========
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

  {
    id: 'hypercontroleur-perfectionniste',
    name: 'Hypercontrôleur Perfectionniste',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'compensation',
    affect: 'Tendu, rigide, contrôlant, anxieux',
    description:
      "Tente de contrôler tout ce qui pourrait amener une critique ou une malchance. Inclut des variantes : Hypercontrôleur Alimentaire (restrictions pour la minceur) et Hypercontrôleur Obsessionnel-Compulsif (rituels de vérification, rangement).",
    clinicalNotes:
      "Mécanisme de compensation face à la peur de l'imperfection et du jugement. Le contrôle est la tentative de prévenir toute activation du schéma.",
    schemaIds: ['ideaux-exigeants', 'negativite-pessimisme', 'punition'],
    therapeuticGoal: 'Modérer — assouplir les standards',
  },
  {
    id: 'hypercontroleur-soupconneux',
    name: 'Hypercontrôleur Soupçonneux',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'compensation',
    affect: 'Méfiant, vigilant, suspicieux',
    description:
      "Cherche activement des indices de mauvaises intentions chez autrui pour contrôler une menace perçue.",
    clinicalNotes:
      "Compensation directe du schéma Méfiance/Abus : plutôt que de subir, le patient tente de détecter et prévenir l'agression.",
    schemaIds: ['mefiance-abus'],
    therapeuticGoal: 'Modérer — réalité-tester les suspicions',
  },
  {
    id: 'agresseur-brutal',
    name: 'Agresseur Brutal',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'compensation',
    affect: 'Intimidant, violent, dominateur',
    description:
      "Utilise l'intimidation, la menace ou l'agression (physique, verbale, sexuelle) pour dominer et obtenir ce qu'il veut.",
    clinicalNotes:
      "Mode fréquent dans le trouble antisocial. Compensation extrême : « je frappe avant d'être frappé ». Poser des limites fermes en thérapie.",
    schemaIds: ['mefiance-abus', 'droits-exageres'],
    therapeuticGoal: 'Poser des limites strictes — confrontation empathique',
  },
  {
    id: 'manipulateur-escroc',
    name: 'Manipulateur Escroc',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'compensation',
    affect: 'Rusé, calculateur, trompeur',
    description:
      "Escroque ou manipule de façon couverte pour éviter une sanction ou persécuter autrui.",
    clinicalNotes:
      "Mode typique du trouble antisocial. À la différence de l'Agresseur Brutal, la manipulation est indirecte et camouflée.",
    schemaIds: ['mefiance-abus', 'droits-exageres'],
    therapeuticGoal: 'Confronter — établir la transparence relationnelle',
  },
  {
    id: 'predateur',
    name: 'Prédateur',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'compensation',
    affect: 'Froid, impitoyable, calculé',
    description:
      "Agit de manière froide, impitoyable et calculée pour éliminer un obstacle ou une menace. Vision binaire du monde : proies et prédateurs.",
    clinicalNotes:
      "Mode le plus dangereux. Associé aux personnalités antisociales sévères et psychopathiques. Absence apparente d'empathie et de remords.",
    schemaIds: ['mefiance-abus', 'droits-exageres'],
    therapeuticGoal: 'Poser des limites absolues — confrontation directe',
  },
  {
    id: 'chercheur-approbation',
    name: "Chercheur d'Approbation et de Reconnaissance",
    category: 'coping-dysfonctionnel',
    copingStyleId: 'compensation',
    affect: 'En quête d\'attention, extraverti, démonstratif',
    description:
      "Cherche l'attention par des comportements extravagants ou inappropriés pour compenser un sentiment de solitude.",
    clinicalNotes:
      "Compensation du manque affectif et de l'isolement social. Mode fréquent dans le trouble histrionique.",
    schemaIds: ['recherche-approbation', 'manque-affectif', 'isolement-social'],
    therapeuticGoal: 'Modérer — valider le besoin, réorienter l\'expression',
  },
  {
    id: 'ruminateur',
    name: 'Ruminateur',
    category: 'coping-dysfonctionnel',
    copingStyleId: 'compensation',
    affect: 'Ressassant, inquiet, tourmenté',
    description:
      "Répétition improductive de pensées négatives (soucis, regrets, vengeance, remise en question) qui entretiennent la détresse émotionnelle.",
    clinicalNotes:
      "Souvent confondu avec la réflexion constructive. La rumination est circulaire et ne mène à aucune solution. Elle maintient le patient dans un mode cognitif qui évite le ressenti émotionnel.",
    schemaIds: ['negativite-pessimisme', 'surcontrole-emotionnel'],
    therapeuticGoal: 'Modérer — interrompre la boucle et rediriger vers le ressenti',
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

  {
    id: 'parent-culpabilisant',
    name: 'Parent Culpabilisant / Humiliant / Violent',
    category: 'parent-dysfonctionnel',
    affect: 'Accusateur, humiliant, abusif',
    description:
      "Formes spécifiques du parent dysfonctionnel provoquant respectivement une culpabilité intense, de la honte ou une souffrance physique chez l'Enfant Vulnérable.",
    clinicalNotes:
      "Distinguer la variante dominante : culpabilisation (« tout est de ta faute »), humiliation (« tu es ridicule ») ou violence (menace physique internalisée). Chaque variante cible un schéma différent.",
    schemaIds: ['imperfection-honte', 'punition', 'mefiance-abus'],
    therapeuticGoal: "ÉLIMINER complètement",
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
