import { images } from '@/assets/images';
import { ChallengeSettingsDialog as ChallengeSettingsDialogView } from '@/components/dialogs/challenge-settings-dialog';
import { useLocalStorageChallengeSettings } from '@/shared/lib/challenge-settings/use-local-storage-challenge-settings';

import { useAppContext } from '../../app-context';

export const ChallengeSettingsDialog = () => {
  const {
    stats: { stats },
    challenge: { create },
  } = useAppContext();

  const [challengeSettings] = useLocalStorageChallengeSettings();

  return (
    <ChallengeSettingsDialogView
      defaultChallengeSettings={challengeSettings}
      onChallengeSettingsSave={(settings) =>
        create(settings, stats.challenge.bestScore)
      }
      images={images}
    />
  );
};
