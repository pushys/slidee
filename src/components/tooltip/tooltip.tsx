import {
  Tooltip as HeroUiTooltip,
  type TooltipProps as HeroUiTooltipProps,
  type TooltipContentProps,
} from '@heroui/react';

interface TooltipProps extends HeroUiTooltipProps {
  content?: TooltipContentProps['children'];
  contentOffset?: TooltipContentProps['offset'];
  contentPlacement?: TooltipContentProps['placement'];
}

export const Tooltip = (props: TooltipProps) => {
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
