import { Spinner } from '@heroui/react';
import React, { type PropsWithChildren } from 'react';

export const Suspense = (props: PropsWithChildren) => {
  return (
    <React.Suspense fallback={<Spinner />}>{props.children}</React.Suspense>
  );
};
