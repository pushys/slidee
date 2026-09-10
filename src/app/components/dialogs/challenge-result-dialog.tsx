import { ChallengeResultDialog as ChallengeResultDialogView } from '@/components/dialogs/challenge-result-dialog';

import { useAppContext } from '../../app-context';

export const ChallengeResultDialog = () => {
  const {
    openDialog,
    challenge: { current, end },
  } = useAppContext();

  const handleRestartChallengePress = () => {
    end();
    openDialog('challenge-settings');
  };

  return (
    <ChallengeResultDialogView
      score={current?.score}
      onNewChallengePress={handleRestartChallengePress}
      onQuitPress={end}
    />
  );
};
