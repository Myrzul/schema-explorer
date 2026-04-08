import type { Relationship } from '@/types';
import { schemas } from './schemas';
import { modes } from './modes';
import { copingStyles } from './coping-styles';
import { disorders } from './disorders';
import { needs } from './needs';

function buildRelationships(): Relationship[] {
  const rels: Relationship[] = [];
  let counter = 0;
  const id = () => `rel-${++counter}`;

  // Schema → Domain
  for (const s of schemas) {
    rels.push({
      id: id(),
      sourceId: s.id,
      targetId: s.domainId,
      type: 'belongs_to_domain',
      label: 'appartient à',
    });
  }

  // Schema → Mode (activates)
  for (const s of schemas) {
    for (const modeId of s.modeIds) {
      rels.push({
        id: id(),
        sourceId: s.id,
        targetId: modeId,
        type: 'activates_mode',
        label: 'active',
      });
    }
  }

  // Conditional Schema → derives from Unconditional
  for (const s of schemas) {
    if (s.type === 'conditionnel' && s.derivesFrom) {
      rels.push({
        id: id(),
        sourceId: s.id,
        targetId: s.derivesFrom,
        type: 'derives_from',
        label: 'dérive de',
      });
    }
  }

  // Schema → Disorder
  for (const s of schemas) {
    if (s.disorderIds) {
      for (const dId of s.disorderIds) {
        rels.push({
          id: id(),
          sourceId: s.id,
          targetId: dId,
          type: 'characterizes_disorder',
          label: 'caractérise',
        });
      }
    }
  }

  // CopingStyle → Mode
  for (const cs of copingStyles) {
    rels.push({
      id: id(),
      sourceId: cs.id,
      targetId: cs.modeId,
      type: 'coping_style_maps_mode',
      label: 'correspond à',
    });
  }

  // Need → Domain
  for (const n of needs) {
    rels.push({
      id: id(),
      sourceId: n.id,
      targetId: n.domainId,
      type: 'need_unmet_by_domain',
      label: 'non comblé dans',
    });
  }

  // Disorder → dominant schemas (reverse: we already have schema → disorder)
  // Disorder → specific modes (linked to base modes)
  for (const d of disorders) {
    for (const sm of d.specificModes) {
      rels.push({
        id: id(),
        sourceId: d.id,
        targetId: sm.baseModeId,
        type: 'activates_mode',
        label: sm.name,
      });
    }
  }

  return rels;
}

export const relationships = buildRelationships();
