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
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@/components/tooltip';

export const Footer = (props: Footer.Props) => {
  const {
    soundEnabled = true,
    onSoundEnablePress,
    onSoundDisablePress,
    onStatsPress,
    onHelpPress,
    onSettingsPress,
    ...rest
  } = props;

  const { t } = useTranslation();

  return (
    <footer
      {...rest}
      className={clsx('flex justify-center gap-2', rest.className)}
    >
      <Tooltip
        content={soundEnabled ? t('footer.soundOff') : t('footer.soundOn')}
        contentPlacement="bottom"
      >
        <Button
          isIconOnly
          size="sm"
          variant={soundEnabled ? 'secondary' : 'danger-soft'}
          onPress={soundEnabled ? onSoundDisablePress : onSoundEnablePress}
          aria-label={soundEnabled ? t('footer.soundOff') : t('footer.soundOn')}
        >
          {soundEnabled ? <VolumeFill /> : <VolumeXmarkFill />}
        </Button>
      </Tooltip>
      <Tooltip content={t('footer.stats')} contentPlacement="bottom">
        <Button
          isIconOnly
          size="sm"
          variant="secondary"
          onPress={onStatsPress}
          aria-label={t('footer.stats')}
        >
          <SquareChartColumn />
        </Button>
      </Tooltip>
      <Tooltip content={t('footer.howToPlay')} contentPlacement="bottom">
        <Button
          isIconOnly
          size="sm"
          variant="secondary"
          onPress={onHelpPress}
          aria-label={t('footer.howToPlay')}
        >
          <CircleInfoFill />
        </Button>
      </Tooltip>
      <Tooltip content={t('footer.settings')} contentPlacement="bottom">
        <Button
          isIconOnly
          size="sm"
          variant="secondary"
          onPress={onSettingsPress}
          aria-label={t('footer.settings')}
        >
          <Gear />
        </Button>
      </Tooltip>
    </footer>
  );
};

export namespace Footer {
  export interface Props extends ComponentProps<'footer'> {
    soundEnabled?: boolean;
    onSoundEnablePress?: ButtonProps['onPress'];
    onSoundDisablePress?: ButtonProps['onPress'];
    onStatsPress?: ButtonProps['onPress'];
    onHelpPress?: ButtonProps['onPress'];
    onSettingsPress?: ButtonProps['onPress'];
  }
}
