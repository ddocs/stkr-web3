import React, { ReactChild } from 'react';
import intl from 'react-intl-universal';
import { TextWithRouter } from '../../components/TextWithRouter';

export function t(key: string, variables?: any): string {
  return intl.get(key, variables) || key;
}

export function tHTML(key: string, variables?: any): string {
  return intl.getHTML(key, variables) || key;
}

export function tHTMLWithRouter(key: string, variables?: any): ReactChild {
  return <TextWithRouter>{intl.getHTML(key, variables)}</TextWithRouter>;
}
