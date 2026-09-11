import { ChallengeResultDialog as ChallengeResultDialogView } from '@/components/dialogs/challenge-result-dialog';

import { useAppContext } from '../../app-context';

export const ChallengeResultDialog = () => {
  const {
    openDialog,
    challenge: { result },
  } = useAppContext();

  return (
    <ChallengeResultDialogView
      score={result?.score}
      bestScore={result?.bestScore}
      onNewChallengePress={() => openDialog('challenge-settings')}
    />
  );
};
