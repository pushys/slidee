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
  Stopwatch,
} from '@gravity-ui/icons';
import {
  ButtonGroup,
  Button,
  type ButtonProps,
  ToggleButtonGroup,
  ToggleButton,
  AlertDialog,
} from '@heroui/react';
import clsx from 'clsx';
import React, { useState } from 'react';
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

  const [modeToSwitch, setModeToSwitch] = useState<Controls.Mode | null>(null);
  const [isConfirmChallengeExit, setConfirmChallengeExit] = useState(false);

  const handleModeSelectionChange = (key: Set<string | number>) => {
    const newMode = Array.from(key)[0] as Controls.Mode;

    if (newMode === mode) return;

    // Before switching from "challenge" mode user must confirm the exit.
    if (mode === 'challenge') {
      setModeToSwitch(newMode);
      setConfirmChallengeExit(true);
      return;
    }

    onModeChange?.(newMode);
  };

  const handleIncreaseBoardSize = () => {
    if (boardSize === Game.MAX_BOARD_SIZE) return;

    onBoardSizeChange?.((boardSize + 1) as Game.BoardSize);
  };

  const handleDecreaseBoardSize = () => {
    if (boardSize === Game.MIN_BOARD_SIZE) return;

    onBoardSizeChange?.((boardSize - 1) as Game.BoardSize);
  };

  const isNumbers = mode === 'numbers';
  const isImage = mode === 'image';

  return (
    <React.Fragment>
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
              <ToggleButtonGroup.Separator />
              <Picture />
            </ToggleButton>
          </Tooltip>
          <Tooltip
            content={t('controls.challengeMode')}
            contentPlacement="right"
          >
            <ToggleButton
              isIconOnly
              id="challenge"
              aria-label={t('controls.challengeMode')}
            >
              <ToggleButtonGroup.Separator />
              <Stopwatch />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
        {(isNumbers || isImage) && (
          <ButtonGroup orientation="vertical">
            <Tooltip
              content={t('controls.largerBoard')}
              contentPlacement="right"
            >
              <Button
                isIconOnly
                onPress={handleIncreaseBoardSize}
                isDisabled={boardSize === Game.MAX_BOARD_SIZE}
                aria-label={t('controls.largerBoard')}
              >
                <Plus />
              </Button>
            </Tooltip>
            <Tooltip
              content={t('controls.smallerBoard')}
              contentPlacement="right"
            >
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
        )}
        {isImage && (
          <ButtonGroup orientation="vertical">
            <Tooltip
              content={t('controls.randomImage')}
              contentPlacement="right"
            >
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
      <AlertDialog.Backdrop
        isOpen={isConfirmChallengeExit}
        onOpenChange={setConfirmChallengeExit}
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                {t('alerts.quitChallenge.title')}
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>{t('alerts.quitChallenge.description')}</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                {t('common.cancel')}
              </Button>
              <Button
                slot="close"
                variant="danger"
                onPress={() => modeToSwitch && onModeChange?.(modeToSwitch)}
              >
                {t('common.yes')}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </React.Fragment>
  );
};

export namespace Controls {
  export type Mode = 'numbers' | 'image' | 'challenge';

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
