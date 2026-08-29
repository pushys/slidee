import { type PropsWithChildren, useState } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { ErrorPage } from '@/components/error-page';

// Minimum number of attempts to reset the error before
// showing user the "Clear storage" button.
const MIN_ATTEMPTS = 3;

export const ErrorBoundary = (props: PropsWithChildren) => {
  const [errorCount, setErrorCount] = useState(0);

  const handleClearStoragePress = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <ReactErrorBoundary
      onError={() => setErrorCount((prevCount) => prevCount + 1)}
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorPage
          onRetryPress={resetErrorBoundary}
          {...(errorCount > MIN_ATTEMPTS && {
            onClearStoragePress: handleClearStoragePress,
          })}
        />
      )}
    >
      {props.children}
    </ReactErrorBoundary>
  );
};
