import { Button, type ButtonProps } from '@heroui/react';
import clsx from 'clsx';
import { type ComponentProps, type CSSProperties, useMemo } from 'react';

import { useBoardContext } from '@/components/board/board-context';
import { BoardCssVar } from '@/components/board/board-css-var';
import { Game } from '@/game/game';

import { TileCssVar } from './tile-css-var';

const buttonWithImageStyles = {
  backgroundImage: `var(${BoardCssVar.Image})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `calc(var(${BoardCssVar.Size}) * 100%)`,
  backgroundPosition: `calc(var(${TileCssVar.Column}) * 100% / (var(${BoardCssVar.Size}) - 1)) calc(var(${TileCssVar.Row}) * 100% / (var(${BoardCssVar.Size}) - 1))`,
} satisfies CSSProperties;

interface TileProps extends ComponentProps<'li'> {
  /**
   * Tile value.
   */
  value: number;
  /**
   * If `true`, special styles are applied to the tile.
   *
   * @default false
   */
  isSolved?: boolean;
  /**
   * If `true`, the tile will be an interactive button.
   *
   * @default false
   */
  isPressable?: boolean;
  /**
   * If `true`, view transitions are disable for the tile.
   *
   * @default false
   */
  isViewTransitionDisabled?: boolean;
  /**
   * Inner button press handler.
   */
  onPress?: ButtonProps['onPress'];
}

export const Tile = (props: TileProps) => {
  const {
    value,
    isSolved: isSolvedProp = false,
    isPressable = false,
    isViewTransitionDisabled = false,
    onPress,
    ...rest
  } = props;

  const { gameStatus, size, hasImage, isNumbersVisible, isCursorHidden } =
    useBoardContext();

  const index = value - 1;

  const isBlank = value === Game.BLANK;
  const isSolved = isSolvedProp || isBlank;
  const isGameOver = gameStatus === Game.Status.Over;

  const styles = useMemo<CSSProperties>(
    () => ({
      [TileCssVar.Row]: Math.floor(index / size),
      [TileCssVar.Column]: index % size,
      ...(!isViewTransitionDisabled && {
        viewTransitionName: `tile-${value}`,
        viewTransitionClass: 'tile',
      }),
      ...rest.style,
    }),
    [value, index, size, isViewTransitionDisabled, rest.style],
  );

  return (
    <li
      {...rest}
      className={clsx('aspect-square', rest.className)}
      style={styles}
    >
      <Button
        variant={isSolved && !hasImage ? 'primary' : 'tertiary'}
        onPress={onPress}
        excludeFromTabOrder={!isPressable}
        className={clsx('rounded-lg shadow-sm w-full h-full', {
          '@container': isNumbersVisible,
          'bg-emerald-700 hover:bg-emerald-600': isSolved && !hasImage,
          'pointer-events-none': !isPressable || isBlank,
          'cursor-none': isPressable && isCursorHidden,
          'opacity-0': isBlank && !isGameOver,
        })}
        style={hasImage ? buttonWithImageStyles : undefined}
        {...(!isNumbersVisible && { ['aria-label']: String(value) })}
      >
        {isNumbersVisible && (
          <span
            className={clsx(
              'font-bold text-[clamp(var(--text-3xl),40cqw,var(--text-4xl))]',
              { 'text-shadow-lg': hasImage, 'text-shadow-sm': !hasImage },
            )}
          >
            {isBlank ? size * size : value}
          </span>
        )}
      </Button>
    </li>
  );
};
