import { Picture } from '@gravity-ui/icons';
import { Chip, Link } from '@heroui/react';
import NumberFlow from '@number-flow/react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import {
  useEffect,
  useState,
  useEffectEvent,
  useMemo,
  type ReactNode,
  type ComponentProps,
  type CSSProperties,
} from 'react';
import { Trans } from 'react-i18next';
import {
  useDocumentEventListener,
  useKey,
  usePrefersReducedMotion,
} from 'rooks';

import type { ImageAttribution } from '@/shared/types';

import { Game } from '@/shared/lib/game/game';

import { BoardContext } from './board-context';
import { BoardCssVar } from './board-css-var';
import { KeyCode } from './key-code';

const MOVE_KEYS: KeyCode[] = [
  KeyCode.ArrowLeft,
  KeyCode.ArrowUp,
  KeyCode.ArrowRight,
  KeyCode.ArrowDown,
];

const keyCodeMoveDirectionMap = {
  [KeyCode.ArrowLeft]: Game.MoveDirection.Left,
  [KeyCode.ArrowUp]: Game.MoveDirection.Up,
  [KeyCode.ArrowRight]: Game.MoveDirection.Right,
  [KeyCode.ArrowDown]: Game.MoveDirection.Down,
} satisfies Partial<Record<KeyCode, Game.MoveDirection>>;

const gridMaps = {
  3: 'grid-cols-3 grid-rows-3',
  4: 'grid-cols-4 grid-rows-4',
  5: 'grid-cols-5 grid-rows-5',
  6: 'grid-cols-6 grid-rows-6',
} satisfies Record<
  Game.BoardSize,
  `grid-cols-${Game.BoardSize} grid-rows-${Game.BoardSize}`
>;

