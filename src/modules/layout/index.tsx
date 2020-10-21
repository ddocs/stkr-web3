import React from 'react';
import { createWithLayout } from './utils/createWithLayout';

type LayoutCreator = <T extends object>(
  Component: React.ComponentType<T>,
) => // eslint-disable-next-line @typescript-eslint/ban-types
React.FC<T>;

export const withDefaultLayout: LayoutCreator = component =>
  createWithLayout(component, {});
