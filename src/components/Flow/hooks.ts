import { useContext } from 'react';
import { FlowContext, IFlowControl } from './context';

export const useFlowControl = <T extends object = never>() =>
  useContext<IFlowControl<T>>(FlowContext);

export const useFlowData = <T>(): T => useContext(FlowContext).data;
