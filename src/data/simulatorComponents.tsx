import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

export const SIMULATOR_COMPONENTS: Record<string, ComponentType> = {
  parabola: dynamic(() => import('@/components/simulators/ParabolaTabs')),
  recta: dynamic(() => import('@/components/simulators/LineSimulator')),
  'circunferencia-goniometrica': dynamic(() => import('@/components/simulators/UnitCircleSimulator')),
  pitagoras: dynamic(() => import('@/components/simulators/PythagorasSimulator')),
  'sistemas-ecuaciones': dynamic(() => import('@/components/simulators/SystemsSimulator')),
  'estadistica-probabilidad': dynamic(() => import('@/components/simulators/StatsProbSimulator')),
  derivadas: dynamic(() => import('@/components/simulators/DerivativeSimulator')),
  intervalos: dynamic(() => import('@/components/simulators/IntervalsSimulator')),
  cinematica: dynamic(() => import('@/components/simulators/KinematicsSimulator')),
  'fracciones-porcentajes': dynamic(() => import('@/components/simulators/FractionsSimulator')),
  'transformaciones-funciones': dynamic(() => import('@/components/simulators/FunctionTransformSimulator')),
  integrales: dynamic(() => import('@/components/simulators/RiemannSimulator')),
  'tales-semejanza': dynamic(() => import('@/components/simulators/ThalesSimulator')),
  'cuerpos-geometricos': dynamic(() => import('@/components/simulators/SolidsSimulator')),
};