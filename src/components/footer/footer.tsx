import {
  Gear,
  VolumeFill,
  VolumeXmarkFill,
  CircleInfoFill,
  SquareChartColumn,
  Globe,
} from '@gravity-ui/icons';
import { Button, type ButtonProps, Separator, Popover } from '@heroui/react';
import clsx from 'clsx';
import { useState, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import type { Language } from '@/shared/types';

import { LanguageSelect } from '@/components/language-select';
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

  const { t, i18n } = useTranslation();

  const [isLanguagePopoverOpen, setLanguagePopoverOpen] = useState(false);

  const lang = t(`languages.${(i18n.resolvedLanguage ?? 'en') as Language}`);

  return (
    <footer
      {...rest}
      className={clsx('flex items-center justify-center gap-2', rest.className)}
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
      <Separator orientation="vertical" className="h-[50%] self-center" />
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
      <Separator orientation="vertical" className="h-[50%] self-center" />
      <Popover
        isOpen={isLanguagePopoverOpen}
        onOpenChange={setLanguagePopoverOpen}
      >
        <Tooltip
          content={t('footer.language', { lang })}
          contentPlacement="bottom"
        >
          <Button
            isIconOnly
            size="sm"
            variant="secondary"
            aria-label={t('footer.language', { lang })}
          >
            <Globe />
          </Button>
        </Tooltip>
        <Popover.Content placement="top" className="min-w-60 p-4">
          <LanguageSelect
            onLanguageChangeSettle={() => setLanguagePopoverOpen(false)}
          />
        </Popover.Content>
      </Popover>
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
