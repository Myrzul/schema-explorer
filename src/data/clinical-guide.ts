// ---------------------------------------------------------------------------
// Données cliniques pour la page Prise en charge
// ---------------------------------------------------------------------------

// ======================== PHASES DE THÉRAPIE ========================

export interface TherapyPhase {
  id: string;
  name: string;
  order: number;
  icon: string;
  color: string;
  objective: string;
  description: string;
  tools: string[];
  instrumentLinks?: { label: string; href: string }[];
  techniqueIds?: string[];
}

export const therapyPhases: TherapyPhase[] = [
  {
    id: 'diagnostic',
    name: '1. Diagnostic',
    order: 1,
    icon: '🔍',
    color: '#2563EB',
    objective: 'Identifier les schémas, modes et stratégies actifs',
    description:
      "Phase d'évaluation complète du fonctionnement du patient. On utilise les questionnaires standardisés et l'imagerie diagnostique pour repérer les SPI, les modes dominants, les déclencheurs et le tempérament du patient.",
    tools: [
      'Questionnaire des Schémas de Young (YSQ-L3)',
      'Inventaire des Modes (SMI)',
      'Échelle des Expériences Dissociatives (DES-II)',
      'Imagerie diagnostique',
      'Repérage des déclencheurs et du tempérament',
    ],
    instrumentLinks: [
      { label: 'YSQ-L3', href: '/outils/ysq' },
      { label: 'DES-II', href: '/outils/des' },
    ],
    techniqueIds: ['fleche-descendante', 'psychoeducation', 'journal-schemas'],
  },
  {
    id: 'conceptualisation',
    name: '2. Conceptualisation',
    order: 2,
    icon: '🗺️',
    color: '#7C3AED',
    objective: 'Construire une carte partagée du fonctionnement du patient',
    description:
      "Psychoéducation du patient sur le modèle des schémas et des modes. Co-construction du diagramme de conceptualisation qui relie les expériences passées, les schémas, les stratégies et les problèmes actuels. Le patient comprend le « pourquoi » de ses réactions.",
    tools: [
      'Diagramme de conceptualisation des modes',
      'Psychoéducation (schémas, modes, besoins affectifs)',
      'Exploration de l\'histoire développementale',
      'Identification des scénarios de vie répétitifs',
    ],
    instrumentLinks: [
      { label: 'Diagramme de conceptualisation', href: '/outils/conceptualisation' },
    ],
    techniqueIds: ['psychoeducation', 'journal-schemas', 'lettres-schemas'],
  },
  {
    id: 'changement',
    name: '3. Phase de changement',
    order: 3,
    icon: '🔄',
    color: '#DC2626',
    objective: 'Reconsolidation émotionnelle des souvenirs traumatiques',
    description:
      "Phase centrale où le travail émotionnel profond s'opère. Le thérapeute utilise l'imagerie avec reparentage, le travail des chaises et la confrontation empathique pour modifier les traces mnésiques et offrir une expérience émotionnelle correctrice. L'objectif est de passer des « cognitions froides » aux « cognitions chaudes ».",
    tools: [
      'Activation de ressources (lieu sûr, ancrage, animal d\'attachement)',
      'Imagerie avec reparentage (Imagery Rescripting)',
      'Confrontation du Parent Punitif',
      'Travail des chaises (Chairwork)',
      'Confrontation empathique',
      'EMDR / Brainspotting (si trauma complexe)',
    ],
    techniqueIds: [
      'imagerie-rescripting',
      'travail-chaises',
      'confrontation-empathique',
      'reparentage-partiel',
      'lettres-schemas',
      'restructuration-cognitive',
    ],
  },
  {
    id: 'rupture-scenarios',
    name: '4. Rupture des scénarios',
    order: 4,
    icon: '🎭',
    color: '#EA580C',
    objective: 'Traduire les changements émotionnels en nouveaux comportements',
    description:
      "Phase comportementale où le patient apprend à agir différemment dans sa vie quotidienne. On utilise les jeux de rôles pour pratiquer de nouvelles réponses, les tâches à domicile pour ancrer les changements et les fiches mémo-flash pour le quotidien.",
    tools: [
      'Jeux de rôles en séance',
      'Tâches comportementales à domicile',
      'Fiches mémo-flash (aide-mémoire pour le quotidien)',
      'Affirmation de soi et pose de limites',
      'Exposition graduelle',
    ],
    techniqueIds: [
      'jeux-de-role',
      'taches-comportementales',
      'affirmation-soi',
      'exposition-graduelle',
    ],
  },
  {
    id: 'consolidation',
    name: '5. Consolidation',
    order: 5,
    icon: '🌱',
    color: '#16A34A',
    objective: "Renforcer l'Adulte Sain et préparer l'autonomie",
    description:
      "Phase finale où l'on renforce la capacité du patient à reconnaître ses modes, consoler son Enfant Vulnérable de manière autonome, fixer des limites et vivre en accord avec ses valeurs. La fin de thérapie est progressive avec espacement des séances.",
    tools: [
      "Renforcement de l'Adulte Sain",
      'Prévention de la rechute',
      'Espacement progressif des séances',
      'Bilan des acquis et des transformations',
      "Lettre de l'Adulte Sain à l'Enfant Vulnérable",
    ],
    techniqueIds: [
      'psychoeducation',
      'journal-schemas',
      'lettres-schemas',
      'taches-comportementales',
    ],
  },
];

