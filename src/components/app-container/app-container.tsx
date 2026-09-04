import type { ComponentProps, ReactNode } from 'react';

import clsx from 'clsx';

export const AppContainer = (props: AppContainer.Props) => {
  const { controls, children, ...rest } = props;

  return (
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
