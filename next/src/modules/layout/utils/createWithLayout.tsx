import React from 'react';
import { ReactNode } from 'react';

export function createWithLayout<T>(layoutProps: T = {} as T) {
  return (Layout: React.ComponentType<T & { children: ReactNode }>) => {
    return function LayoutHOC<P>(WrappedComponent: React.ComponentType<P>) {
      return function LayoutHOCInner(props: P): JSX.Element {
        return (
          <Layout {...layoutProps} children={<WrappedComponent {...props} />} />
        );
      };
    };
  };
}
