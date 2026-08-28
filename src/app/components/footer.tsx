import { Footer as FooterView } from '@/components/footer';

import { useAppContext } from '../app-context';

export const Footer = () => {
  const {
    openDialog,
    settings: { settings, enableSound, disableSound },
  } = useAppContext();

  return (
    <FooterView
      soundEnabled={settings.sound}
      onSoundEnablePress={enableSound}
      onSoundDisablePress={disableSound}
      onStatsPress={() => openDialog('stats')}
      onHelpPress={() => openDialog('help')}
      onSettingsPress={() => openDialog('settings')}
    />
  );
};
