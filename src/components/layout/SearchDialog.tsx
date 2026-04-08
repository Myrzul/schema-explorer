'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { search, typeLabels, type SearchResult } from '@/lib/search';
import { BookOpen, Brain, Users, Compass, Shield, Stethoscope } from 'lucide-react';

const typeIcons: Record<SearchResult['type'], React.ReactNode> = {
  schema: <BookOpen className="w-4 h-4 text-slate-400" />,
  mode: <Brain className="w-4 h-4 text-purple-400" />,
  disorder: <Users className="w-4 h-4 text-slate-400" />,
  domain: <Compass className="w-4 h-4 text-blue-400" />,
  'coping-style': <Shield className="w-4 h-4 text-orange-400" />,
  technique: <Stethoscope className="w-4 h-4 text-fuchsia-400" />,
};

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const results = search(query);

  // Group by type
  const grouped: Record<string, SearchResult[]> = {};
  for (const r of results) {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  }

  const handleSelect = useCallback(
    (result: SearchResult) => {
      setOpen(false);
      setQuery('');
      router.push(result.href);
    },
    [router],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Rechercher un schéma, mode, trouble..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        {Object.entries(grouped).map(([type, items]) => (
          <CommandGroup key={type} heading={typeLabels[type as SearchResult['type']]}>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item)}
                className="flex items-center gap-3"
              >
                {typeIcons[item.type]}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}>
      <span className="sr-only">Rechercher</span>
    </button>
  );
}
