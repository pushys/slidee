import { Toast } from '@heroui/react';
import clsx from 'clsx';
import React, { type ComponentProps, type ReactNode } from 'react';

interface AppContainerProps extends ComponentProps<'main'> {
  /**
   * Board element.
   */
  controls?: ReactNode;
}

export const AppContainer = (props: AppContainerProps) => {
  const { controls, children, ...rest } = props;

  return (
    <React.Fragment>
      <main
        {...rest}
        className={clsx(
          'grid gap-4 grid-cols-[1fr_auto] py-4 px-2',
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
