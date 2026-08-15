import {
  Gear,
  VolumeFill,
  VolumeXmarkFill,
  CircleInfoFill,
  SquareChartColumn,
} from '@gravity-ui/icons';
import { Button, type ButtonProps } from '@heroui/react';
import clsx from 'clsx';
import { type ComponentProps } from 'react';

import { Tooltip } from '@/components/tooltip';

interface FooterProps extends ComponentProps<'footer'> {
  soundEnabled?: boolean;
  onSoundEnablePress?: ButtonProps['onPress'];
  onSoundDisablePress?: ButtonProps['onPress'];
  onStatsPress?: ButtonProps['onPress'];
  onHelpPress?: ButtonProps['onPress'];
  onSettingsPress?: ButtonProps['onPress'];
}

export const Footer = (props: FooterProps) => {
  const {
    soundEnabled = true,
    onSoundEnablePress,
    onSoundDisablePress,
    onStatsPress,
    onHelpPress,
    onSettingsPress,
    ...rest
  } = props;

  return (
    <footer
      {...rest}
      className={clsx('flex justify-center gap-2', rest.className)}
    >
      <Tooltip
        content={soundEnabled ? 'Sound off' : 'Sound on'}
        contentPlacement="bottom"
      >
        <Button
          isIconOnly
          size="sm"
          variant={soundEnabled ? 'secondary' : 'danger-soft'}
          onPress={soundEnabled ? onSoundDisablePress : onSoundEnablePress}
          aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          {soundEnabled ? <VolumeFill /> : <VolumeXmarkFill />}
        </Button>
      </Tooltip>
      <Tooltip content="Stats" contentPlacement="bottom">
        <Button
          isIconOnly
          size="sm"
          variant="secondary"
          onPress={onStatsPress}
          aria-label="Stats"
        >
          <SquareChartColumn />
        </Button>
      </Tooltip>
      <Tooltip content="How to play" contentPlacement="bottom">
        <Button
          isIconOnly
          size="sm"
          variant="secondary"
          onPress={onHelpPress}
          aria-label="Help"
        >
          <CircleInfoFill />
        </Button>
      </Tooltip>
      <Tooltip content="Settings" contentPlacement="bottom">
        <Button
          isIconOnly
          size="sm"
          variant="secondary"
          onPress={onSettingsPress}
          aria-label="Settings"
        >
          <Gear />
        </Button>
      </Tooltip>
    </footer>
  );
};
