import {
  Separator,
  Radio,
  RadioGroup,
  type RadioGroupProps,
  Label,
  Surface,
  toast,
  Spinner,
} from '@heroui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Language } from '@/shared/types';

const LANGUAGE_OPTIONS = ['de', 'en', 'ru'] satisfies Language[];
const TOAST_TIMEOUT = 2000;

/**
 * Fully uncontrolled language select which directly communicates with i18n.
 */
export const LanguageSelect = (props: LanguageSelect.Props) => {
  const { onLanguageChangeSettle, ...rest } = props;

  const { t, i18n } = useTranslation();

  const [isPending, setPending] = useState(false);

  const changeLanguage = async (lang: string) => {
    // Pre-load new translations before changing language to not
    // trigger `Suspense` which will unmount the whole app.
    await i18n.loadLanguages(lang);
    await i18n.changeLanguage(lang);
  };

  const handleLanguageChange = (lang: string) => {
    if (isPending) return;

    setPending(true);

    changeLanguage(lang)
      .then(() => {
        toast.success(
          i18n.t('languageSelect.changeSuccessMessage', {
            lang: t(`languages.${lang as Language}`),
          }),
          { timeout: TOAST_TIMEOUT },
        );
      })
      .catch(() => {
        toast.danger(i18n.t('languageSelect.changeErrorMessage'), {
          timeout: TOAST_TIMEOUT,
        });
      })
      .finally(() => {
        setPending(false);
        onLanguageChangeSettle?.();
      });
  };

  return (
    <RadioGroup
      name="language"
      {...rest}
      value={i18n.resolvedLanguage}
      onChange={handleLanguageChange}
      isDisabled={isPending || !!rest.isDisabled}
    >
      <Label className="flex items-center justify-between px-3">
        {t('languageSelect.label')}
        {isPending && <Spinner className="size-4" />}
      </Label>
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
  );
};

export namespace LanguageSelect {
  export interface Props extends Omit<
    RadioGroupProps,
    'value' | 'onChange' | 'defaultValue'
  > {
    /**
     * Language success change handler.
     */
    onLanguageChangeSettle?: () => void;
  }
}
