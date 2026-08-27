import {
  Tooltip as HeroUiTooltip,
  type TooltipProps,
  type TooltipContentProps,
} from '@heroui/react';

export const Tooltip = (props: Tooltip.Props) => {
  const { content, contentOffset, contentPlacement, children, ...rest } = props;

  return (
    <HeroUiTooltip shouldSkipAnimation delay={0} closeDelay={0} {...rest}>
      {children}
      <HeroUiTooltip.Content
        offset={contentOffset ?? 8}
        placement={contentPlacement}
        className="rounded-lg border border-border/80 bg-surface px-2.5 py-1 text-xs text-foreground shadow-sm transition-none duration-0"
      >
        <p>{content}</p>
      </HeroUiTooltip.Content>
    </HeroUiTooltip>
  );
};

export namespace Tooltip {
  export interface Props extends TooltipProps {
    content?: TooltipContentProps['children'];
    contentOffset?: TooltipContentProps['offset'];
    contentPlacement?: TooltipContentProps['placement'];
  }
}
