'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { domainColors, modeCategoryColors, nodeTypeColors } from '@/lib/colors';
import { domains } from '@/data';
import type { Node } from '@xyflow/react';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SidebarProps {
  node: Node | null;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </h4>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function Badge({
  label,
  bg,
  border,
  text,
}: {
  label: string;
  bg: string;
  border: string;
  text: string;
}) {
  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 text-[11px] font-medium border mr-1 mb-1"
      style={{ backgroundColor: bg, borderColor: border, color: text }}
    >
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Domain helpers
// ---------------------------------------------------------------------------

function domainLabel(domainId: string): string {
  return domains.find((d) => d.id === domainId)?.name ?? domainId;
}

function domainBadge(domainId: string) {
  const d = domains.find((dd) => dd.id === domainId);
  if (!d) return <Badge label={domainId} bg="#F3F4F6" border="#D1D5DB" text="#374151" />;
  const c = domainColors[d.id];
  return <Badge label={d.name} bg={c.bg} border={c.border} text={c.text} />;
}

// ---------------------------------------------------------------------------
// Renderers per node type
// ---------------------------------------------------------------------------

function SchemaContent({ data }: { data: Record<string, any> }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono font-bold text-gray-500">{data.code}</span>
        {domainBadge(data.domainId)}
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium border ${
            data.type === 'conditionnel'
              ? 'border-dashed border-gray-400 text-gray-500'
              : 'border-solid border-gray-600 text-gray-700'
          }`}
        >
          {data.type === 'conditionnel' ? 'Conditionnel' : 'Inconditionnel'}
        </span>
      </div>

      <Section title="Croyance centrale">
        <p className="italic">&laquo; {data.centralBelief} &raquo;</p>
      </Section>

      {data.description && (
        <Section title="Description">
          <p>{data.description}</p>
        </Section>
      )}

      {data.copingResponses && (
        <Section title="Reponses de coping">
          <table className="w-full text-xs border border-gray-200 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-2 py-1 font-semibold text-gray-500 border-b">
                  Soumission
                </th>
                <th className="text-left px-2 py-1 font-semibold text-gray-500 border-b">
                  Evitement
                </th>
                <th className="text-left px-2 py-1 font-semibold text-gray-500 border-b">
                  Compensation
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1.5 align-top border-r border-gray-100">
                  {data.copingResponses.soumission}
                </td>
                <td className="px-2 py-1.5 align-top border-r border-gray-100">
                  {data.copingResponses.evitement}
                </td>
                <td className="px-2 py-1.5 align-top">
                  {data.copingResponses.compensation}
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
      )}

      {data.modeIds && data.modeIds.length > 0 && (
        <Section title="Modes associes">
          <div className="flex flex-wrap gap-1">
            {(data.modeIds as string[]).map((id) => (
              <span
                key={id}
                className="rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[11px] px-2 py-0.5"
              >
                {id}
              </span>
            ))}
          </div>
        </Section>
      )}

      {data.disorderIds && data.disorderIds.length > 0 && (
        <Section title="Troubles associes">
          <div className="flex flex-wrap gap-1">
            {(data.disorderIds as string[]).map((id) => (
              <span
                key={id}
                className="rounded-full bg-gray-100 border border-gray-300 text-gray-600 text-[11px] px-2 py-0.5"
              >
                {id}
              </span>
            ))}
          </div>
        </Section>
      )}

      {data.clinicalNotes && (
        <Section title="Notes cliniques">
          <p className="text-gray-600 italic text-xs">{data.clinicalNotes}</p>
        </Section>
      )}
    </div>
  );
}

function ModeContent({ data }: { data: Record<string, any> }) {
  const catColors = modeCategoryColors[data.category as keyof typeof modeCategoryColors];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {catColors && (
          <Badge
            label={data.category}
            bg={catColors.bg}
            border={catColors.border}
            text={catColors.text}
          />
        )}
      </div>

      {data.affect && (
        <Section title="Affect dominant">
          <p>{data.affect}</p>
        </Section>
      )}

      {data.description && (
        <Section title="Description">
          <p>{data.description}</p>
        </Section>
      )}

      {data.clinicalNotes && (
        <Section title="Notes cliniques">
          <p className="text-gray-600 italic text-xs">{data.clinicalNotes}</p>
        </Section>
      )}

      {data.therapeuticGoal && (
        <Section title="Objectif therapeutique">
          <p>{data.therapeuticGoal}</p>
        </Section>
      )}

      {data.recognitionCues && data.recognitionCues.length > 0 && (
        <Section title="Indices de reconnaissance">
          <ul className="space-y-1">
            {(data.recognitionCues as { question: string; response: string }[]).map(
              (cue, i) => (
                <li key={i} className="text-xs">
                  <span className="font-medium text-gray-600">Q :</span> {cue.question}
                  <br />
                  <span className="font-medium text-gray-600">R :</span> {cue.response}
                </li>
              ),
            )}
          </ul>
        </Section>
      )}
    </div>
  );
}

function DomainContent({ data }: { data: Record<string, any> }) {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
  const roman = romanNumerals[(data.number ?? 1) - 1] ?? String(data.number);
  return (
    <div className="space-y-4">
      <div className="text-lg font-bold text-gray-700">
        {roman}. {data.name}
      </div>

      {data.familyDescription && (
        <Section title="Profil familial typique">
          <p>{data.familyDescription}</p>
        </Section>
      )}
    </div>
  );
}

function CopingStyleContent({ data }: { data: Record<string, any> }) {
  const c = nodeTypeColors['coping-style'];
  return (
    <div className="space-y-4">
      <Badge label={data.name} bg={c.bg} border={c.border} text={c.text} />

      {data.metaphor && (
        <Section title="Metaphore">
          <p className="italic">{data.metaphor}</p>
        </Section>
      )}

      {data.mechanism && (
        <Section title="Mecanisme">
          <p>{data.mechanism}</p>
        </Section>
      )}
    </div>
  );
}

function DisorderContent({ data }: { data: Record<string, any> }) {
  return (
    <div className="space-y-4">
      {data.dominantSchemaIds && data.dominantSchemaIds.length > 0 && (
        <Section title="Schemas dominants">
          <div className="flex flex-wrap gap-1">
            {(data.dominantSchemaIds as string[]).map((id) => (
              <span
                key={id}
                className="rounded-full bg-gray-100 border border-gray-300 text-gray-600 text-[11px] px-2 py-0.5"
              >
                {id}
              </span>
            ))}
          </div>
        </Section>
      )}

      {data.dominantCopingStyle && (
        <Section title="Style de coping dominant">
          <p>{data.dominantCopingStyle}</p>
        </Section>
      )}

      {data.modalDynamic && (
        <Section title="Dynamique modale">
          <p>{data.modalDynamic}</p>
        </Section>
      )}

      {data.specificModes && data.specificModes.length > 0 && (
        <Section title="Modes specifiques">
          <ul className="space-y-2">
            {(data.specificModes as { name: string; description: string }[]).map(
              (mode, i) => (
                <li key={i} className="text-xs">
                  <span className="font-semibold">{mode.name}</span>
                  <br />
                  <span className="text-gray-500">{mode.description}</span>
                </li>
              ),
            )}
          </ul>
        </Section>
      )}

      {data.clinicalNotes && (
        <Section title="Notes cliniques">
          <p className="text-gray-600 italic text-xs">{data.clinicalNotes}</p>
        </Section>
      )}
    </div>
  );
}

function NeedContent({ data }: { data: Record<string, any> }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-gray-400">#{data.number}</span>
        {data.domainId && domainBadge(data.domainId)}
      </div>

      <Section title="Domaine">
        <p>{domainLabel(data.domainId)}</p>
      </Section>
    </div>
  );
}

function TechniqueContent({ data }: { data: Record<string, any> }) {
  const c = nodeTypeColors.technique;
  return (
    <div className="space-y-4">
      <Badge label={data.name} bg={c.bg} border={c.border} text={c.text} />

      {data.target && (
        <Section title="Cible">
          <p>{data.target}</p>
        </Section>
      )}

      {data.mechanism && (
        <Section title="Mecanisme">
          <p>{data.mechanism}</p>
        </Section>
      )}

      {data.warnings && (
        <Section title="Precautions">
          <p className="text-amber-700 text-xs">{data.warnings}</p>
        </Section>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main render map
// ---------------------------------------------------------------------------

const CONTENT_BY_TYPE: Record<string, React.FC<{ data: Record<string, any> }>> = {
  schemaNode: SchemaContent,
  modeNode: ModeContent,
  domainNode: DomainContent,
  copingStyleNode: CopingStyleContent,
  disorderNode: DisorderContent,
  needNode: NeedContent,
  techniqueNode: TechniqueContent,
};

const TITLE_BY_TYPE: Record<string, string> = {
  schemaNode: 'Schema',
  modeNode: 'Mode',
  domainNode: 'Domaine',
  copingStyleNode: 'Style de coping',
  disorderNode: 'Trouble de la personnalite',
  needNode: 'Besoin emotionnel',
  techniqueNode: 'Technique therapeutique',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Sidebar({ node, onClose }: SidebarProps) {
  const data = (node?.data ?? {}) as Record<string, any>;
  const nodeType = (data.nodeType as string) ?? node?.type ?? '';

  const ContentComponent = CONTENT_BY_TYPE[nodeType];
  const typeLabel = TITLE_BY_TYPE[nodeType] ?? 'Element';

  return (
    <Sheet open={!!node} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-[380px] sm:max-w-[420px] p-0">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-gray-100">
          <SheetDescription className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
            {typeLabel}
          </SheetDescription>
          <SheetTitle className="text-base font-bold text-gray-800">
            {(data.name as string) ?? (data.code as string) ?? 'Sans titre'}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 h-[calc(100%-5rem)]">
          <div className="px-5 py-4">
            {ContentComponent ? (
              <ContentComponent data={data} />
            ) : (
              <p className="text-sm text-gray-400">
                Aucun detail disponible pour ce type de noeud.
              </p>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
