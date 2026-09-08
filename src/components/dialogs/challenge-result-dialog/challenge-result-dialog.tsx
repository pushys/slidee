import { Flag } from '@gravity-ui/icons';
import { Modal, Button, type ModalDialogProps } from '@heroui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export const ChallengeResultDialog = (props: ChallengeResultDialog.Props) => {
  const { onRestartChallengePress, onExitChallengePress, ...rest } = props;

  const { t } = useTranslation();

  return (
    <Modal.Dialog {...rest} className={clsx('sm:max-w-sm', rest.className)}>
      <Modal.CloseTrigger />
      <Modal.Header>
        <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
          <Flag className="size-5" />
        </Modal.Icon>
        <Modal.Heading>{t('challengeResultDialog.title')}</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="w-full"
            onPress={onRestartChallengePress}
          >
            New challenge
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full"
            onPress={onExitChallengePress}
          >
            Exit
          </Button>
        </div>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export namespace ChallengeResultDialog {
  export interface Props extends ModalDialogProps {
    /**
     * Restart challenge press handler.
     */
    onRestartChallengePress?: () => void;
    /**
     * Exit challenge press handler.
     */
    onExitChallengePress?: () => void;
  }
}