// ======================== PARCOURS EV → AS ========================

export interface PathwayStep {
  id: string;
  order: number;
  label: string;
  description: string;
  tools: string[];
  color: string;
  targetMode: string;
}

export const evToAsPathway: PathwayStep[] = [
  {
    id: 'ressources',
    order: 1,
    label: 'Activer les ressources',
    description:
      "Lieu sûr, ancrage corporel, animal d'attachement. Réduit la force du Protecteur Détaché et sécurise le patient avant le travail émotionnel.",
    tools: ['Activation de ressources (Schwarz)', 'Relaxation', 'Mindfulness'],
    color: '#0EA5E9',
    targetMode: 'Protecteur Détaché',
  },
  {
    id: 'imagerie-diag',
    order: 2,
    label: 'Identifier (imagerie diagnostique)',
    description:
      "Pont affectif depuis une émotion présente vers un souvenir d'enfance. Identification des SPI, des stratégies de l'enfant et des besoins insatisfaits.",
    tools: ['Imagerie diagnostique', 'Pont affectif (fil d\'Ariane)'],
    color: '#2563EB',
    targetMode: 'Enfant Vulnérable',
  },
  {
    id: 'acces-ev',
    order: 3,
    label: "Accéder à l'Enfant Vulnérable",
    description:
      "Encourager le patient à quitter ses modes de protection pour laisser paraître sa vulnérabilité. C'est le seul état où la guérison émotionnelle est possible.",
    tools: ['Reparentage partiel', 'Accordage émotionnel', 'Confrontation empathique douce'],
    color: '#7C3AED',
    targetMode: 'Enfant Vulnérable',
  },
  {
    id: 'reparentage',
    order: 4,
    label: "Reparenter l'enfant",
    description:
      "Le thérapeute entre dans l'image, protège l'enfant, répond à ses besoins affectifs fondamentaux. Expérience émotionnelle correctrice = reconsolidation mnésique.",
    tools: ['Imagerie avec reparentage', 'Reparentage partiel en séance'],
    color: '#DC2626',
    targetMode: 'Enfant Vulnérable',
  },
  {
    id: 'colere',
    order: 5,
    label: "Exprimer la colère légitime",
    description:
      "Permettre à l'Enfant en Colère d'exprimer sa rage face à l'injustice vécue. La colère est légitime et doit être exprimée avant tout travail de résolution.",
    tools: ['Travail des chaises', 'Imagerie — dialogue avec le parent'],
    color: '#EA580C',
    targetMode: 'Enfant Coléreux',
  },
  {
    id: 'parent-punitif',
    order: 6,
    label: 'Confronter le Parent Punitif',
    description:
      "Déconstruire les messages toxiques de culpabilité. Le thérapeute se montre ferme et protecteur : la faute incombait à l'adulte, pas à l'enfant.",
    tools: ['Exercice de confrontation du Parent Punitif', 'Travail des chaises', 'Imagerie'],
    color: '#991B1B',
    targetMode: 'Parent Punitif',
  },
  {
    id: 'transfert-as',
    order: 7,
    label: "Transférer à l'Adulte Sain du patient",
    description:
      "Progressivement, c'est l'Adulte Sain du patient qui intervient dans l'imagerie pour protéger l'enfant. Le thérapeute recule et coache.",
    tools: ['Imagerie — patient comme Adulte Sain', 'Jeux de rôles'],
    color: '#CA8A04',
    targetMode: 'Adulte Sain',
  },
  {
    id: 'autonomie',
    order: 8,
    label: "Autonomie de l'Adulte Sain",
    description:
      "Le patient reconnaît ses modes quand ils s'activent, console son Enfant Vulnérable, fixe des limites et vit en accord avec ses valeurs.",
    tools: ['Rupture des scénarios', 'Tâches comportementales', 'Prévention rechute'],
    color: '#16A34A',
    targetMode: 'Adulte Sain',
  },
];

