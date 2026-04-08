import Fuse from 'fuse.js';
import { schemas, modes, disorders, domains, copingStyles, techniques } from '@/data';

export interface SearchResult {
  id: string;
  type: 'schema' | 'mode' | 'disorder' | 'domain' | 'coping-style' | 'technique';
  name: string;
  subtitle: string;
  href: string;
}

function buildSearchItems(): SearchResult[] {
  const items: SearchResult[] = [];

  for (const s of schemas) {
    items.push({
      id: s.id,
      type: 'schema',
      name: `${s.code} — ${s.name}`,
      subtitle: s.centralBelief,
      href: `/fiches?tab=schemas&highlight=${s.id}`,
    });
  }

  for (const m of modes) {
    items.push({
      id: m.id,
      type: 'mode',
      name: m.name,
      subtitle: m.affect,
      href: `/fiches?tab=modes&highlight=${m.id}`,
    });
  }

  for (const d of disorders) {
    items.push({
      id: d.id,
      type: 'disorder',
      name: d.name,
      subtitle: d.modalDynamic,
      href: `/fiches?tab=troubles&highlight=${d.id}`,
    });
  }

  for (const d of domains) {
    items.push({
      id: d.id,
      type: 'domain',
      name: `Domaine ${d.number} — ${d.name}`,
      subtitle: d.familyDescription,
      href: `/carte`,
    });
  }

  for (const c of copingStyles) {
    items.push({
      id: c.id,
      type: 'coping-style',
      name: c.name,
      subtitle: `${c.metaphor} — ${c.mechanism}`,
      href: `/carte`,
    });
  }

  for (const t of techniques) {
    items.push({
      id: t.id,
      type: 'technique',
      name: t.name,
      subtitle: t.target,
      href: `/fiches?tab=techniques&highlight=${t.id}`,
    });
  }

  return items;
}

const searchItems = buildSearchItems();

const fuse = new Fuse(searchItems, {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'subtitle', weight: 1 },
  ],
  threshold: 0.35,
  includeScore: true,
});

export function search(query: string): SearchResult[] {
  if (!query.trim()) return searchItems.slice(0, 10);
  return fuse.search(query, { limit: 12 }).map((r) => r.item);
}

export const typeLabels: Record<SearchResult['type'], string> = {
  schema: 'Schéma',
  mode: 'Mode',
  disorder: 'Trouble TP',
  domain: 'Domaine',
  'coping-style': 'Style de coping',
  technique: 'Technique',
};
