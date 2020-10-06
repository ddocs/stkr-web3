import { FlowStep, IFlowStepDefinition } from './types';

type Missing<X extends keyof any> = {
  [k in X]: never;
};

type FlowRequirements<
  Given extends object,
  Required extends object
> = Given extends Required
  ? Required
  : Missing<Exclude<keyof Required, keyof Given>>;

/**
 * defines FlowSteps
 * @param step1
 * @param step2
 * @param step3
 */
export function defineFlow<
  FlowProps extends object,
  in1 extends object,
  out1 extends object,
  in2 extends object,
  out2 extends object,
  in3 extends object,
  out3 extends object,
  in4 extends object,
  out4 extends object,
  in5 extends object,
  out5 extends object,
  in6 extends object,
  out6 extends object,
  in7 extends object,
  out7 extends object
>(
  step1: FlowStep<FlowRequirements<{}, in1>, out1, FlowProps>,
  step2?: FlowStep<FlowRequirements<out1, in2>, out2, FlowProps>,
  step3?: FlowStep<FlowRequirements<out1 & out2, in3>, out3, FlowProps>,
  step4?: FlowStep<FlowRequirements<out1 & out2 & out3, in4>, out4, FlowProps>,
  step5?: FlowStep<
    FlowRequirements<out1 & out2 & out3 & out4, in5>,
    out5,
    FlowProps
  >,
  step6?: FlowStep<
    FlowRequirements<out1 & out2 & out3 & out4 & out5, in6>,
    out6,
    FlowProps
  >,
  step7?: FlowStep<
    FlowRequirements<out1 & out2 & out3 & out4 & out5 & out6, in7>,
    out7,
    FlowProps
  >,
): Array<FlowStep<{}, {}, FlowProps>> {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments);
}

export const defineFlowStep = <
  Tin extends object,
  Tout extends object,
  ComponentProps extends object = {}
>(
  data: IFlowStepDefinition<ComponentProps, Tout & Tin>,
): FlowStep<Tin, Tout, ComponentProps> => data as any;
