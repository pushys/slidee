import { Toast } from '@heroui/react';
import clsx from 'clsx';
import React, { type ComponentProps, type ReactNode } from 'react';

export const AppContainer = (props: AppContainer.Props) => {
  const { controls, children, ...rest } = props;

  return (
    <React.Fragment>
      <main
        {...rest}
        className={clsx(
          '-mr-13 grid animate-fade-in grid-cols-[1fr_auto] gap-4 px-2 py-4',
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

export namespace AppContainer {
  export interface Props extends ComponentProps<'main'> {
    /**
     * Board element.
     */
    controls?: ReactNode;
  }
}
