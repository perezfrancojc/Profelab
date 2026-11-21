import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

export const SIMULATOR_COMPONENTS: Record<string, ComponentType> = {
  parabola: dynamic(() => import('@/components/simulators/ParabolaSimulator')),
  recta: dynamic(() => import('@/components/simulators/LineSimulator')),
  'circunferencia-goniometrica': dynamic(() => import('@/components/simulators/UnitCircleSimulator')),
  pitagoras: dynamic(() => import('@/components/simulators/PythagorasSimulator')),
  'sistemas-ecuaciones': dynamic(() => import('@/components/simulators/SystemsSimulator')),
  'estadistica-probabilidad': dynamic(() => import('@/components/simulators/StatsProbSimulator')),
};