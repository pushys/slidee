import {
  Label,
  Radio,
  RadioGroup,
  type RadioGroupProps,
  Skeleton,
  Description,
} from '@heroui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { Game } from '@/game/game';
import { useControlledState } from '@/shared/utils/use-controlled-state';

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

export const BoardSizePicker = (props: BoardSizePicker.Props) => {
  const { value: valueProp, defaultValue, onChange, ...rest } = props;

  const { t } = useTranslation();

  const [value, setValue] = useControlledState(
    valueProp,
    defaultValue ?? null,
    onChange,
  );

  const boardOptions = Game.BOARD_SIZES.map((size) => ({
    value: size,
    label: `${size}x${size}`,
    description: t(`boardSizePicker.options.${size}`),
  })) satisfies { value: Game.BoardSize; label: string; description: string }[];

  return (
    <RadioGroup
      variant="secondary"
      {...rest}
      value={String(value)}
      defaultValue={defaultValue ? String(defaultValue) : undefined}
      onChange={(value) => setValue(Number(value) as Game.BoardSize)}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <Label>{t('boardSizePicker.label')}</Label>
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
  );
};

export namespace BoardSizePicker {
  export interface Props extends Omit<
    RadioGroupProps,
    'value' | 'defaultValue' | 'onChange'
  > {
    /**
     * Controlled value.
     */
    value?: Game.BoardSize | null;
    /**
     * Default uncontrolled value.
     */
    defaultValue?: Game.BoardSize | null;
    /**
     * Controlled value change handler.
     */
    onChange?: (value: Game.BoardSize) => void;
  }
}
