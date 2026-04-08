import type { Schema } from '@/types';

export const schemas: Schema[] = [
  // ========== DOMAINE I — Séparation & Rejet ==========
  {
    id: 'abandon-instabilite',
    code: 'S1',
    name: 'Abandon/Instabilité',
    domainId: 'separation-rejet',
    type: 'inconditionnel',
    description:
      "Sentiment que les personnes importantes sont instables, peu fiables, ou vont disparaître (émotionnellement ou physiquement). Anticipation permanente d'être quitté.",
    centralBelief: 'Les gens que j\'aime vont finir par me quitter ou disparaître.',
    modeIds: ['enfant-vulnerable', 'enfant-colereux', 'protecteur-detache'],
    copingResponses: {
      soumission: 'Choisit des partenaires non disponibles ou imprévisibles',
      evitement: "Évite toute relation intime par peur de l'abandon",
      compensation: 'Repousse les proches par possession ou contrôle excessif',
    },
    conditionalDerived: ['assujettissement'],
    disorderIds: ['borderline'],
    clinicalNotes: "Schéma conditionnel dérivé : Assujettissement (\"Si je fais tout ce qu'il veut, il restera\").",
  },
  {
    id: 'mefiance-abus',
    code: 'S2',
    name: 'Méfiance/Abus',
    domainId: 'separation-rejet',
    type: 'inconditionnel',
    description:
      "Attente que les autres vont blesser, humilier, tromper, mentir ou manipuler intentionnellement. Sentiment d'être systématiquement la victime.",
    centralBelief: 'Les autres me feront du mal si je leur fais confiance.',
    modeIds: ['enfant-vulnerable', 'enfant-colereux', 'protecteur-detache'],
    copingResponses: {
      soumission: 'Choisit des proches non dignes de confiance ; hypervigilant et méfiant',
      evitement: 'Évite les implications proches ; ne se confie pas, ne se révèle pas',
      compensation: "Maltraite ou exploite les autres (\"Je les aurai avant qu'ils ne m'aient\")",
    },
    disorderIds: ['paranoiaque'],
  },
  {
    id: 'manque-affectif',
    code: 'S3',
    name: 'Manque Affectif',
    domainId: 'separation-rejet',
    type: 'inconditionnel',
    description:
      "Attente que ses besoins affectifs (soin, empathie, protection, affection) ne seront jamais satisfaits par les autres. Sentiment de vide affectif chronique.",
    centralBelief: "Personne ne sera jamais là pour me donner la chaleur et l'attention dont j'ai besoin.",
    modeIds: ['enfant-vulnerable', 'enfant-colereux'],
    copingResponses: {
      soumission: "Choisit des partenaires froids et détachés ; décourage l'affection",
      evitement: "Se tient en retrait, s'isole, évite les relations intimes",
      compensation: "Demande de façon non réaliste aux autres de combler ses besoins (parfois jusqu'au comportement histrionique)",
    },
    conditionalDerived: ['recherche-approbation'],
    clinicalNotes: "Schéma conditionnel dérivé : Recherche d'Approbation (\"Si les autres m'admirent, je me sentirai comblé\").",
  },
  {
    id: 'imperfection-honte',
    code: 'S4',
    name: 'Imperfection/Honte',
    domainId: 'separation-rejet',
    type: 'inconditionnel',
    description:
      'Se sentir imparfait, mauvais, inférieur, non désiré. Hypersensibilité à la critique et au rejet. Honte profonde et chronique de soi-même.',
    centralBelief: 'Je suis fondamentalement défectueux. Si les autres me connaissaient vraiment, ils me rejetteraient.',
    modeIds: ['enfant-vulnerable', 'parent-punitif'],
    copingResponses: {
      soumission: "Choisit des proches qui le critiquent ; s'autodévalue",
      evitement: "Évite de partager pensées/sentiments \"honteux\" ; évite l'intimité",
      compensation: 'Se comporte de façon critique et supérieure envers les autres ; cherche à paraître parfait',
    },
    conditionalDerived: ['abnegation', 'ideaux-exigeants'],
    disorderIds: ['narcissique'],
    clinicalNotes: "Abnégation (\"Si je comble l'autre, il m'acceptera malgré mes défauts\") et Idéaux Exigeants (\"Si je suis parfait, je vaudrai la peine d'être aimé\").",
  },
  {
    id: 'isolement-social',
    code: 'S5',
    name: 'Isolement Social',
    domainId: 'separation-rejet',
    type: 'inconditionnel',
    description:
      "Sentiment d'être différent des autres, aliéné, de ne pas appartenir à un groupe. Impression d'être fondamentalement à part.",
    centralBelief: "Je suis fondamentalement différent des autres et ne m'intègrerai jamais nulle part.",
    modeIds: ['enfant-vulnerable'],
    copingResponses: {
      soumission: 'En groupe, se tient en périphérie, ne participe pas pleinement',
      evitement: 'Évite de socialiser ; passe le temps seul',
      compensation: "Se déguise derrière un masque pour participer à un groupe, tout en se sentant intérieurement différent",
    },
  },

  // ========== DOMAINE II — Manque d'Autonomie & de Performance ==========
  {
    id: 'dependance-incompetence',
    code: 'S6',
    name: 'Dépendance/Incompétence',
    domainId: 'manque-autonomie',
    type: 'inconditionnel',
    description:
      "Incapacité perçue à gérer ses responsabilités quotidiennes sans aide excessive. Sentiment d'être fondamentalement incompétent face aux défis de la vie.",
    centralBelief: 'Je suis incapable de me débrouiller seul.',
    modeIds: ['enfant-vulnerable', 'soumis-obeissant'],
    copingResponses: {
      soumission: "Demande beaucoup trop d'aide ; fait vérifier ses décisions ; choisit des partenaires qui font tout à sa place",
      evitement: "Procrastine devant les décisions ; évite d'agir de façon indépendante",
      compensation: "Se montre excessivement confiant en soi, même quand il serait sain de demander de l'aide",
    },
    disorderIds: ['dependante'],
  },
  {
    id: 'peur-danger-maladie',
    code: 'S7',
    name: 'Peur du Danger ou de la Maladie',
    domainId: 'manque-autonomie',
    type: 'inconditionnel',
    description:
      "Peur exagérée d'une catastrophe imminente (médicale, émotionnelle, naturelle) que l'on croit impossible à prévenir.",
    centralBelief: 'Une catastrophe peut survenir à tout moment et je ne pourrai pas y faire face.',
    modeIds: ['enfant-vulnerable'],
    copingResponses: {
      soumission: 'Se fait continuellement du souci ; demande répétitivement de la réassurance',
      evitement: 'Évite de façon phobique les situations perçues comme dangereuses',
      compensation: 'Utilise la pensée magique ou des rituels compulsifs',
    },
  },
  {
    id: 'fusionnement-personnalite-atrophiee',
    code: 'S8',
    name: 'Fusionnement/Personnalité Atrophiée',
    domainId: 'manque-autonomie',
    type: 'inconditionnel',
    description:
      "Implication émotionnelle et proximité excessive avec une personne de référence, au détriment de l'individuation et du développement d'une identité propre.",
    centralBelief: 'Je ne peux pas exister ou être heureux sans la présence constante de cette personne.',
    modeIds: ['enfant-vulnerable', 'soumis-obeissant'],
    copingResponses: {
      soumission: "Imite le comportement de ses proches ; ne développe pas d'identité propre",
      evitement: "Évite les relations qui favorisent l'individualité plutôt que la fusion",
      compensation: "Se comporte de façon autonome à l'excès",
    },
  },
  {
    id: 'echec',
    code: 'S9',
    name: 'Échec',
    domainId: 'manque-autonomie',
    type: 'inconditionnel',
    description:
      "Croyance d'avoir échoué, d'être fondamentalement inadéquat et voué à l'échec dans ses activités de performance (travail, école, sport).",
    centralBelief: 'Je suis fondamentalement incapable de réussir aussi bien que les autres.',
    modeIds: ['enfant-vulnerable'],
    copingResponses: {
      soumission: 'Travaille en dessous de son niveau de capacité ; sous-estime ses réussites',
      evitement: 'Évite totalement les tâches nouvelles ; procrastine ; évite les objectifs professionnels',
      compensation: 'Dévalorise les réussites des autres ; se veut perfectionniste pour compenser',
    },
  },

  // ========== DOMAINE III — Manque de Limites ==========
  {
    id: 'droits-exageres',
    code: 'S10',
    name: 'Droits Personnels Exagérés/Grandeur',
    domainId: 'manque-limites',
    type: 'inconditionnel',
    description:
      "Sentiment d'être supérieur aux autres, d'avoir des droits spéciaux. Peu de limites dans la gratification de ses désirs immédiats. Peu de réciprocité.",
    centralBelief: "Je suis spécial. Les règles normales ne s'appliquent pas à moi.",
    modeIds: ['auto-magnificateur'],
    copingResponses: {
      soumission: "Relations interpersonnelles non réciproques ; égoïste ; ne tient pas compte des sentiments des autres",
      evitement: "Évite les situations où il ne peut pas exceller ou se mettre en avant",
      compensation: "Fait des dons disproportionnés pour pallier son égoïsme",
    },
    disorderIds: ['narcissique'],
  },
  {
    id: 'controle-soi-insuffisant',
    code: 'S11',
    name: 'Contrôle de Soi/Autodiscipline Insuffisants',
    domainId: 'manque-limites',
    type: 'inconditionnel',
    description:
      "Incapacité à tolérer la frustration et à exercer un autocontrôle suffisant sur ses émotions et ses impulsions. Recherche du plaisir immédiat.",
    centralBelief: 'Je ne peux pas me contrôler ou tolérer la frustration.',
    modeIds: ['enfant-impulsif'],
    copingResponses: {
      soumission: 'Accomplit de façon négligée les tâches ennuyeuses ou routinières',
      evitement: "Évite les efforts soutenus ; abandonne dès que c'est difficile",
      compensation: 'Comportements dangereux et insouciants',
    },
    disorderIds: ['borderline'],
  },

  // ========== DOMAINE IV — Orientation vers les Autres ==========
  {
    id: 'assujettissement',
    code: 'S12',
    name: 'Assujettissement',
    domainId: 'orientation-autres',
    type: 'conditionnel',
    derivesFrom: 'abandon-instabilite',
    derivationBelief: "Si je fais tout ce que l'autre désire sans jamais me mettre en colère, il restera avec moi.",
    description:
      "Cession excessive du contrôle aux autres, par peur des conséquences (colère, punition, abandon). Suppression de ses propres désirs, opinions et émotions.",
    centralBelief: "Si je fais tout ce que l'autre désire sans jamais me mettre en colère, il restera avec moi.",
    modeIds: ['soumis-obeissant'],
    copingResponses: {
      soumission: "Laisse les autres décider ; réprime sa colère et ses désirs ; autorise l'abus",
      evitement: "Évite les situations où il doit exprimer une préférence ou un désaccord",
      compensation: 'Accès de rage explosifs ou comportements passifs-agressifs',
    },
  },
  {
    id: 'abnegation',
    code: 'S13',
    name: 'Abnégation',
    domainId: 'orientation-autres',
    type: 'conditionnel',
    derivesFrom: 'imperfection-honte',
    derivationBelief: "Si je comble tous les besoins de l'autre et ignore les miens, il m'acceptera malgré mes défauts.",
    description:
      "Satisfaction volontaire des besoins des autres au détriment de ses propres besoins affectifs. Désir d'éviter de causer de la douleur aux autres.",
    centralBelief: "Si je comble tous les besoins de l'autre et ignore les miens, il m'acceptera malgré mes défauts.",
    modeIds: ['soumis-obeissant'],
    copingResponses: {
      soumission: 'Met les besoins des autres avant les siens systématiquement ; ne demande rien pour soi',
      evitement: "Évite les situations où il serait au centre de l'attention",
      compensation: 'Accumule de la colère et des ressentiments qui explosent parfois',
    },
    clinicalNotes: "Diagnostic différentiel : l'abnégation vient de la compassion, l'assujettissement vient de la peur. La colère accumulée et les symptômes psychosomatiques signent un schéma d'abnégation pathologique.",
  },
  {
    id: 'recherche-approbation',
    code: 'S14',
    name: "Recherche d'Approbation et de Reconnaissance",
    domainId: 'orientation-autres',
    type: 'conditionnel',
    derivesFrom: 'manque-affectif',
    derivationBelief: "J'ai de la valeur si et seulement si les autres m'approuvent ou m'admirent.",
    description:
      "Importance excessive accordée à l'approbation et à la reconnaissance des autres. L'estime de soi dépend entièrement du regard d'autrui plutôt que de la valeur personnelle authentique.",
    centralBelief: "J'ai de la valeur si et seulement si les autres m'approuvent ou m'admirent.",
    modeIds: ['auto-magnificateur', 'soumis-obeissant'],
    copingResponses: {
      soumission: "Comportements accommodants pour plaire ; attache importance à l'apparence et au statut",
      evitement: 'Évite les situations où il risque la désapprobation',
      compensation: 'Vantardise, manipulation habile des conversations pour exposer ses motifs de fierté',
    },
    disorderIds: ['histrionique', 'narcissique'],
    subtypes: [
      { name: 'Approbation', description: "Veut que tout le monde l'aime, être adapté et accepté", disorderId: 'histrionique' },
      { name: 'Reconnaissance', description: 'Veut être admiré, félicité, statut', disorderId: 'narcissique' },
    ],
  },

  // ========== DOMAINE V — Survigilance & Inhibition ==========
  {
    id: 'negativite-pessimisme',
    code: 'S15',
    name: 'Négativité/Pessimisme',
    domainId: 'survigilance-inhibition',
    type: 'inconditionnel',
    description:
      "Focalisation envahissante sur les aspects négatifs de la vie (douleur, mort, perte, conflits, humiliation), tout en minimisant ou ignorant les aspects positifs.",
    centralBelief: "Les choses vont toujours finir par mal tourner. Je dois anticiper le pire.",
    modeIds: ['enfant-vulnerable', 'parent-punitif'],
    copingResponses: {
      soumission: "Se plaint ; s'attend au pire dans toutes les situations",
      evitement: "Procrastine par peur de l'échec ou des mauvaises nouvelles",
      compensation: 'Parfois déni total et optimisme forcé défensif',
    },
  },
  {
    id: 'surcontrole-emotionnel',
    code: 'S16',
    name: 'Surcontrôle Émotionnel',
    domainId: 'survigilance-inhibition',
    type: 'conditionnel',
    derivesFrom: 'punition',
    derivationBelief: "Si je n'exprime rien, je ne serai pas puni.",
    description:
      "Inhibition excessive des émotions et des impulsions spontanées. Privilégie la raison sur l'affect. Contrôle également l'entourage pour éviter les débordements émotionnels.",
    centralBelief: 'Si j\'exprime mes émotions, des conséquences négatives (honte, punition, abandon) surviendront.',
    modeIds: ['protecteur-detache', 'parent-exigeant'],
    copingResponses: {
      soumission: 'Réprime systématiquement ses émotions et impulsions',
      evitement: 'Évite les conversations intimes et vulnérables',
      compensation: 'Parfois rigidité excessive et moralisme',
    },
    disorderIds: ['obsessionnel-compulsif'],
    clinicalNotes: 'Point clinique crucial : le travail cognitif tend à RENFORCER ce schéma (trop rationnel). L\'accès nécessite des techniques émotionnelles (imagerie, Brainspotting) plutôt que la restructuration cognitive.',
  },
  {
    id: 'punition',
    code: 'S17',
    name: 'Punition',
    domainId: 'survigilance-inhibition',
    type: 'inconditionnel',
    description:
      "Croyance que soi-même et les autres méritent d'être punis sévèrement pour leurs erreurs. Grande difficulté à pardonner les faiblesses, aussi bien chez soi que chez les autres.",
    centralBelief: "Les erreurs méritent d'être sévèrement punies, sans indulgence ni pardon.",
    modeIds: ['parent-punitif'],
    copingResponses: {
      soumission: "S'autopunit sévèrement après chaque erreur",
      evitement: "Évite de se mettre dans des situations où il risque d'échouer",
      compensation: 'Punit sévèrement les autres pour leurs erreurs',
    },
    conditionalDerived: ['surcontrole-emotionnel'],
  },
  {
    id: 'ideaux-exigeants',
    code: 'S18',
    name: 'Idéaux Exigeants/Critique Excessive',
    domainId: 'survigilance-inhibition',
    type: 'conditionnel',
    derivesFrom: 'imperfection-honte',
    derivationBelief: "Si je suis parfait, alors je vaudrai la peine d'être aimé.",
    description:
      "Conviction de devoir atteindre des standards internalisés très élevés. À la différence de la Recherche d'Approbation, ces normes sont INTERNES — même si personne ne le sait, le patient persiste.",
    centralBelief: "Si je suis parfait, alors je vaudrai la peine d'être aimé.",
    modeIds: ['parent-exigeant'],
    copingResponses: {
      soumission: 'Travaille avec acharnement pour atteindre des normes inaccessibles',
      evitement: "Procrastine par peur de ne pas être à la hauteur",
      compensation: "Critique les autres qui n'atteignent pas ses standards",
    },
    disorderIds: ['obsessionnel-compulsif'],
  },
];
