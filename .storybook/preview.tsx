import type { Preview } from '@storybook/react';
import React from 'react';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#222222',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    textColor: '#FFFFFF',
    options: {
      storySort: {
        order: ['Logo', 'Atoms', 'Molecules', '*'],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='App font-sans py-4' style={{ minHeight: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
