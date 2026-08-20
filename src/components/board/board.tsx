import { Picture } from '@gravity-ui/icons';
import { Chip, Link } from '@heroui/react';
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
import { useDocumentEventListener, useKey } from 'rooks';

import type { ImageAttribution } from '@/shared/types';

import { Game } from '@/game/game';
import { SoundManager } from '@/game/sound-manager';
import { usePrefersReducedMotion } from '@/shared/utils/use-prefers-reduced-motion';

import { BoardContext } from './board-context';
import { BoardCssVar } from './board-css-var';
import { KeyCode } from './key-code';

const MOVE_KEYS: KeyCode[] = [
  KeyCode.ArrowLeft,
  KeyCode.ArrowUp,
  KeyCode.ArrowRight,
  KeyCode.ArrowDown,
];

const gridMaps = {
  3: 'grid-cols-3 grid-rows-3',
  4: 'grid-cols-4 grid-rows-4',
  5: 'grid-cols-5 grid-rows-5',
  6: 'grid-cols-6 grid-rows-6',
} satisfies Record<
  Game.BoardSize,
  `grid-cols-${Game.BoardSize} grid-rows-${Game.BoardSize}`
>;

interface BoardProps extends ComponentProps<'section'> {
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
  image?: string;
  /**
   * Image attribution object.
   */
  imageAttribution?: ImageAttribution;
  /**
   * Disables key press detection.
   *
   * @default false
   */
  isKeyboardDisabled?: boolean;
  /**
   * If `true`, disables sound effects.
   *
   * @default false
   */
  isSoundDisabled?: boolean;
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
   * If `true`, a gap between tiles will be applied.
   *
   * @default true
   */
  isTileGapVisible?: boolean;
  /**
   * If `true`, will display a solved image like it's game over but without the
   * attribution.
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

export const Board = (props: BoardProps) => {
  const {
    tiles = [],
    renderTile,
    gameStatus = Game.Status.Idle,
    image,
    imageAttribution,
    isKeyboardDisabled = false,
    isSoundDisabled = false,
    isConfettiDisabled = false,
    isNumbersVisible = false,
    isTileGapVisible = true,
    isImagePreviewActive = false,
    onTileMove,
    onNewGame,
    onGamePause,
    onGameResume,
    ...rest
  } = props;

  // Derive board size from tiles so there is only one source of truth.
  const size = Math.sqrt(tiles.length);

  Game.validateBoardSize(size);

  const [soundManager] = useState(() => new SoundManager());
  const [isCursorHidden, setCursorHidden] = useState(false);

  const playSound = useEffectEvent((sound: SoundManager.Sound) => {
    if (!isSoundDisabled) {
      soundManager.play(sound);
    }
  });

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

  const hasImage = !!image;
  const isGamePlaying = gameStatus === Game.Status.Playing;
  const isGamePaused = gameStatus === Game.Status.Paused;
  const isGameOver = gameStatus === Game.Status.Over;

  useEffect(() => {
    playSound(SoundManager.Sound.Move);

    // A tile move must remove active focus from any element on
    // the page so it doesn't interfere with the gameplay.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [tiles]);

  useEffect(() => {
    if (isGamePlaying) {
      confetti.reset();
    } else if (isGameOver) {
      playSound(SoundManager.Sound.Win);
      playConfetti();
      setCursorHidden(false);
    }
  }, [isGamePlaying, isGameOver]);

  useKey(
    Object.values(KeyCode),
    (event) => {
      const code = event.code as KeyCode;
      const isMoveKey = MOVE_KEYS.includes(code);

      // Move keys must not trigger anything when game paused/over.
      if (isMoveKey && (isGamePaused || isGameOver)) return;

      // Hide cursor over the board on move key press so it doesn't distract during play.
      if (isMoveKey && !isCursorHidden) setCursorHidden(true);

      switch (code) {
        case KeyCode.ArrowLeft:
          onTileMove?.(Game.MoveDirection.Left);
          break;
        case KeyCode.ArrowUp:
          onTileMove?.(Game.MoveDirection.Up);
          break;
        case KeyCode.ArrowRight:
          onTileMove?.(Game.MoveDirection.Right);
          break;
        case KeyCode.ArrowDown:
          onTileMove?.(Game.MoveDirection.Down);
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
    { when: !isKeyboardDisabled },
  );

  // Unhide cursor once mouse moves again.
  useDocumentEventListener(
    'mousemove',
    () => isCursorHidden && setCursorHidden(false),
  );

  const styles = useMemo<CSSProperties>(
    () => ({
      [BoardCssVar.Size]: size,
      ...(hasImage && {
        [BoardCssVar.Image]: `url(${image})`,
        ...((isGameOver || isImagePreviewActive) && {
          backgroundImage: `var(${BoardCssVar.Image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }),
      }),
    }),
    [size, hasImage, image, isGameOver, isImagePreviewActive],
  );

  const contextValue = useMemo(
    () => ({
      size,
      hasImage,
      // Numbers for a non-image board are always visible.
      isNumbersVisible: hasImage ? isNumbersVisible : true,
      isCursorHidden,
    }),
    [size, hasImage, isNumbersVisible, isCursorHidden],
  );

  return (
    <section
      aria-label="Sliding puzzle board"
      {...rest}
      className={clsx(
        'relative bg-surface rounded-lg shadow-surface p-2 rounded-xl',
        rest.className,
      )}
    >
      <ul
        style={styles}
        className={clsx(`grid ${gridMaps[size]} select-none text-[0px]`, {
          'gap-2': isTileGapVisible,
          'pointer-events-none grayscale-75 transition': isGamePaused,
          'pointer-events-none': isGameOver,
          'shadow-sm rounded-lg [&>*]:opacity-0':
            hasImage && (isGameOver || isImagePreviewActive),
          '!cursor-none': isGamePlaying && isCursorHidden,
        })}
      >
        <BoardContext value={contextValue}>
          {tiles.map(renderTile)}
        </BoardContext>
      </ul>
      {hasImage && imageAttribution && isGameOver && (
        <Chip className="absolute right-4 bottom-4 bg-default-soft backdrop-blur-sm">
          <Picture width={12} />
          <Chip.Label>
            Photo by{' '}
            <Link
              href={imageAttribution.authorUrl}
              target="_blank"
              className="underline underline-offset-2"
            >
              {imageAttribution.author}
            </Link>{' '}
            on{' '}
            <Link
              href={imageAttribution.sourceUrl}
              target="_blank"
              className="underline underline-offset-2"
            >
              {imageAttribution.source}
            </Link>
          </Chip.Label>
        </Chip>
      )}
    </section>
  );
};
