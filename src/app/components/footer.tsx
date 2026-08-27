import { Footer as FooterView } from '@/components/footer';

import { useAppContext } from '../app-context';

export const Footer = () => {
  const {
    setDialog,
    settings: { settings, enableSound, disableSound },
  } = useAppContext();

  return (
    <FooterView
      soundEnabled={settings.sound}
      onSoundEnablePress={enableSound}
      onSoundDisablePress={disableSound}
      onStatsPress={() => setDialog('stats')}
      onHelpPress={() => setDialog('help')}
      onSettingsPress={() => setDialog('settings')}
    />
  );
};
