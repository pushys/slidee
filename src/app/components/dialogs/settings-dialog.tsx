import { images } from '@/assets/images';
import { SettingsDialog as SettingsDialogView } from '@/components/settings-dialog';

import { useAppContext } from '../../app-context';

export const SettingsDialog = () => {
  const {
    dialog,
    closeDialog,
    settings: { settings, setSettings },
    stats: { stats },
  } = useAppContext();

  return (
    <SettingsDialogView
      isOpen={dialog === 'settings'}
      onOpenChange={closeDialog}
      defaultSettings={settings}
      onSettingsSave={setSettings}
      images={images}
      stats={stats}
    />
  );
};
