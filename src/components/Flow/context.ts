import React from 'react';
import { FlowStep, FlowSubmitCallback } from './types';

export interface IFlowControl<T extends object = any> {
  steps: FlowStep<any, any, any>[];
  currentStepRef: FlowStep<any, any, any>;
  currentStep: number;
  isLastStep: boolean;
  data: any;
  validationStatus: any;

  moveForward(): void;

  moveBack(): void;

  addData(data: Partial<T>): void;

  onMoveForward(cb: FlowSubmitCallback): void;
}

export const FlowContext = React.createContext<IFlowControl>(null as any);
