// === SchemaExplorer — Types principaux ===

export type DomainId =
  | 'separation-rejet'
  | 'manque-autonomie'
  | 'manque-limites'
  | 'orientation-autres'
  | 'survigilance-inhibition';

export type SchemaType = 'inconditionnel' | 'conditionnel';

export type CopingStyleId = 'soumission' | 'evitement' | 'compensation';

export type ModeCategory = 'enfant' | 'coping-dysfonctionnel' | 'parent-dysfonctionnel' | 'sain';

export type DisorderId =
  | 'borderline'
  | 'narcissique'
  | 'paranoiaque'
  | 'dependante'
  | 'obsessionnel-compulsif'
  | 'histrionique'
  | 'antisociale'
  | 'evitante';

export type RelationshipType =
  | 'belongs_to_domain'
  | 'activates_mode'
  | 'derives_from'
  | 'characterizes_disorder'
  | 'coping_style_maps_mode'
  | 'need_unmet_by_domain'
  | 'disorder_dominant_style'
  | 'technique_targets';

export type GraphNodeType =
  | 'schema'
  | 'mode'
  | 'domain'
  | 'coping-style'
  | 'disorder'
  | 'need'
  | 'technique';

// --- Entites principales ---

export interface Domain {
  id: DomainId;
  number: number;
  name: string;
  color: string;
  colorLight: string;
  needId: string;
  familyDescription: string;
}

export interface EmotionalNeed {
  id: string;
  number: number;
  name: string;
  domainId: DomainId;
}

export interface Schema {
  id: string;
  code: string;
  name: string;
  domainId: DomainId;
  type: SchemaType;
  derivesFrom?: string;
  derivationBelief?: string;
  description: string;
  centralBelief: string;
  modeIds: string[];
  copingResponses: {
    soumission: string;
    evitement: string;
    compensation: string;
  };
  conditionalDerived?: string[];
  disorderIds?: string[];
  clinicalNotes?: string;
  subtypes?: { name: string; description: string; disorderId?: string }[];
}

export interface SchemaMode {
  id: string;
  name: string;
  category: ModeCategory;
  copingStyleId?: CopingStyleId;
  affect: string;
  description: string;
  clinicalNotes: string;
  schemaIds: string[];
  therapeuticGoal?: string;
  recognitionCues?: { question: string; response: string }[];
}

export interface CopingStyle {
  id: CopingStyleId;
  name: string;
  metaphor: string;
  mechanism: string;
  modeId: string;
}

export interface PersonalityDisorder {
  id: DisorderId;
  name: string;
  dominantSchemaIds: string[];
  dominantCopingStyle: string;
  activeModeIds: string[];
  specificModes: DisorderSpecificMode[];
  modalDynamic: string;
  healthyAdultStatus: string;
  cascadeSequenceIds: string[];
  clinicalNotes?: string;
}

export interface DisorderSpecificMode {
  id: string;
  name: string;
  baseModeId: string;
  description: string;
  trigger?: string;
  clinicalNotes: string;
  schemaIds: string[];
}

export interface TherapeuticTechnique {
  id: string;
  name: string;
  target: string;
  mechanism: string;
  warnings?: string;
}

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  label?: string;
}

// --- Cascade ---

export interface CascadeStep {
  order: number;
  entityType: 'trigger' | 'schema' | 'mode' | 'coping-style' | 'behavior' | 'consequence';
  entityId?: string;
  label: string;
  explanation: string;
  therapeuticResponse?: string;
}

export interface CascadeSequence {
  id: string;
  name: string;
  disorderId?: DisorderId;
  triggerDescription: string;
  steps: CascadeStep[];
  isLoop: boolean;
}