// ======================== GUIDANCE PAR MODE ========================

export interface ModeGuidance {
  modeId: string;
  modeName: string;
  category: string;
  color: string;
  objective: string;
  approaches: string[];
  pitfalls: string[];
  indicators: string[];
  protocolIds: string[];
}

export const modeGuidances: ModeGuidance[] = [
  {
    modeId: 'enfant-vulnerable',
    modeName: 'Enfant Vulnérable',
    category: 'enfant',
    color: '#2563EB',
    objective:
      "Accueillir, valider et reparenter. C'est le mode où la guérison se produit — l'objectif est d'y accéder et d'y rester suffisamment longtemps.",
    approaches: [
      'Reparentage partiel : répondre aux besoins affectifs non comblés',
      "Accordage émotionnel : s'ajuster à l'état du patient en continu",
      'Imagerie avec reparentage : entrer dans le souvenir pour protéger l\'enfant',
      'Activation de ressources : lieu sûr et animal d\'attachement pour sécuriser',
      'Ton doux, posture contenante, validation inconditionnelle',
    ],
    pitfalls: [
      "Ne pas « faire taire » l'enfant — la vulnérabilité est l'espace de guérison",
      'Ne pas passer trop vite au cognitif — rester dans le ressenti',
      'Attention à ne pas réactiver un trauma sans filet de sécurité (lieu sûr, fenêtre de tolérance)',
      'Ne pas confondre reparentage et maternage — cadre professionnel',
    ],
    indicators: [
      'Le patient peut nommer ses émotions sans se dissocier',
      'Diminution du recours automatique au Protecteur Détaché',
      'Le patient accepte de rester dans la vulnérabilité en séance',
      "Apparition de pleurs « libérateurs » plutôt que de pleurs de sidération",
    ],
    protocolIds: ['reparentage-imagerie', 'activation-ressources'],
  },
  {
    modeId: 'enfant-colereux',
    modeName: 'Enfant Coléreux',
    category: 'enfant',
    color: '#EA580C',
    objective:
      "Valider et canaliser la colère légitime. L'enfant a le DROIT d'être en colère — cette expression est nécessaire avant toute résolution.",
    approaches: [
      "Travail des chaises : donner une voix à la colère face au parent dysfonctionnel",
      "Imagerie : l'enfant s'affirme auprès du parent après le reparentage du thérapeute",
      'Valider explicitement : « Ta colère est légitime, tu avais le droit d\'être en colère »',
      'Ne PAS exiger le pardon — ce n\'est pas un objectif en soi',
    ],
    pitfalls: [
      "Ne pas réprimer la colère — elle doit s'exprimer pour que le deuil se fasse",
      'Ne pas confondre colère légitime et passage à l\'acte — canaliser sans invalider',
      "Attention à l'hyper-activation : maintenir dans la fenêtre de tolérance",
      "Ne pas pousser au pardon prématuré — le pardon n'est possible qu'après l'expression complète de la rage",
    ],
    indicators: [
      'Le patient exprime sa colère sans culpabilité excessive',
      'Diminution de la colère retournée contre soi (auto-punition)',
      "Capacité à poser des limites dans la vie quotidienne",
      "Transition progressive vers la tristesse puis l'acceptation",
    ],
    protocolIds: ['confronter-parent-punitif'],
  },
  {
    modeId: 'protecteur-detache',
    modeName: 'Protecteur Détaché',
    category: 'coping',
    color: '#64748B',
    objective:
      "Réduire le détachement pour accéder à l'Enfant Vulnérable. Ce mode bloque toute guérison car il empêche l'accès aux émotions.",
    approaches: [
      "Activation de ressources AVANT le travail émotionnel — sécuriser pour réduire le besoin de protection",
      'Confrontation empathique : valider la fonction protectrice PUIS montrer le coût',
      "Nommer le mode à voix haute : « Je sens que le Protecteur Détaché est là en ce moment »",
      "Techniques corporelles : respiration, ancrage sensoriel pour contourner l'intellectualisation",
      "Patience — ne pas forcer le passage, le Protecteur est là pour une raison",
    ],
    pitfalls: [
      "Ne pas attaquer le Protecteur — il a été vital pour la survie de l'enfant",
      "Ne pas intellectualiser avec le patient (c'est ce que le Protecteur veut)",
      'Hypo-activation = aucune reconsolidation possible — vérifier le niveau émotionnel',
      'Éviter les séances purement cognitives qui renforcent le détachement',
    ],
    indicators: [
      "Le patient commence à ressentir des émotions en séance plutôt que d'en parler",
      'Diminution du discours « analytique » sur ses propres émotions',
      "Moments de connexion émotionnelle de plus en plus longs",
      'Le patient reconnaît lui-même quand il « décroche »',
    ],
    protocolIds: ['activation-ressources', 'imagerie-diagnostique'],
  },
  {
    modeId: 'parent-punitif',
    modeName: 'Parent Punitif',
    category: 'parent-dysfonctionnel',
    color: '#991B1B',
    objective:
      "Déconstruire et « chasser » les messages punitifs internalisés. Le thérapeute doit se montrer ferme contre ce mode.",
    approaches: [
      "Travail des chaises : externaliser la voix du Parent Punitif et la confronter",
      'Imagerie : le thérapeute entre dans le souvenir et confronte directement le parent dysfonctionnel',
      "Confrontation empathique : « La faute incombait à l'adulte, pas à l'enfant »",
      "Identifier les « déclencheurs » du mode dans le quotidien (colère contre soi, autocritique)",
      "Le thérapeute modélise l'Adulte Sain en étant ferme et protecteur",
    ],
    pitfalls: [
      "Ne pas minimiser la toxicité du Parent Punitif — être fermement du côté de l'enfant",
      "Attention à la culpabilité secondaire (« je me sens coupable de me sentir coupable »)",
      "Ne pas entrer en débat avec le mode — on ne cherche pas à convaincre, on affirme les droits de l'enfant",
      'Vérifier que le patient ne reste pas dans le mode PP en sortant de séance',
    ],
    indicators: [
      "Le patient identifie la « voix » du Parent Punitif comme distincte de la sienne",
      'Diminution de l\'auto-punition et de l\'autocritique',
      'Le patient peut se défendre face à la voix punitive',
      "L'Adulte Sain du patient commence à confronter le PP de manière autonome",
    ],
    protocolIds: ['confronter-parent-punitif'],
  },
  {
    modeId: 'parent-exigeant',
    modeName: 'Parent Exigeant',
    category: 'parent-dysfonctionnel',
    color: '#B91C1C',
    objective:
      'Assouplir les standards rigides et la pression de performance internalisée.',
    approaches: [
      'Identifier les « règles » du Parent Exigeant (« je dois être parfait, je ne dois jamais échouer »)',
      'Confrontation empathique : valider le besoin de réussir mais montrer le coût humain',
      "Travail des chaises : donner la voix à l'enfant écrasé par les exigences",
      'Techniques cognitives : restructurer les croyances de performance',
    ],
    pitfalls: [
      "Ne pas renforcer l'exigence en félicitant uniquement les performances",
      'Le patient peut confondre exigence saine et exigence toxique',
      "Attention au piège de la « thérapie productive » — le PE peut détourner la thérapie en performance",
    ],
    indicators: [
      "Le patient accepte l'imperfection sans anxiété majeure",
      'Diminution du perfectionnisme dans le quotidien',
      'Capacité à se reposer sans culpabilité',
    ],
    protocolIds: ['confronter-parent-punitif'],
  },
  {
    modeId: 'soumis-obeissant',
    modeName: 'Soumis Obéissant',
    category: 'coping',
    color: '#6366F1',
    objective:
      "Aider le patient à reconnaître ses propres besoins et à s'affirmer.",
    approaches: [
      "Confrontation empathique : « Je comprends que la soumission vous a protégé, mais aujourd'hui elle vous empêche de vivre vos propres besoins »",
      "Jeux de rôles : s'entraîner à dire non, poser des limites",
      "Imagerie : l'enfant s'affirme auprès du parent dans le souvenir",
      'Tâches comportementales graduelles d\'affirmation',
    ],
    pitfalls: [
      "Le patient peut être « trop bon patient » en thérapie — le mode Soumis peut mimer l'alliance",
      "Ne pas interpréter l'obéissance comme un progrès thérapeutique",
      'Aller progressivement — une affirmation trop brusque peut déclencher une panique',
    ],
    indicators: [
      'Le patient exprime un désaccord en séance',
      'Capacité à identifier ses propres besoins vs ceux des autres',
      'Premières expériences d\'affirmation dans la vie quotidienne',
    ],
    protocolIds: ['reparentage-imagerie'],
  },
  {
    modeId: 'auto-magnificateur',
    modeName: 'Compensateur / Auto-Magnificateur',
    category: 'coping',
    color: '#EA580C',
    objective:
      "Accéder à la vulnérabilité cachée sous la compensation. Le « masque » de supériorité protège un Enfant Vulnérable.",
    approaches: [
      'Confrontation empathique : valider le besoin de se sentir puissant PUIS montrer la vulnérabilité dessous',
      "Ne pas « attaquer » la compensation frontalement — construire l'alliance d'abord",
      "Imagerie : retrouver l'enfant qui a dû se « gonfler » pour survivre",
      "Limites claires en séance si le comportement est irrespectueux",
    ],
    pitfalls: [
      "Ne pas entrer en lutte de pouvoir — le Compensateur cherche le contrôle",
      'Ne pas renforcer le narcissisme par une admiration excessive',
      "Le patient peut quitter la thérapie si confronté trop tôt — dosage crucial",
      "Attention au contre-transfert : irritation, sentiment d'être manipulé",
    ],
    indicators: [
      "Moments de vulnérabilité authentique en séance",
      'Le patient reconnaît que la compensation a un coût',
      "Diminution des comportements de domination/contrôle",
    ],
    protocolIds: ['imagerie-diagnostique', 'reparentage-imagerie'],
  },
];

