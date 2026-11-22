'use client';

import { useState } from 'react';
import ParabolaSimulator from './ParabolaSimulator';
import CannonSimulator from './CannonSimulator';
import { Tabs } from './shared/ui';

export default function ParabolaTabs() {
  const [mode, setMode] = useState<'plot' | 'cannon'>('plot');

  return (
    <div className="space-y-8">
      <Tabs
        value={mode}
        onChange={setMode}
        items={[
          { id: 'plot', label: 'La parábola' },
          { id: 'cannon', label: 'Aplicación: el cañón' },
        ]}
      />
      {mode === 'plot' ? <ParabolaSimulator /> : <CannonSimulator />}
    </div>
  );
}