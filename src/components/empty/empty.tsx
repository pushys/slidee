import type { ComponentProps, ReactNode } from 'react';

import { Avatar, Description } from '@heroui/react';
import clsx from 'clsx';

export const Empty = (props: Empty.Props) => {
  const { icon, title, description, children, ...rest } = props;

  return (
    <div
      {...rest}
      className={clsx(
        'flex flex-col items-center justify-center gap-3 px-6 py-12 text-center',
        rest.className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full">
        <Avatar>
          <Avatar.Fallback>{icon}</Avatar.Fallback>
        </Avatar>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Description className="max-w-sm text-sm">{description}</Description>
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export namespace Empty {
  export interface Props extends Omit<ComponentProps<'div'>, 'title'> {
    icon?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
  }
}
