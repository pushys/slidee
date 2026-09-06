import clsx from 'clsx';
import React, { type ComponentProps, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export const AppContainer = (props: AppContainer.Props) => {
  const { controls, children, ...rest } = props;

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <title>{t('app.title')}</title>
      <meta name="description" content={t('app.description')} />
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
