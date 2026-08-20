import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { images } from '@/assets/images';
import { Game } from '@/game/game';

import { Tile } from '../tile';
import { Board } from './board';

const sizes: Game.BoardSize[] = [3, 4, 5, 6];

const meta = {
  title: 'Board',
  component: Board,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tiles: {
      control: { type: 'select' },
      options: sizes.map((s) => `${s}x${s}`),
      mapping: Object.fromEntries(
        sizes.map((s) => [`${s}x${s}`, Game.createSequence(s)]),
      ),
    },
    gameStatus: {
      control: { type: 'select' },
      options: Object.values(Game.Status),
    },
    image: {
      control: { type: 'select' },
      options: Object.values(images).map((i) => i.image),
    },
  },
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Controlled by `argTypes`.
    tiles: '3x3' as unknown as Game.Board,
    gameStatus: Game.Status.Idle,
    isKeyboardDisabled: false,
    isSoundDisabled: false,
    isConfettiDisabled: false,
    isNumbersVisible: false,
    isTileGapVisible: true,
    isImagePreviewActive: false,
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