// ======================== PROTOCOLES CLINIQUES ========================

export interface ProtocolStep {
  type: 'instruction' | 'verbatim' | 'note';
  text: string;
}

export interface ClinicalProtocol {
  id: string;
  name: string;
  phaseIds: string[];
  targetModes: string[];
  summary: string;
  patientInstructions: string;
  steps: ProtocolStep[];
}

export const clinicalProtocols: ClinicalProtocol[] = [
  {
    id: 'imagerie-diagnostique',
    name: 'Imagerie diagnostique',
    phaseIds: ['diagnostic', 'conceptualisation'],
    targetModes: ['enfant-vulnerable', 'protecteur-detache'],
    summary:
      "Partir d'une émotion présente pour remonter à un souvenir d'enfance via le pont affectif. Permet d'identifier les SPI, les stratégies et les besoins insatisfaits.",
    patientInstructions:
      'Pensez à un problème récent de votre vie actuelle (ou plus ancien), qui a provoqué chez vous une intense émotion négative. Recherchez-le spécifiquement dans des événements activateurs d\'un vécu émotionnel répétitif.',
    steps: [
      { type: 'verbatim', text: '« Fermez les yeux et concentrez toute votre attention sur cet instant en revoyant bien la scène. »' },
      { type: 'verbatim', text: '« Quelle émotion ressentez-vous ? Où, dans votre corps, ressentez-vous cette émotion ? »' },
      { type: 'note', text: 'Pleine conscience. Faire préciser de façon détaillée les perceptions corporelles.' },
      { type: 'verbatim', text: '« Restez concentré sur ce ressenti corporel. Cherchez dans votre passé une image de vous-même dans une situation au cours de laquelle vous avez ressenti la même émotion. Vous pouvez remonter aussi loin qu\'il le faudra. »' },
      { type: 'note', text: 'Plusieurs images peuvent se succéder, inciter le patient à remonter à la plus ancienne.' },
      { type: 'instruction', text: 'Explorer cette image en détail :' },
      { type: 'verbatim', text: '« Que voyez-vous dans cette image ? »' },
      { type: 'verbatim', text: '« Quel âge avez-vous ? »' },
      { type: 'verbatim', text: '« Où êtes-vous ? »' },
      { type: 'verbatim', text: '« Que se passe-t-il dans cette image ? »' },
      { type: 'verbatim', text: '« Que ressent le Petit (la Petite) ... ? »' },
      { type: 'verbatim', text: '« À quoi pense-t-il (elle) ? »' },
      { type: 'verbatim', text: '« Comment se comporte-t-il ? »' },
      { type: 'instruction', text: 'Cherchez à identifier les Schémas Précoces et les Stratégies de l\'enfant dans cette situation.' },
      { type: 'instruction', text: 'Cherchez à identifier les besoins affectifs fondamentaux insatisfaits de l\'enfant.' },
      { type: 'note', text: 'Si le patient est hyperactivé, ramenez-le dans sa fenêtre de tolérance (relaxation, mindfulness, image du lieu sûr).' },
      { type: 'verbatim', text: '« Ouvrez les yeux. »' },
      { type: 'instruction', text: 'Demander au patient son feedback :' },
      { type: 'verbatim', text: '« D\'où êtes-vous parti ? Où êtes-vous allé ? Quels liens voyez-vous entre ce souvenir et votre vie actuelle ? »' },
      { type: 'instruction', text: 'Discutez avec le patient de votre conceptualisation : schémas, stratégies, modes. Faites le lien entre ce souvenir du passé et les problèmes pour lequel le patient consulte. Établissez un diagramme de conceptualisation.' },
    ],
  },
  {
    id: 'reparentage-imagerie',
    name: 'Imagerie avec reparentage',
    phaseIds: ['changement'],
    targetModes: ['enfant-vulnerable', 'enfant-colereux'],
    summary:
      "Technique centrale de la thérapie des schémas. Le thérapeute entre dans le souvenir pour protéger l'enfant, confronter le parent dysfonctionnel et offrir une expérience émotionnelle correctrice (reconsolidation mnésique).",
    patientInstructions:
      'Pensez à un problème récent de votre vie actuelle (ou plus ancien), qui a provoqué chez vous une intense émotion négative. Recherchez-le spécifiquement dans des événements activateurs d\'un vécu émotionnel répétitif.',
    steps: [
      { type: 'verbatim', text: '« Fermez les yeux et concentrez toute votre attention sur cet instant en revoyant bien la scène. »' },
      { type: 'verbatim', text: '« Quelle émotion ressentez-vous ? Où, dans votre corps, ressentez-vous cette émotion ? »' },
      { type: 'note', text: 'Pleine conscience. Faire préciser de façon détaillée les perceptions corporelles.' },
      { type: 'verbatim', text: '« Restez concentré sur ce ressenti corporel. Cherchez dans votre passé une image de vous-même dans une situation au cours de laquelle vous avez ressenti la même émotion. Vous pouvez remonter aussi loin qu\'il le faudra. »' },
      { type: 'note', text: 'Lien émotionnel avec le passé. Plusieurs images peuvent se succéder, inciter le patient à remonter à la plus ancienne.' },
      { type: 'instruction', text: 'Explorer cette image (Que voyez-vous ? Quel âge ? Où êtes-vous ? Que se passe-t-il ? Que ressent l\'enfant ? À quoi pense-t-il ?)' },
      { type: 'note', text: 'Identifier les SPI, les stratégies de l\'enfant et les besoins affectifs fondamentaux insatisfaits.' },
      { type: 'instruction', text: 'Reparentage par le thérapeute. Demander l\'autorisation d\'entrer dans l\'image et de tutoyer l\'enfant.' },
      { type: 'instruction', text: 'a) Reparentez l\'enfant : montrez-lui qu\'il a, comme tous les enfants, des besoins affectifs fondamentaux. Soutenez-le. Faites-lui exprimer ses émotions, son ressenti.' },
      { type: 'instruction', text: 'b) Conduisez un dialogue avec le parent dysfonctionnel : expliquez en quoi il a tort de traiter l\'enfant de cette manière. Expliquez les besoins affectifs fondamentaux. Ne cherchez pas à convaincre — contentez-vous de dire pourquoi il (elle) a tort.' },
      { type: 'instruction', text: 'c) Demandez à l\'enfant son ressenti.' },
      { type: 'instruction', text: 'd) Demandez à votre patient de tenir le rôle du parent dysfonctionnel qui répond à votre confrontation.' },
      { type: 'instruction', text: 'e) Demandez à l\'enfant dans l\'image comment il se sent après cette confrontation du parent.' },
      { type: 'instruction', text: 'f) Proposez-lui de s\'affirmer auprès de son parent dysfonctionnel.' },
      { type: 'note', text: 'Si le patient est hyperactivé, ramenez-le dans sa fenêtre de tolérance (relaxation, mindfulness, image du lieu sûr).' },
      { type: 'verbatim', text: '« Ouvrez les yeux. »' },
      { type: 'instruction', text: 'Feedback : D\'où êtes-vous parti ? Où êtes-vous allé ? Quels liens avec la vie actuelle ? Abordez les liens avec la vie du patient en dehors des séances en demandant au patient d\'établir lui-même ce lien.' },
      { type: 'instruction', text: 'Discutez de la conceptualisation : schémas, stratégies, modes. Établissez un diagramme de conceptualisation.' },
    ],
  },
  {
    id: 'confronter-parent-punitif',
    name: 'Confronter le Parent Punitif',
    phaseIds: ['changement'],
    targetModes: ['parent-punitif', 'parent-exigeant', 'enfant-colereux'],
    summary:
      "Exercice combinant imagerie et travail des chaises pour montrer la toxicité du mode Parent Punitif et renforcer l'Adulte Sain qui protège l'Enfant Vulnérable.",
    patientInstructions:
      'Cherchez des événements de la vie quotidienne dans lesquels vous avez été en colère contre vous-même, et choisissez-en un pour cet exercice.',
    steps: [
      { type: 'instruction', text: 'Aider le patient à reconnaître les signes du Parent Punitif (par ex. une voix en colère contre soi) et l\'élément déclencheur du Mode dans la situation explorée.' },
      { type: 'instruction', text: 'TRAVAIL D\'IMAGERIE — Le thérapeute montre le modèle d\'adulte sain au patient.' },
      { type: 'instruction', text: 'Demander au patient la permission de faire un exercice d\'imagerie. Commencer par l\'image d\'un endroit sûr.' },
      { type: 'instruction', text: 'Continuer avec la recherche en imagerie d\'une image de l\'enfance avec l\'enfant et l\'adulte dysfonctionnel.' },
      { type: 'note', text: 'Créer, si nécessaire, un mécanisme de protection dans l\'image (par ex. une paroi de verre entre l\'enfant et le parent).' },
      { type: 'instruction', text: 'Entrez dans l\'image (thérapeute = adulte sain).' },
      { type: 'instruction', text: 'a) Reparentez l\'enfant : montrez-lui ses besoins affectifs fondamentaux. Soutenez-le. Faites-lui exprimer ses émotions.' },
      { type: 'instruction', text: 'b) Conduisez un dialogue avec le parent dysfonctionnel : expliquez en quoi il a tort. Ne cherchez pas à convaincre — dites pourquoi il a tort.' },
      { type: 'instruction', text: 'c) Demandez à l\'enfant son ressenti.' },
      { type: 'instruction', text: 'd) Demandez au patient de tenir le rôle du parent dysfonctionnel qui répond à la confrontation.' },
      { type: 'instruction', text: 'e) Demandez à l\'enfant comment il se sent après la confrontation.' },
      { type: 'instruction', text: 'f) Proposez-lui de s\'affirmer auprès de son parent dysfonctionnel.' },
      { type: 'instruction', text: 'g) Faire ouvrir les yeux. Debriefing.' },
      { type: 'instruction', text: 'TRAVAIL DE CHAISES — Le thérapeute cherche à montrer la toxicité du Mode Critique/Punitif.' },
      { type: 'instruction', text: 'a) Créer un dialogue de deux chaises : le patient alterne entre Mode Enfant Vulnérable (exprime sa souffrance) et Mode Parent Critique/Punitif (qui répond).' },
      { type: 'instruction', text: 'b) Puis le Mode Adulte Sain du patient confronte le Mode Parent Punitif et affirme, pour l\'Enfant Vulnérable, ses sentiments et ses besoins. Le PP répond au Mode AS.' },
      { type: 'note', text: 'Demandez au patient s\'il se sentira en sécurité pour la suite de la journée et la nuit. Sinon, incitez-le à vous joindre par téléphone.' },
      { type: 'instruction', text: 'Demandez un feedback pour cette séance.' },
    ],
  },
  {
    id: 'activation-ressources',
    name: 'Activation de ressources',
    phaseIds: ['changement', 'diagnostic'],
    targetModes: ['protecteur-detache', 'enfant-vulnerable'],
    summary:
      "D'après Lisa Schwarz (CRM). Activation du lieu d'ancrage, de l'ancrage incarné et de l'animal d'attachement. Réduit les défenses (Protecteur Détaché) et facilite l'accès à l'Enfant Vulnérable.",
    patientInstructions:
      'Laissez vos yeux se fermer. Prenez conscience des points de votre corps au niveau desquels vous ressentez la pesanteur.',
    steps: [
      { type: 'verbatim', text: '« Laissez vos yeux se fermer. Prenez conscience des points de votre corps au niveau desquels vous ressentez la pesanteur. Prenez conscience de votre respiration ventrale et faites durer les expirations plus longtemps que les inspirations. »' },
      { type: 'instruction', text: 'LIEU D\'ANCRAGE' },
      { type: 'verbatim', text: '« Créez dans votre esprit l\'image d\'un lieu que vous aimez beaucoup, où vous vous sentez comme chez vous, et qui vous fait du bien. »' },
      { type: 'verbatim', text: '« Explorez tout ce que vous y voyez qui vous fait du bien. Explorez aussi toutes les odeurs que vous respirez dans ce lieu. Remarquez tous les sons que vous y entendez. Touchez autour de vous tous les éléments de ce lieu que vous aimez. »' },
      { type: 'verbatim', text: '« Parcourez mentalement votre corps en entier à la recherche de la zone au niveau de laquelle vous ressentez spécifiquement ce bien-être. »' },
      { type: 'instruction', text: 'POSITION OCULAIRE DU LIEU' },
      { type: 'verbatim', text: '« Les yeux fermés, déplacez lentement votre regard selon une ligne horizontale et cherchez quelle est la position de vos yeux pour laquelle vous ressentez le plus intensément cette zone de bien-être. Affinez selon l\'axe vertical. Mémorisez cette position oculaire. »' },
      { type: 'instruction', text: 'ANCRAGE CORPOREL' },
      { type: 'verbatim', text: '« Tout en gardant cette position des yeux, scannez votre corps d\'un bout à l\'autre et recherchez les points au niveau desquels vous sentez que vous êtes ancré, centré, solide et présent. »' },
      { type: 'instruction', text: 'Faire rechercher un nouveau point oculaire pour lequel ces points corporels sont ressentis de façon particulièrement nette. Mémoriser.' },
      { type: 'instruction', text: 'ANIMAL D\'ATTACHEMENT' },
      { type: 'verbatim', text: '« Faites maintenant venir près de vous dans ce lieu l\'animal que vous avez envie de voir venir à vous. (Pas un animal de compagnie actuel.) Laissez venir cet animal, regardez dans ses yeux : sentez son affection, son amour inconditionnel. »' },
      { type: 'verbatim', text: '« Il est là pour vous, rien que pour vous, sans rien attendre de vous en retour. Laissez-le mettre ses pattes contre vous, sentez la texture de sa fourrure, sentez sa chaleur, son odeur, sentez battre son cœur en mettant la main contre son cœur, sentez sa respiration. »' },
      { type: 'instruction', text: 'Explorez où dans le corps le patient sent le bien-être de cet accordage. Rechercher et mémoriser la position oculaire liée.' },
      { type: 'note', text: 'Les ressources seront réactivées chaque fois que le patient recherchera le point oculaire. Utilisable en séance et dans la vie quotidienne. L\'accordage à l\'animal apaise le système d\'attachement et réduit la force du Protecteur Détaché.' },
    ],
  },
  {
    id: 'gerer-schemas-therapeute',
    name: 'Gérer ses propres schémas (supervision)',
    phaseIds: [],
    targetModes: [],
    summary:
      "Exercice de supervision en binôme. Permet au thérapeute d'identifier ses propres schémas activés lors de séances difficiles, de les reparenter, et d'apprendre à gérer le contre-transfert schématique.",
    patientInstructions:
      'Remémorez-vous une séance difficile émotionnellement avec un patient. Cherchez à retrouver ce qui a conduit à la difficulté en séance, ainsi que les détails de l\'interaction.',
    steps: [
      { type: 'instruction', text: 'ÉTAPE A — Exploration de la séance difficile' },
      { type: 'instruction', text: 'Demander au supervisé de fermer les yeux et de créer une image d\'un moment qui lui a été pénible au cours d\'une séance avec le patient.' },
      { type: 'verbatim', text: '« Décrivez ce qu\'il se produit dans cette image. Dialoguez avec votre patient difficile aussi fidèlement qu\'il en avez le souvenir. »' },
      { type: 'verbatim', text: '« Que ressentez-vous et que pensez-vous au cours de cette séance ? Comment réagissez-vous ? Qu\'aimeriez-vous dire au patient ? Pourquoi vous sentez-vous bloqué(e) ? »' },
      { type: 'instruction', text: 'ÉTAPE B — Imagerie diagnostique du supervisé' },
      { type: 'instruction', text: 'Demandez au supervisé de chercher une image de son enfance (ou adolescence), d\'une situation pénible dans laquelle il(elle) a ressenti quelque chose de similaire.' },
      { type: 'verbatim', text: '« Quel âge avez-vous ? Que voyez-vous ? Où vous trouvez-vous ? Que se produit-il qui vous perturbe ? Que ressentez-vous ? Quelles pensées vous traversent ? Que dites-vous ou faites-vous ? Qu\'aimeriez-vous dire ou faire ? »' },
      { type: 'instruction', text: 'Besoins affectifs fondamentaux et reparentage de l\'Enfant Vulnérable du supervisé. Demandez l\'autorisation d\'entrer dans l\'image comme Adulte Sain. Reparentez l\'enfant (sécurité, attention, valorisation, affection).' },
      { type: 'instruction', text: 'ÉTAPE C — Aide au thérapeute dans sa séance difficile' },
      { type: 'instruction', text: 'Demandez au supervisé de revenir à l\'image de la séance avec son patient difficile. Entrez dans cette image en tant qu\'Adulte Sain qui s\'occupe du supervisé Enfant Vulnérable confronté à son patient difficile.' },
      { type: 'instruction', text: 'En tant qu\'Adulte Sain, entrez en empathie avec le supervisé, soutenez-le, protégez-le. Puis répondez au patient difficile de façon constructive. Si le supervisé se sent compétent, laissez-le diriger le dialogue.' },
      { type: 'instruction', text: 'Faire ouvrir les yeux. Discutez des schémas et stratégies activés lors de la séance et dans l\'image d\'enfance.' },
      { type: 'instruction', text: 'Abordez la gestion de futures séances avec des patients qui déclencheraient des réactions similaires.' },
      { type: 'instruction', text: 'Demandez au supervisé son feedback sur l\'intervention du superviseur.' },
    ],
  },
];
