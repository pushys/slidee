import { Footer as FooterView } from '@/components/footer';

import { useAppContext } from '../app-context';

export const Footer = () => {
  const {
    dialog: { open },
    settings: { settings, enableSound, disableSound },
    challenge: { hasCurrent },
  } = useAppContext();

  return (
    <FooterView
      soundEnabled={settings.sound}
      onSoundEnablePress={enableSound}
      onSoundDisablePress={disableSound}
      onStatsPress={() => open('stats')}
      onHelpPress={() => open('help')}
      onSettingsPress={() => open('settings')}
      isChallengeActive={hasCurrent}
    />
  );
};
