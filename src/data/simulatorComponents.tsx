import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

export const SIMULATOR_COMPONENTS: Record<string, ComponentType> = {
  parabola: dynamic(() => import('@/components/simulators/ParabolaSimulator')),
};