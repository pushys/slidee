import { Modal, Spinner } from '@heroui/react';
import { Suspense } from 'react';

import { lazyNamed } from '@/shared/utils/lazy-named';

import { useAppContext, type AppContext } from '../../app-context';

const StatsDialog = lazyNamed(() => import('./stats-dialog'), 'StatsDialog');
const HelpDialog = lazyNamed(() => import('./help-dialog'), 'HelpDialog');
const SettingsDialog = lazyNamed(
  () => import('./settings-dialog'),
  'SettingsDialog',
);
const ChallengeSettingsDialog = lazyNamed(
  () => import('./challenge-settings-dialog'),
  'ChallengeSettingsDialog',
);
const ChallengeResultDialog = lazyNamed(
  () => import('./challenge-result-dialog'),
  'ChallengeResultDialog',
);

// These dialogs will be dismissable neither by clicking nor by keyboard.
const NON_DISMISSABLE: AppContext.Dialog[] = ['challenge-result'];

export const Dialogs = () => {
  const { dialog, isDialogOpen, closeDialog } = useAppContext();

  const isDismissable = dialog ? !NON_DISMISSABLE.includes(dialog) : false;

  return (
    <Modal.Backdrop
      variant="blur"
      isOpen={isDialogOpen}
      onOpenChange={closeDialog}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={!isDismissable}
    >
      <Suspense fallback={<Spinner className="text-white" />}>
        <Modal.Container>
          {dialog === 'stats' && <StatsDialog />}
          {dialog === 'help' && <HelpDialog />}
          {dialog === 'settings' && <SettingsDialog />}
          {dialog === 'challenge-settings' && <ChallengeSettingsDialog />}
          {dialog === 'challenge-result' && <ChallengeResultDialog />}
        </Modal.Container>
      </Suspense>
    </Modal.Backdrop>
  );
};
