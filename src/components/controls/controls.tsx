import type { ComponentProps } from 'react';

import {
  ChevronDown,
  ChevronUp,
  Dice3,
  SquareHashtag,
  Picture,
  Eye,
  EyeSlash,
  Plus,
  Minus,
} from '@gravity-ui/icons';
import {
  ButtonGroup,
  Button,
  type ButtonProps,
  ToggleButtonGroup,
  ToggleButton,
} from '@heroui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@/components/tooltip';
import { Game } from '@/game/game';

export const Controls = (props: Controls.Props) => {
  const {
    boardSize = Game.DEFAULT_BOARD_SIZE,
    onBoardSizeChange,
    mode = 'numbers',
    onModeChange,
    onRandomImagePress,
    onPreviousImagePress,
    onNextImagePress,
    onPreviewImagePressStart,
    onPreviewImagePressEnd,
    isPreviousImageButtonDisabled,
    isNextImageButtonDisabled,
    isPreviewImageButtonDisabled,
    isImagePreviewing = false,
    ...rest
  } = props;

  const { t } = useTranslation();

  const handleModeSelectionChange = (key: Set<string | number>) => {
    const selectedKey = Array.from(key)[0] as Controls.Mode;

    if (selectedKey !== mode) onModeChange?.(selectedKey);
  };

  const handleIncreaseBoardSize = () => {
    if (boardSize === Game.MAX_BOARD_SIZE) return;

    onBoardSizeChange?.((boardSize + 1) as Game.BoardSize);
  };

  const handleDecreaseBoardSize = () => {
    if (boardSize === Game.MIN_BOARD_SIZE) return;

    onBoardSizeChange?.((boardSize - 1) as Game.BoardSize);
  };

  return (
    <aside
      {...rest}
      className={clsx('mt-14 flex flex-col gap-4', rest.className)}
    >
      <ToggleButtonGroup
        disallowEmptySelection
        orientation="vertical"
        selectionMode="single"
        selectedKeys={[mode]}
        onSelectionChange={handleModeSelectionChange}
      >
        <Tooltip content={t('controls.numbersMode')} contentPlacement="right">
          <ToggleButton
            isIconOnly
            id="numbers"
            aria-label={t('controls.numbersMode')}
          >
            <SquareHashtag />
          </ToggleButton>
        </Tooltip>
        <Tooltip content={t('controls.imageMode')} contentPlacement="right">
          <ToggleButton
            isIconOnly
            id="image"
            aria-label={t('controls.imageMode')}
          >
            <Picture />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
      <ButtonGroup orientation="vertical">
        <Tooltip content={t('controls.largerBoard')} contentPlacement="right">
          <Button
            isIconOnly
            onPress={handleIncreaseBoardSize}
            isDisabled={boardSize === Game.MAX_BOARD_SIZE}
            aria-label={t('controls.largerBoard')}
          >
            <Plus />
          </Button>
        </Tooltip>
        <Tooltip content={t('controls.smallerBoard')} contentPlacement="right">
          <Button
            isIconOnly
            onPress={handleDecreaseBoardSize}
            isDisabled={boardSize === Game.MIN_BOARD_SIZE}
            aria-label={t('controls.smallerBoard')}
          >
            <ButtonGroup.Separator />
            <Minus />
          </Button>
        </Tooltip>
      </ButtonGroup>
      {mode === 'image' && (
        <ButtonGroup orientation="vertical">
          <Tooltip content={t('controls.randomImage')} contentPlacement="right">
            <Button
              isIconOnly
              onPress={onRandomImagePress}
              aria-label={t('controls.randomImage')}
            >
              <Dice3 />
            </Button>
          </Tooltip>
          <Tooltip
            content={t('controls.previousImage')}
            contentPlacement="right"
          >
            <Button
              isIconOnly
              onPress={onPreviousImagePress}
              isDisabled={isPreviousImageButtonDisabled}
              aria-label={t('controls.previousImage')}
            >
              <ButtonGroup.Separator />
              <ChevronUp />
            </Button>
          </Tooltip>
          <Tooltip content={t('controls.nextImage')} contentPlacement="right">
            <Button
              isIconOnly
              onPress={onNextImagePress}
              isDisabled={isNextImageButtonDisabled}
              aria-label={t('controls.nextImage')}
            >
              <ButtonGroup.Separator />
              <ChevronDown />
            </Button>
          </Tooltip>
          <Tooltip
            content={t('controls.holdToPreview')}
            contentPlacement="right"
          >
            <Button
              isIconOnly
              isDisabled={isPreviewImageButtonDisabled}
              onPressStart={onPreviewImagePressStart}
              onPressEnd={onPreviewImagePressEnd}
              aria-label={t('controls.holdToPreview')}
            >
              <ButtonGroup.Separator />
              {isImagePreviewing ? <Eye /> : <EyeSlash />}
            </Button>
          </Tooltip>
        </ButtonGroup>
      )}
    </aside>
  );
};

export namespace Controls {
  export type Mode = 'numbers' | 'image';

  export interface Props extends ComponentProps<'aside'> {
    /**
     * Current board size.
     *
     * @default Game.DEFAULT_BOARD_SIZE
     */
    boardSize?: Game.BoardSize;
    /**
     * Board size change handler.
     */
    onBoardSizeChange?: (boardSize: Game.BoardSize) => void;
    /**
     * Board mode.
     *
     * @default 'numbers'
     */
    mode?: Mode;
    /**
     * Mode change handler
     */
    onModeChange?: (mode: Mode) => void;
    /**
     * "Random image" button press handler.
     */
    onRandomImagePress?: ButtonProps['onPress'];
    /**
     * "Previous image" button press handler.
     */
    onPreviousImagePress?: ButtonProps['onPress'];
    /**
     * "Next image" button press handler.
     */
    onNextImagePress?: ButtonProps['onPress'];
    /**
     * "Preview image" button press start handler.
     */
    onPreviewImagePressStart?: ButtonProps['onPressStart'];
    /**
     * "Preview image" button press end handler.
     */
    onPreviewImagePressEnd?: ButtonProps['onPressEnd'];
    /**
     * "Previous image" button disabled state.
     */
    isPreviousImageButtonDisabled?: boolean;
    /**
     * "Next image" button disabled state.
     */
    isNextImageButtonDisabled?: boolean;
    /**
     * "Preview image" button disabled state.
     */
    isPreviewImageButtonDisabled?: boolean;
    /**
     * If image is currently being previewed.
     *
     * @default false
     */
    isImagePreviewing?: boolean;
  }
}
