import { ComponentType } from 'react';

export interface IFlowActionComponentProps {
  hasNextStep: boolean;
}

export interface IFlowStepDefinition<
  ExtraProps extends object = {},
  OutState extends object = {}
> {
  Frame?: ComponentType<ExtraProps>;
  Body: ComponentType<IFlowActionComponentProps & ExtraProps>;

  validate?(outData: OutState, props: ExtraProps): true | any;
}

export interface FlowStep<Tin, Tout, ExtraProps extends object>
  extends IFlowStepDefinition<ExtraProps> {
  // virtual fields to kick off TypeScript checks
  requirements: Tin;
  output: Tout;
  props: ExtraProps;
}

export type FlowSubmitCallback = undefined | (() => void);
