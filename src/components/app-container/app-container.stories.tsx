import type { Meta, StoryObj } from '@storybook/react-vite';

import { Game } from '@/game/game';

import { Board } from '../board';
import { Controls } from '../controls';
import { Footer } from '../footer';
import { Tile } from '../tile';
import { Toolbar } from '../toolbar';
import { AppContainer } from './app-container';

const meta = {
  title: 'AppContainer',
  component: AppContainer,
  parameters: {
    layout: 'centered',
  },
  render: function Render(args) {
    return (
      <AppContainer {...args}>
        <Toolbar />
        <Board
          tiles={Game.createSequence()}
          renderTile={(tile) => <Tile key={tile} value={tile} />}
        />
        <Footer />
      </AppContainer>
    );
  },
} satisfies Meta<typeof AppContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { controls: <Controls /> },
};
