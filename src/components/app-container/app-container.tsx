import { Toast } from '@heroui/react';
import clsx from 'clsx';
import { type ComponentProps } from 'react';

interface AppContainerProps extends ComponentProps<'main'> {}

export const AppContainer = (props: AppContainerProps) => {
  return (
    <main
      {...props}
      className={clsx(
        'flex flex-col w-full max-w-[480px] gap-4 py-4',
        props.className,
      )}
    >
      {props.children}
      <Toast.Provider />
    </main>
  );
};
