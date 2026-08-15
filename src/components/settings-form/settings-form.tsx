import { Ban } from '@gravity-ui/icons';
import {
  Avatar,
  Label,
  Radio,
  RadioGroup,
  Switch,
  Skeleton,
  Description,
  SwitchGroup,
  Chip,
} from '@heroui/react';
import clsx from 'clsx';
import { useForm, type UseFormProps, Controller } from 'react-hook-form';

import type { Settings } from '@/settings/types';

import { images } from '@/assets/images';
import { Game } from '@/game/game';
import { DEFAULT_SETTINGS } from '@/settings/constants';
import { usePrefersReducedMotion } from '@/shared/utils/use-prefers-reduced-motion';

const boardOptions = [
  { value: 3, label: 'Easy' },
  { value: 4, label: 'Classic' },
  { value: 5, label: 'Difficult' },
  { value: 6, label: 'Impossible' },
] satisfies { value: Game.BoardSize; label: string }[];

const imageOptions = Object.entries(images).map(([code, src]) => ({
  code,
  src,
}));

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
    <div className={clsx('grid gap-[2px] w-[40px] h-[40px]', gridMaps[size])}>
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

interface SettingsFormProps extends UseFormProps<Settings> {
  id?: string;
  onSubmit: (values: Settings) => void;
}

export const SettingsForm = (props: SettingsFormProps) => {
  const { id, onSubmit, defaultValues = DEFAULT_SETTINGS, ...rest } = props;

  const prefersReducedMotion = usePrefersReducedMotion();

  const methods = useForm<Settings>({ defaultValues, ...rest });

  const image = methods.watch('image');

  return (
    <form
      id={id}
      className="flex flex-col gap-5"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
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
                Sound effects
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
                Sliding animations
                {prefersReducedMotion && (
                  <Chip size="sm" color="warning" variant="soft">
                    <Chip.Label>Controlled by your system</Chip.Label>
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
                Confetti
              </Switch.Content>
              <Description>
                Play a confetti effect after a game is over.
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
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <Label>Board size</Label>
            </div>
            <div className="grid gap-2 grid-cols-2">
              {boardOptions.map((option) => (
                <Radio
                  key={option.value}
                  value={String(option.value)}
                  className="m-0"
                >
                  <Radio.Content
                    className={clsx(
                      'group relative flex w-full flex-row items-start justify-start gap-4 rounded-xl border border-2 border-transparent bg-surface-secondary px-4 py-3 transition-all',
                      'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10',
                    )}
                  >
                    <BoardSkeleton size={option.value} />
                    <div className="flex flex-col gap-1">
                      <span>{option.label}</span>
                      <Description>{`${option.value}x${option.value}`}</Description>
                    </div>
                  </Radio.Content>
                </Radio>
              ))}
            </div>
          </RadioGroup>
        )}
      />
      <Controller
        name="image"
        control={methods.control}
        render={({ field: { disabled, ...field } }) => (
          <RadioGroup
            {...field}
            variant="secondary"
            isDisabled={disabled}
            aria-label="Image"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <Label>Image</Label>
            </div>
            <div className="grid grid-flow-col auto-cols-[80px] gap-2 scrollbar-thin overflow-x-auto">
              <div
                className="aspect-square cursor-pointer m-0"
                onClick={() => methods.setValue('image', null)}
              >
                <div
                  className={clsx(
                    'flex items-center justify-center rounded-xl bg-surface-secondary p-1 transition-all w-full h-full',
                    {
                      'border border-transparent border-2': image !== null,
                      'border-accent bg-accent/10 border-2': image === null,
                    },
                  )}
                >
                  <Ban width={32} height={32} className="text-accent" />
                </div>
              </div>
              {imageOptions.map((image) => (
                <Radio
                  key={image.code}
                  value={image.code}
                  className="aspect-square m-0"
                >
                  <Radio.Content
                    className={clsx(
                      'rounded-xl border border-transparent border-2 bg-surface-secondary p-1 transition-all w-full h-full',
                      'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10',
                    )}
                  >
                    <Avatar className="rounded-lg w-full h-full">
                      <Avatar.Image alt="Cat" src={image.src} />
                    </Avatar>
                  </Radio.Content>
                </Radio>
              ))}
            </div>
          </RadioGroup>
        )}
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
                Show numbers
              </Switch.Content>
              <Description>If to display numbers over image tiles.</Description>
            </Switch>
          )}
          control={methods.control}
        />
        <Controller
          name="tileGap"
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
                Tile gap
              </Switch.Content>
              <Description>
                Show gap between tiles for better visibility, at the cost of
                immersion.
              </Description>
            </Switch>
          )}
          control={methods.control}
        />
      </SwitchGroup>
    </form>
  );
};
