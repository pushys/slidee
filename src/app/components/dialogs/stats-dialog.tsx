import { StatsDialog as StatsDialogView } from '@/components/stats-dialog';

import { useAppContext } from '../../app-context';

export const StatsDialog = () => {
  const {
    dialog,
    setDialog,
    stats: { stats, clearStats },
  } = useAppContext();

  return (
    <StatsDialogView
      isOpen={dialog === 'stats'}
      onOpenChange={() => setDialog(null)}
      stats={stats}
      onClearStatsPress={clearStats}
    />
  );
};
