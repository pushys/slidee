import {
  Gear,
  VolumeFill,
  VolumeXmarkFill,
  CircleInfoFill,
  SquareChartColumn,
  Globe,
} from '@gravity-ui/icons';
import {
  Button,
  type ButtonProps,
  Separator,
  Popover,
  Radio,
  RadioGroup,
  Label,
  Surface,
  toast,
} from '@heroui/react';
import clsx from 'clsx';
import React, { useState, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@/components/tooltip';

type Language = 'en' | 'ru';

const LANGUAGE_OPTIONS = ['en', 'ru'] satisfies Language[];

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

  const handleLanguageChange = (newLang: string) => {
    // Pre-load new translations before changing language to not
    // trigger `Suspense` which will unmount the whole app.
    void i18n.loadLanguages(newLang).then(async () => {
      await i18n.changeLanguage(newLang);

      setLanguagePopoverOpen(false);

      toast.success(
        i18n.t('footer.language.changeSuccessMessage', {
          lang: t(`languages.${newLang as Language}`),
        }),
        { timeout: 1500 },
      );
    });
  };

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
      <Separator orientation="vertical" className="h-[50%] self-center" />
      <Popover
        isOpen={isLanguagePopoverOpen}
        onOpenChange={setLanguagePopoverOpen}
      >
        <Tooltip
          content={t('footer.language.label', { lang })}
          contentPlacement="bottom"
        >
          <Button
            isIconOnly
            size="sm"
            variant="secondary"
            aria-label={t('footer.language.label', { lang })}
          >
            <Globe />
          </Button>
        </Tooltip>
        <Popover.Content placement="top" className="min-w-60 p-4">
          <RadioGroup
            value={i18n.resolvedLanguage}
            name="language"
            onChange={handleLanguageChange}
          >
            <Label>{t('footer.language.radioGroupLabel')}</Label>
            <Surface
              variant="secondary"
              className="mt-2 flex flex-col gap-3 rounded-xl p-3"
            >
              {LANGUAGE_OPTIONS.map((option, index) => (
                <React.Fragment key={option}>
                  <Radio value={option} className="mt-0">
                    <Radio.Content className="w-full">
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      {t(`languages.${option}`)}
                    </Radio.Content>
                  </Radio>
                  {index !== LANGUAGE_OPTIONS.length - 1 && (
                    <Separator variant="secondary" />
                  )}
                </React.Fragment>
              ))}
            </Surface>
          </RadioGroup>
        </Popover.Content>
      </Popover>
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
