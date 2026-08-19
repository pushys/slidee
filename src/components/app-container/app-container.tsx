import { Toast } from '@heroui/react';
import clsx from 'clsx';
import React, { type ComponentProps, type ReactNode } from 'react';

interface AppContainerProps extends ComponentProps<'main'> {
  /**
   * If `true`, a more compact version of the app layout will be rendered.
   *
   * @default false
   */
  compact?: boolean;
  /**
   * Board element.
   */
  controls?: ReactNode;
}

export const AppContainer = (props: AppContainerProps) => {
  const { compact = false, controls, children, ...rest } = props;

  return (
    <React.Fragment>
      <main
        {...rest}
        className={clsx(
          'grid gap-4 grid-cols-[1fr_auto] w-full p-4',
          // Careful changing these values because they are calculated with
          // equal tile widths in mind applicable for all board sizes.
          { 'max-w-[520px]': compact, 'max-w-[580px]': !compact },
          rest.className,
        )}
      >
        <section className="flex flex-col gap-4">{children}</section>
        {controls}
      </main>
      <Toast.Provider />
    </React.Fragment>
  );
};
