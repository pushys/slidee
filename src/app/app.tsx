import { AppContainer } from '@/components/app-container';

import { Board } from './components/board';
import { Controls } from './components/controls';
import { HelpDialog } from './components/dialogs/help-dialog';
import { SettingsDialog } from './components/dialogs/settings-dialog';
import { StatsDialog } from './components/dialogs/stats-dialog';
import { Footer } from './components/footer';
import { Toolbar } from './components/toolbar';
import { AppProvider } from './providers/AppProvider';

export const App = () => {
  return (
    <AppProvider>
      <AppContainer controls={<Controls />}>
        <Toolbar />
        <Board />
        <Footer />
        <StatsDialog />
        <HelpDialog />
        <SettingsDialog />
      </AppContainer>
    </AppProvider>
  );
};
