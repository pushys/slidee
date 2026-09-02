import { AppContainer } from '@/components/app-container';

import { Board } from './components/board';
import { Controls } from './components/controls';
import { Dialogs } from './components/dialogs';
import { Footer } from './components/footer';
import { Toolbar } from './components/toolbar';
import { AppProvider } from './providers/app-provider';
import { ErrorBoundary } from './providers/error-boundary';
import { Suspense } from './providers/suspense';

export const App = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <AppProvider>
          <AppContainer controls={<Controls />}>
            <Toolbar />
            <Board />
            <Footer />
            <Dialogs />
          </AppContainer>
        </AppProvider>
      </Suspense>
    </ErrorBoundary>
  );
};
