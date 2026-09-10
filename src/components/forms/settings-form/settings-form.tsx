import { Switch, Description, SwitchGroup, Chip, Tabs } from '@heroui/react';
import { useState } from 'react';
import {
  useForm,
  type UseFormProps,
  Controller,
  useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { usePrefersReducedMotion } from 'rooks';

import type { Settings } from '@/settings/settings.schema';
import type { BoardStats } from '@/stats/board-stats.schema';

import { BoardSizePicker } from '@/components/board-size-picker';
import { ImagePicker } from '@/components/image-picker';
import { DEFAULT_SETTINGS } from '@/settings/settings.schema';

type TabKey = 'general' | 'image';

export const SettingsForm = (props: SettingsForm.Props) => {
  const {
    id,
    onSubmit,
    defaultValues = DEFAULT_SETTINGS,
    images,
    boardStats = {},
    ...rest
  } = props;

  const { t } = useTranslation();

  const [tab, setTab] = useState<TabKey>('general');

  const prefersReducedMotion = usePrefersReducedMotion();

  const methods = useForm<Settings>({ defaultValues, ...rest });

  const image = useWatch({ name: 'image', control: methods.control });

  return (
    <form
      id={id}
      className="min-h-108.75"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <Tabs
        selectedKey={tab}
        onSelectionChange={(key) => setTab(key as TabKey)}
        className="w-full"
      >
        <Tabs.ListContainer>
          <Tabs.List>
            <Tabs.Tab id="general">
              {t('settingsForm.tabs.general')}
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="image">
              {t('settingsForm.tabs.image')}
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="flex flex-col gap-5 pt-4" id="general">
          <SwitchGroup>
            <Controller
              name="sound"
              control={methods.control}
              render={({ field: { value, disabled, ...field } }) => (
                <Switch {...field} isSelected={value} isDisabled={disabled}>
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                    {t('settingsForm.sound.label')}
                  </Switch.Content>
                </Switch>
              )}
            />
            <Controller
              name="animations"
              render={({ field: { value, disabled, ...field } }) => (
                <Switch
                  {...field}
                  isSelected={value}
                  isDisabled={disabled || prefersReducedMotion}
                >
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                    {t('settingsForm.animations.label')}
                    {prefersReducedMotion && (
                      <Chip size="sm" color="warning" variant="soft">
                        <Chip.Label>
                          {t('settingsForm.animations.systemControlledMessage')}
                        </Chip.Label>
                      </Chip>
                    )}
                  </Switch.Content>
                </Switch>
              )}
              control={methods.control}
            />
            <Controller
              name="confetti"
              render={({ field: { value, disabled, ...field } }) => (
                <Switch {...field} isSelected={value} isDisabled={disabled}>
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                    {t('settingsForm.confetti.label')}
                  </Switch.Content>
                  <Description>
                    {t('settingsForm.confetti.description')}
                  </Description>
                </Switch>
              )}
              control={methods.control}
            />
          </SwitchGroup>
          <Controller
            name="boardSize"
            control={methods.control}
            render={({ field: { value, disabled, ...field } }) => (
              <BoardSizePicker
                {...field}
                value={value}
                isDisabled={disabled}
                onChange={field.onChange}
              />
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel className="flex flex-col gap-5 pt-4" id="image">
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
                  <Description>
                    {t('settingsForm.numbers.description')}
                  </Description>
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
                  field.onChange(
                    selection.size === 0 ? null : [...selection][0],
                  )
                }
                onBlur={field.onBlur}
                className="max-h-75.75"
                getIsImageSolved={(size, key) =>
                  boardStats?.[size]?.images.includes(key) ?? false
                }
              />
            )}
          />
        </Tabs.Panel>
      </Tabs>
    </form>
  );
};

export namespace SettingsForm {
  export interface Props
    extends UseFormProps<Settings>, Pick<ImagePicker.Props, 'images'> {
    id?: string;
    onSubmit: (values: Settings) => void;
    /**
     * Board stats object to show progress per image.
     *
     * @default {}
     */
    boardStats?: BoardStats;
  }
}
