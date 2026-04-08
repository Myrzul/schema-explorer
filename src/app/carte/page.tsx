'use client';

import '@xyflow/react/dist/style.css';
import InteractiveMap from '@/components/map/InteractiveMap';

export default function CartePage() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <InteractiveMap />
    </div>
  );
}
