import { StatsDialog as StatsDialogView } from '@/components/stats-dialog';

import { useAppContext } from '../../app-context';

export const StatsDialog = () => {
  const {
    dialog,
    closeDialog,
    stats: { stats, clearStats },
  } = useAppContext();

  return (
    <StatsDialogView
      isOpen={dialog === 'stats'}
      onOpenChange={closeDialog}
      stats={stats}
      onClearStatsPress={clearStats}
    />
  );
};
