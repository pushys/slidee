import type { ComponentProps } from 'react';

import {
  ChevronDown,
  ChevronUp,
  Dice3,
  SquareHashtag,
  Picture,
  Eye,
  EyeSlash,
} from '@gravity-ui/icons';
import {
  ButtonGroup,
  Button,
  type ButtonProps,
  ToggleButtonGroup,
  ToggleButton,
} from '@heroui/react';
import clsx from 'clsx';

import { Tooltip } from '@/components/tooltip';

export type Mode = 'numbers' | 'image';

interface ControlsProps extends ComponentProps<'aside'> {
  /**
   * Board mode.
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

export const Controls = (props: ControlsProps) => {
  const {
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

  const handleSelectionChange = (key: Set<string | number>) => {
    const selectedKey = Array.from(key)[0] as Mode;

    if (selectedKey !== mode) onModeChange?.(selectedKey);
  };

  return (
    <aside
      {...rest}
      className={clsx('flex flex-col gap-4 mt-14', rest.className)}
    >
      <ToggleButtonGroup
        disallowEmptySelection
        orientation="vertical"
        selectionMode="single"
        selectedKeys={[mode]}
        onSelectionChange={handleSelectionChange}
      >
        <Tooltip content="Numbers mode" contentPlacement="right">
          <ToggleButton isIconOnly id="numbers" aria-label="Numbers mode">
            <SquareHashtag />
          </ToggleButton>
        </Tooltip>
        <Tooltip content="Image mode" contentPlacement="right">
          <ToggleButton isIconOnly id="image" aria-label="Image mode">
            <Picture />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
      {mode === 'image' && (
        <ButtonGroup orientation="vertical">
          <Tooltip content="Random image" contentPlacement="right">
            <Button
              isIconOnly
              onPress={onRandomImagePress}
              aria-label="Random image"
            >
              <Dice3 />
            </Button>
          </Tooltip>
          <Tooltip content="Previous image" contentPlacement="right">
            <Button
              isIconOnly
              onPress={onPreviousImagePress}
              isDisabled={isPreviousImageButtonDisabled}
              aria-label="Previous image"
            >
              <ButtonGroup.Separator />
              <ChevronUp />
            </Button>
          </Tooltip>
          <Tooltip content="Next image" contentPlacement="right">
            <Button
              isIconOnly
              onPress={onNextImagePress}
              isDisabled={isNextImageButtonDisabled}
              aria-label="Next image"
            >
              <ButtonGroup.Separator />
              <ChevronDown />
            </Button>
          </Tooltip>
          <Tooltip content="Hold to preview" contentPlacement="right">
            <Button
              isIconOnly
              isDisabled={isPreviewImageButtonDisabled}
              onPressStart={onPreviewImagePressStart}
              onPressEnd={onPreviewImagePressEnd}
              aria-label="Hold to preview"
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
