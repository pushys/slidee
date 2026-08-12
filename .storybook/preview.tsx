import type { Preview } from '@storybook/react-vite';

import '../src/index.css';

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
  ],
  argTypes: {
    className: { table: { disable: true } },
  },
};

export default preview;
