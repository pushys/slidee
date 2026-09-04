import {
  Label,
  Radio,
  RadioGroup,
  Switch,
  Skeleton,
  Description,
  SwitchGroup,
  Chip,
  Tabs,
} from '@heroui/react';
import clsx from 'clsx';
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
import type { Stats } from '@/stats/stats.schema';

import { ImagePicker } from '@/components/image-picker';
import { Game } from '@/game/game';
import { DEFAULT_SETTINGS } from '@/settings/settings.schema';

type TabKey = 'general' | 'image';

const BoardSkeleton = ({ size }: { size: Game.BoardSize }) => {
  const gridMaps = {
    3: 'grid-cols-3 grid-rows-3',
    4: 'grid-cols-4 grid-rows-4',
    5: 'grid-cols-5 grid-rows-5',
    6: 'grid-cols-6 grid-rows-6',
  } satisfies Record<
    Game.BoardSize,
    `grid-cols-${Game.BoardSize} grid-rows-${Game.BoardSize}`
  >;

  return (
    <div className={clsx('grid size-10 gap-0.5', gridMaps[size])}>
      {Array.from({ length: size * size - 1 }).map((_, index) => (
        <Skeleton
          key={index}
          className="aspect-square rounded-xs bg-accent"
          animationType="none"
        />
      ))}
    </div>
  );
};

export const SettingsForm = (props: SettingsForm.Props) => {
  const {
    id,
    onSubmit,
    defaultValues = DEFAULT_SETTINGS,
    images,
    stats = {},
    ...rest
  } = props;

  const { t } = useTranslation();

  const [tab, setTab] = useState<TabKey>('general');

  const prefersReducedMotion = usePrefersReducedMotion();

  const methods = useForm<Settings>({ defaultValues, ...rest });

  const image = useWatch({ name: 'image', control: methods.control });

  const boardOptions = Game.BOARD_SIZES.map((size) => ({
    value: size,
    label: `${size}x${size}`,
    description: t(`settingsForm.boardSize.options.${size}`),
  })) satisfies { value: Game.BoardSize; label: string; description: string }[];

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
              <RadioGroup
                {...field}
                variant="secondary"
                value={String(value)}
                isDisabled={disabled}
                onChange={(value) => field.onChange(Number(value))}
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
                  <Label>{t('settingsForm.boardSize.label')}</Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {boardOptions.map((option) => (
                    <Radio
                      key={option.value}
                      value={String(option.value)}
                      className="m-0"
                    >
                      <Radio.Content
                        className={clsx(
                          'group relative flex w-full flex-row items-start justify-start gap-4 rounded-xl border-2 border-transparent bg-surface-secondary px-4 py-3 transition-all',
                          'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10',
                        )}
                      >
                        <BoardSkeleton size={option.value} />
                        <div className="flex flex-col gap-1">
                          <span>{option.label}</span>
                          <Description>{option.description}</Description>
                        </div>
                      </Radio.Content>
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
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
                  stats?.[size]?.images.includes(key) ?? false
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
     * Stats object to show progress per image.
     */
    stats?: Stats;
  }
}
