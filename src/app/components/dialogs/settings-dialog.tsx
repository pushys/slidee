import { images } from '@/assets/images';
import { SettingsDialog as SettingsDialogView } from '@/components/dialogs/settings-dialog';

import { useAppContext } from '../../app-context';

export const SettingsDialog = () => {
  const {
    settings: { settings, setSettings },
    stats: { stats },
  } = useAppContext();

  return (
    <SettingsDialogView
      defaultSettings={settings}
      onSettingsSave={setSettings}
      images={images}
      stats={stats}
    />
  );
};
