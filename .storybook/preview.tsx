/// <reference types="vite/client" />

import type { Preview } from '@storybook/react-vite';

import { Spinner } from '@heroui/react';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import '../src/index.css';
import i18n from '../src/app/i18n';

import '@fontsource/inter';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      document.documentElement.setAttribute('class', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('bg-background', 'text-foreground');
      return <Story />;
    },
    (Story) => (
      <Suspense fallback={<Spinner />}>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </Suspense>
    ),
  ],
  argTypes: {
    className: { table: { disable: true } },
  },
};

export default preview;
