import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { images } from '@/assets/images';
import { Game } from '@/game/game';

import { Tile } from '../tile';
import { Board } from './board';

const meta = {
  title: 'Board',
  component: Board,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [3, 4, 5, 6],
    },
    gameStatus: {
      control: { type: 'select' },
      options: Object.values(Game.Status),
    },
    tiles: { table: { readonly: true } },
    image: {
      control: { type: 'select' },
      options: Object.values(images).map((i) => i.image),
    },
  },
  render: function Render(args) {
    const tiles = Game.createSequence(args.size);

    return <Board {...args} tiles={tiles} />;
  },
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 4,
    gameStatus: Game.Status.Idle,
    isKeyboardDisabled: false,
    isSoundDisabled: false,
    isConfettiDisabled: false,
    isNumbersVisible: false,
    isTileGapVisible: true,
    image: undefined,
    imageAttribution: {
      author: 'John Doe',
      authorUrl: 'https://example.com/john-doe',
      source: 'Example',
      sourceUrl: 'https://example.com',
      license: 'Free',
      licenseUrl: 'https://example.com/license',
    },
    renderTile: (tile, index) => (
      <Tile key={tile} value={tile} isSolved={tile === index + 1} />
    ),
    onTileMove: fn(),
    onNewGame: fn(),
    onGamePause: fn(),
    onGameResume: fn(),
    className: 'w-lg',
  },
};