export const Board = (props: Board.Props) => {
  const {
    tiles = [],
    renderTile,
    gameStatus = Game.Status.Idle,
    imageSrc,
    previewImageSrc,
    imageAttribution,
    countdown,
    isKeyboardDisabled = false,
    isConfettiDisabled = false,
    isNumbersVisible = false,
    isImagePreviewActive = false,
    onTileMove,
    onNewGame,
    onGamePause,
    onGameResume,
    ...rest
  } = props;

  // Derive board size directly from tiles so it's the only source of truth.
  const size = Math.sqrt(tiles.length);

  Game.validateBoardSize(size);

  const [isCursorHiddenState, setCursorHiddenState] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  const playConfetti = useEffectEvent(() => {
    if (!isConfettiDisabled && !prefersReducedMotion) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.65 },
        disableForReducedMotion: true,
      });
    }
  });

  const hasImage = !!imageSrc;
  const isGamePlaying = gameStatus === Game.Status.Playing;
  const isGamePaused = gameStatus === Game.Status.Paused;
  const isGameOver = gameStatus === Game.Status.Over;
  const isCursorHidden = isGamePlaying ? isCursorHiddenState : false;
  const isCountingDown = countdown !== undefined;

  useEffect(() => {
    // Tiles change must remove active focus from any element on
    // the page so it doesn't interfere with the gameplay.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [tiles]);

  useEffect(() => {
    if (isGameOver) {
      playConfetti();
    }
  }, [isGameOver]);

  useKey(
    Object.values(KeyCode),
    (event) => {
      const code = event.code as KeyCode;
      const isMoveKey = MOVE_KEYS.includes(code);

      // Move keys must not trigger anything when game paused/over.
      if (isMoveKey && (isGamePaused || isGameOver)) return;

      // Hide cursor over the board on move key press so it doesn't distract during play.
      if (isMoveKey && !isCursorHiddenState) setCursorHiddenState(true);

      switch (code) {
        case KeyCode.ArrowLeft:
        case KeyCode.ArrowUp:
        case KeyCode.ArrowRight:
        case KeyCode.ArrowDown:
          onTileMove?.(keyCodeMoveDirectionMap[code]);
          break;
        case KeyCode.Space:
          onNewGame?.();
          break;
        case KeyCode.KeyP:
          if (isGamePaused) return onGameResume?.();
          onGamePause?.();
          break;
      }
    },
    { when: !isKeyboardDisabled && !isCountingDown },
  );

  // Unhide cursor once mouse moves again.
  useDocumentEventListener('mousemove', () => {
    if (isGamePlaying && isCursorHiddenState) {
      setCursorHiddenState(false);
    }
  });

  const styles = useMemo<CSSProperties>(
    () => ({
      [BoardCssVar.Size]: size,
      ...(imageSrc && {
        [BoardCssVar.Image]: `url(${imageSrc})`,
        ...(previewImageSrc && {
          [BoardCssVar.PreviewImage]: `url(${previewImageSrc})`,
        }),
        ...((isGameOver || isImagePreviewActive) && {
          backgroundImage: `var(${BoardCssVar.Image}), var(${BoardCssVar.PreviewImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }),
      }),
    }),
    [size, imageSrc, previewImageSrc, isGameOver, isImagePreviewActive],
  );

  const contextValue = useMemo(
    () => ({
      size,
      gameStatus,
      hasImage,
      // Numbers for a non-image board are always visible.
      isNumbersVisible: hasImage ? isNumbersVisible : true,
      isCursorHidden,
    }),
    [gameStatus, size, hasImage, isNumbersVisible, isCursorHidden],
  );

  return (
    <section
      {...rest}
      className={clsx(
        'relative rounded-xl bg-surface p-2 shadow-surface transition-[width]',
        // Careful changing these values because they are calculated with
        // non-fractional tile widths in mind applicable for all board sizes.
        //
        // We must have two sets of sizes both for numbers and image modes because
        // the former has a gap (for a better visual separation of tiles) and it's
        // not possible to have non-fractional widths while using same ones for
        // both modes.
        { 'w-79 sm:w-94 md:w-109 lg:w-124': hasImage },
        { 'w-77 sm:w-92 md:w-107 lg:w-122': !hasImage },
        rest.className,
      )}
    >
      <ul
        style={styles}
        className={clsx(`grid ${gridMaps[size]} text-[0px] select-none`, {
          'gap-2': !hasImage,
          'pointer-events-none grayscale-75 transition': isGamePaused,
          'pointer-events-none': isGameOver,
          'rounded-lg shadow-sm *:opacity-0':
            hasImage && (isGameOver || isImagePreviewActive),
          'cursor-none': isCursorHidden,
        })}
      >
        <BoardContext value={contextValue}>
          {tiles.map(renderTile)}
        </BoardContext>
      </ul>
      {hasImage && imageAttribution && isGameOver && (
        <Chip className="absolute right-4 bottom-4 animate-fade-in bg-default-soft backdrop-blur-sm">
          <Picture width={12} />
          <Chip.Label>
            <Trans
              i18nKey="board.imageAttribution"
              components={{
                authorLink: (
                  <Link
                    href={imageAttribution.authorUrl}
                    target="_blank"
                    className="underline underline-offset-2"
                  />
                ),
                sourceLink: (
                  <Link
                    href={imageAttribution.sourceUrl}
                    target="_blank"
                    className="underline underline-offset-2"
                  />
                ),
              }}
              values={{
                author: imageAttribution.author,
                source: imageAttribution.source,
              }}
            />
          </Chip.Label>
        </Chip>
      )}
      <div
        className={clsx(
          'pointer-events-none absolute inset-2 flex rounded-lg backdrop-blur-xl transition-opacity',
          { 'opacity-0': !isCountingDown },
        )}
      >
        <span className="m-auto text-9xl font-bold text-shadow-lg">
          {isCountingDown && (
            <NumberFlow value={countdown} spinTiming={{ duration: 200 }} />
          )}
        </span>
      </div>
    </section>
  );
};

export namespace Board {
  export interface Props extends ComponentProps<'section'> {
    /**
     * List of tiles.
     *
     * @default [ ]
     */
    tiles?: Game.Board;
    /**
     * Single tile renderer.
     */
    renderTile: (tile: number, index: number) => ReactNode;
    /**
     * Current game status.
     *
     * @default Game.Status.Idle
     */
    gameStatus?: Game.Status;
    /**
     * Puzzle image source.
     */
    imageSrc?: string;
    /**
     * Puzzle preview image source.
     */
    previewImageSrc?: string;
    /**
     * Image attribution object.
     */
    imageAttribution?: ImageAttribution;
    /**
     * If provided, an overlay with the number will be displayed over the board.
     */
    countdown?: number;
    /**
     * Disables key press detection.
     *
     * @default false
     */
    isKeyboardDisabled?: boolean;
    /**
     * If `true`, the confetti effect won't triggered once the game is over.
     *
     * @default false
     */
    isConfettiDisabled?: boolean;
    /**
     * If `true`, when the board has an image the tiles will have numbers
     * displayed over them.
     *
     * @default false
     */
    isNumbersVisible?: boolean;
    /**
     * If `true`, will display a solved image like it's game over but without
     * the attribution.
     *
     * @default false
     */
    isImagePreviewActive?: boolean;
    /**
     * Tile move event handler.
     */
    onTileMove?: (direction: Game.MoveDirection) => void;
    /**
     * New game event handler.
     */
    onNewGame?: () => void;
    /**
     * Game pause event handler.
     */
    onGamePause?: () => void;
    /**
     * Game resume event handler.
     */
    onGameResume?: () => void;
  }
}
