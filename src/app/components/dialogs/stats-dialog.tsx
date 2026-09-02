import { StatsDialog as StatsDialogView } from '@/components/stats-dialog';

import { useAppContext } from '../../app-context';

export const StatsDialog = () => {
  const {
    stats: { stats, clearStats },
  } = useAppContext();

  return <StatsDialogView stats={stats} onClearStatsPress={clearStats} />;
};
