import type { ReactElement } from 'react';

import { Thunderbolt, Snail, Clock } from '@gravity-ui/icons';
import {
  Switch,
  SwitchGroup,
  ToggleButton,
  ToggleButtonGroup,
  Label,
} from '@heroui/react';
import {
  useForm,
  type UseFormProps,
  Controller,
  useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  TimeLimit,
  type ChallengeSettings,
  DEFAULT_CHALLENGE_SETTINGS,
} from '@/challenge-settings/challenge-settings.schema';
import { ImagePicker } from '@/components/image-picker';

const TIME_LIMIT_ICONS = {
  [TimeLimit.Fast]: <Thunderbolt />,
  [TimeLimit.Medium]: <Clock />,
  [TimeLimit.Slow]: <Snail />,
} satisfies Record<TimeLimit, ReactElement>;

export const ChallengeSettingsForm = (props: ChallengeSettingsForm.Props) => {
  const {
    id,
    onSubmit,
    defaultValues = DEFAULT_CHALLENGE_SETTINGS,
    images,
    ...rest
  } = props;

  const { t } = useTranslation();

  const methods = useForm<ChallengeSettings>({ defaultValues, ...rest });

  const image = useWatch({ name: 'image', control: methods.control });

  return (
    <form
      id={id}
      className="flex flex-col gap-5"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <Controller
        name="timeLimit"
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            <Label>{t('challengeSettingsForm.timeLimit.label')}</Label>
            <ToggleButtonGroup
              fullWidth
              selectionMode="single"
              selectedKeys={[value]}
              onSelectionChange={(keys) => onChange([...keys][0])}
            >
              {Object.values(TimeLimit).map((timeLimit) => (
                <ToggleButton key={timeLimit} id={timeLimit}>
                  {TIME_LIMIT_ICONS[timeLimit]}
                  {t('challengeSettingsForm.timeLimit.optionLabel', {
                    timeLimit,
                  })}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        )}
        control={methods.control}
      />
      <SwitchGroup>
        <Controller
          name="showNumbers"
          render={({ field: { value, disabled, ...field } }) => (
            <Switch
              {...field}
              isSelected={value}
              isDisabled={disabled || image === null}
            >
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                {t('settingsForm.numbers.label')}
              </Switch.Content>
            </Switch>
          )}
          control={methods.control}
        />
      </SwitchGroup>
      <Controller
        name="image"
        control={methods.control}
        render={({ field }) => (
          <ImagePicker
            images={images}
            name={field.name}
            ref={field.ref}
            selectedKeys={field.value ? new Set([field.value]) : new Set()}
            onSelectionChange={(selection) =>
              field.onChange(selection.size === 0 ? null : [...selection][0])
            }
            onBlur={field.onBlur}
            className="max-h-75.75"
          />
        )}
      />
    </form>
  );
};

export namespace ChallengeSettingsForm {
  export interface Props
    extends UseFormProps<ChallengeSettings>, Pick<ImagePicker.Props, 'images'> {
    /**
     * Form ID.
     */
    id?: string;
    /**
     * Submit handler.
     */
    onSubmit: (values: ChallengeSettings) => void;
  }
}
