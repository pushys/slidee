import { ChallengeToolbar as ChallengeToolbarView } from '@/components/toolbars/challenge-toolbar';

import { useAppContext } from '../../app-context';

export const ChallengeToolbar = () => {
  const {
    challenge: { current, end },
    game,
    startViewTransition,
  } = useAppContext();

  if (!current) {
    throw new Error('No current challenge is detected');
  }

  return (
    <ChallengeToolbarView
      score={current.score}
      bestScore={current.bestScore}
      timeLeft={current.timeLeft}
      challengeStatus={current.status}
      onShufflePress={() => startViewTransition(() => game.init())}
      onQuitPress={end}
    />
  );
};
