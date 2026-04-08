import type { DomainId, ModeCategory, GraphNodeType } from '@/types';

export const domainColors: Record<DomainId, { bg: string; bgLight: string; border: string; text: string }> = {
  'separation-rejet': {
    bg: '#FECACA',
    bgLight: '#FEF2F2',
    border: '#F87171',
    text: '#991B1B',
  },
  'manque-autonomie': {
    bg: '#FED7AA',
    bgLight: '#FFF7ED',
    border: '#FB923C',
    text: '#9A3412',
  },
  'manque-limites': {
    bg: '#FEF08A',
    bgLight: '#FEFCE8',
    border: '#FACC15',
    text: '#854D0E',
  },
  'orientation-autres': {
    bg: '#BBF7D0',
    bgLight: '#F0FDF4',
    border: '#4ADE80',
    text: '#166534',
  },
  'survigilance-inhibition': {
    bg: '#BFDBFE',
    bgLight: '#EFF6FF',
    border: '#60A5FA',
    text: '#1E40AF',
  },
};

export const modeCategoryColors: Record<ModeCategory, { bg: string; border: string; text: string }> = {
  enfant: {
    bg: '#DBEAFE',
    border: '#60A5FA',
    text: '#1E40AF',
  },
  'coping-dysfonctionnel': {
    bg: '#E9D5FF',
    border: '#A78BFA',
    text: '#5B21B6',
  },
  'parent-dysfonctionnel': {
    bg: '#FECACA',
    border: '#F87171',
    text: '#991B1B',
  },
  sain: {
    bg: '#D1FAE5',
    border: '#34D399',
    text: '#065F46',
  },
};

export const nodeTypeColors: Record<GraphNodeType, { bg: string; border: string; text: string }> = {
  schema: { bg: '#F3F4F6', border: '#9CA3AF', text: '#1F2937' },
  mode: { bg: '#EDE9FE', border: '#8B5CF6', text: '#4C1D95' },
  domain: { bg: '#F9FAFB', border: '#D1D5DB', text: '#374151' },
  'coping-style': { bg: '#FFF7ED', border: '#F97316', text: '#9A3412' },
  disorder: { bg: '#F3F4F6', border: '#6B7280', text: '#1F2937' },
  need: { bg: '#ECFDF5', border: '#10B981', text: '#065F46' },
  technique: { bg: '#FDF4FF', border: '#D946EF', text: '#86198F' },
};
