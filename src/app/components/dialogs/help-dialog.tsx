import { HelpDialog as HelpDialogView } from '@/components/help-dialog';

import { useAppContext } from '../../app-context';

export const HelpDialog = () => {
  const { dialog, setDialog } = useAppContext();

  return (
    <HelpDialogView
      isOpen={dialog === 'help'}
      onOpenChange={() => setDialog(null)}
    />
  );
};
