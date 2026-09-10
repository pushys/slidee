import { StatsDialog as StatsDialogView } from '@/components/dialogs/stats-dialog';

import { useAppContext } from '../../app-context';

export const StatsDialog = () => {
  const {
    stats: { stats, clearBoardStats },
  } = useAppContext();

  return (
    <StatsDialogView
      boardStats={stats.board}
      onClearBoardStatsPress={clearBoardStats}
    />
  );
};
