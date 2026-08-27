import { SettingsDialog as SettingsDialogView } from '@/components/settings-dialog';

import { useAppContext } from '../../app-context';

export const SettingsDialog = () => {
  const {
    dialog,
    setDialog,
    settings: { settings, setSettings },
    stats: { stats },
  } = useAppContext();

  return (
    <SettingsDialogView
      isOpen={dialog === 'settings'}
      onOpenChange={() => setDialog(null)}
      defaultSettings={settings}
      onSettingsSave={setSettings}
      stats={stats}
    />
  );
};
