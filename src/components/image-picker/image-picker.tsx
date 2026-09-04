import {
  Ban,
  CheckShape,
  CheckShapeFill,
  Funnel,
  Tag as TagIcon,
} from '@gravity-ui/icons';
import {
  Avatar,
  Label,
  Checkbox,
  CheckboxGroup,
  type CheckboxGroupProps,
  ScrollShadow,
  Badge,
  Popover,
  Button,
  Tag,
  TagGroup,
} from '@heroui/react';
import clsx from 'clsx';
import { intersection, last } from 'es-toolkit';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePrefersReducedMotion } from 'rooks';

import type { ImageKeys } from '@/assets/images';
import type { ImageMetadata, ImageTag } from '@/shared/types';

import { Tooltip } from '@/components/tooltip';
import { Game } from '@/game/game';
import { useControlledState } from '@/shared/utils/use-controlled-state';

export const ImagePicker = (props: ImagePicker.Props) => {
  const {
    images,
    disallowEmptySelection = false,
    selectionMode = 'single',
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    onSelectionChange,
    getIsImageSolved,
    ...rest
  } = props;

  const { t } = useTranslation();

  const [selectedKeys, setSelectedKeys] = useControlledState(
    selectedKeysProp,
    defaultSelectedKeys ?? new Set(),
    onSelectionChange,
  );

  const [tags, setTags] = useState<ImageTag[]>([]);

  const selectedImageRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll to the currently selected image option.
  useEffect(() => {
    selectedImageRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
      block: 'center',
    });
  }, [prefersReducedMotion]);

  const imageOptions = useMemo(() => {
    const entries = Object.entries(images) as [ImageKeys, ImageMetadata][];

    if (tags.length < 1) return entries;

    return entries.filter(
      ([, image]) => intersection(image.tags, tags).length > 0,
    );
  }, [images, tags]);

  const hasSelectedKeys = selectedKeys.size !== 0;

  const handleChange = (values: string[]) => {
    const keys = values as ImageKeys[];

    if (selectionMode === 'single') {
      const key = last(keys);

      if (!key || selectedKeys.has(key)) {
        return setSelectedKeys(new Set());
      }

      return setSelectedKeys(new Set([key]));
    }

    return setSelectedKeys(new Set(keys));
  };

  const imageTagOptions = [
    { tag: '3d', label: t('imageTags.3d') },
    { tag: 'animals', label: t('imageTags.animals') },
    { tag: 'architecture', label: t('imageTags.architecture') },
    { tag: 'art', label: t('imageTags.art') },
    { tag: 'automotive', label: t('imageTags.automotive') },
    { tag: 'aviation', label: t('imageTags.aviation') },
    { tag: 'drinks', label: t('imageTags.drinks') },
    { tag: 'food', label: t('imageTags.food') },
    { tag: 'luxury', label: t('imageTags.luxury') },
    { tag: 'nature', label: t('imageTags.nature') },
    { tag: 'space', label: t('imageTags.space') },
    { tag: 'sports', label: t('imageTags.sports') },
    { tag: 'technology', label: t('imageTags.technology') },
  ] satisfies { tag: ImageTag; label: string }[];

  return (
    <CheckboxGroup
      variant="secondary"
      aria-label={t('imagePicker.label')}
      {...rest}
      value={Array.from(selectedKeys)}
      onChange={handleChange}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <Label>{t('imagePicker.label')}</Label>
        <Popover>
          <Tooltip content={t('imagePicker.filters.label')}>
            <Badge.Anchor>
              <Button isIconOnly size="sm" variant="ghost" className="size-6">
                <Funnel />
              </Button>
              {tags.length > 0 && (
                <Badge color="accent" className="min-h-3 min-w-3" />
              )}
            </Badge.Anchor>
          </Tooltip>
          <Popover.Content placement="bottom right" className="max-w-64">
            <Popover.Dialog>
              <TagGroup
                aria-label={t('imagePicker.filters.imageTags')}
                selectionMode="multiple"
                selectedKeys={tags}
                onSelectionChange={(selection) =>
                  selection === 'all'
                    ? setTags(imageTagOptions.map((o) => o.tag))
                    : setTags(Array.from(selection) as ImageTag[])
                }
              >
                <TagGroup.List>
                  {imageTagOptions.map((option) => (
                    <Tag key={option.tag} id={option.tag}>
                      <TagIcon />
                      {option.label}
                    </Tag>
                  ))}
                </TagGroup.List>
              </TagGroup>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      </div>
      <ScrollShadow className="grid scrollbar-gutter-stable grid-cols-4 gap-2 overflow-x-hidden overflow-y-auto">
        {!disallowEmptySelection && (
          <div
            className="m-0 aspect-square cursor-pointer"
            onClick={() => setSelectedKeys(new Set([]))}
          >
            <div
              className={clsx(
                'flex size-full items-center justify-center rounded-xl bg-surface-secondary p-1 transition-all',
                {
                  'border-2 border-transparent': hasSelectedKeys,
                  'border-2 border-accent bg-accent/10': !hasSelectedKeys,
                },
              )}
            >
              <Ban width={32} height={32} className="text-accent" />
            </div>
          </div>
        )}
        {imageOptions.map(([key, metadata]) => {
          const solved = Game.BOARD_SIZES.map(
            (size) => getIsImageSolved?.(size, key) ?? false,
          );
          const allSolved = solved.every((isSolved) => isSolved);

          return (
            <Checkbox
              key={key}
              value={key}
              className="m-0 aspect-square"
              ref={selectedKeys.has(key) ? selectedImageRef : undefined}
            >
              <Checkbox.Content
                className={clsx(
                  'size-full rounded-xl border-2 border-transparent bg-surface-secondary p-1 transition-all',
                  'data-[selected=true]:border-accent data-[selected=true]:bg-accent/10',
                )}
              >
                <Badge.Anchor className="size-full">
                  <Avatar className="size-full rounded-lg">
                    <Avatar.Image
                      alt={key}
                      loading="lazy"
                      src={metadata.preview}
                    />
                  </Avatar>
                  {getIsImageSolved && (
                    <Badge
                      color={allSolved ? 'success' : 'accent'}
                      size="sm"
                      className="gap-0 border-surface-secondary px-0.5"
                    >
                      {solved.map((isSolved, index) => (
                        <React.Fragment key={index}>
                          {isSolved ? (
                            <CheckShapeFill className="size-2" />
                          ) : (
                            <CheckShape className="size-2" />
                          )}
                        </React.Fragment>
                      ))}
                    </Badge>
                  )}
                </Badge.Anchor>
              </Checkbox.Content>
            </Checkbox>
          );
        })}
      </ScrollShadow>
    </CheckboxGroup>
  );
};

export namespace ImagePicker {
  export type Selection = Set<ImageKeys>;

  export interface Props extends Omit<
    CheckboxGroupProps,
    'value' | 'defaultValue' | 'onChange'
  > {
    /**
     * Map of images.
     */
    images: Record<ImageKeys, ImageMetadata>;
    /**
     * Whether the collection allows empty selection.
     *
     * @default false
     */
    disallowEmptySelection?: boolean;
    /**
     * Whether one or multiple images can be selected.
     *
     * @default 'single'
     */
    selectionMode?: 'single' | 'multiple';
    /**
     * Controlled selection state.
     */
    selectedKeys?: Selection;
    /**
     * Default selected keys (uncontrolled).
     */
    defaultSelectedKeys?: Selection;
    /**
     * Called when selection changes.
     */
    onSelectionChange?: (selection: Selection) => void;
    /**
     * Checks if an image is solved on particular board size.
     */
    getIsImageSolved?: (
      boardSize: Game.BoardSize,
      imageKey: ImageKeys,
    ) => boolean;
  }
}
