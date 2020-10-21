import 'regenerator-runtime';
import React from 'react';
import { addDecorator } from '@storybook/react';

import { AppShell } from './componets/AppShell';

import '../src/common/fonts/stylesheet.css';

addDecorator((story, ctx) => (
  <AppShell>
    <style
      dangerouslySetInnerHTML={{
        __html: `
       #root {
        height: 100%;
        width: 100%;
        font-family: 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `,
      }}
    />
    <pre>{ctx.parameters.fileName}</pre>
    <hr />
    <br />
    {story()}
  </AppShell>
));
