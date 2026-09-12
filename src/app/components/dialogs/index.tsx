import { Modal, Spinner } from '@heroui/react';
import { Suspense } from 'react';

import { lazyNamed } from '@/shared/utils/lazy-named';

import type { useDialog } from '../../features/dialog';

import { useAppContext } from '../../app-context';

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
const NON_DISMISSABLE: useDialog.Key[] = ['challenge-result'];

export const Dialogs = () => {
  const {
    dialog: { current, isOpen, close },
  } = useAppContext();

  const isDismissable = current ? !NON_DISMISSABLE.includes(current) : false;

  return (
    <Modal.Backdrop
      variant="blur"
      isOpen={isOpen}
      onOpenChange={close}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={!isDismissable}
    >
      <Suspense fallback={<Spinner className="text-white" />}>
        <Modal.Container>
          {current === 'stats' && <StatsDialog />}
          {current === 'help' && <HelpDialog />}
          {current === 'settings' && <SettingsDialog />}
          {current === 'challenge-settings' && <ChallengeSettingsDialog />}
          {current === 'challenge-result' && <ChallengeResultDialog />}
        </Modal.Container>
      </Suspense>
    </Modal.Backdrop>
  );
};
