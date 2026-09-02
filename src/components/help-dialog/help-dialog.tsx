import { CircleInfoFill } from '@gravity-ui/icons';
import {
  Modal,
  Button,
  Kbd,
  Typography,
  type ModalDialogProps,
} from '@heroui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export const HelpDialog = (props: HelpDialog.Props) => {
  const { t } = useTranslation();

  return (
    <Modal.Dialog {...props} className={clsx('sm:max-w-sm', props.className)}>
      <Modal.CloseTrigger />
      <Modal.Header>
        <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
          <CircleInfoFill className="size-5" />
        </Modal.Icon>
        <Modal.Heading>{t('helpDialog.title')}</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Typography color="muted" type="body-sm">
          {t('helpDialog.description')}
        </Typography>
        <Typography type="h3" className="mt-4 mb-3 text-sm">
          {t('helpDialog.controls.title')}
        </Typography>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">
              {t('helpDialog.controls.moveTiles')}:
            </span>
            <div className="flex items-center gap-2">
              <Kbd>
                <Kbd.Abbr keyValue="up" />
              </Kbd>
              <Kbd>
                <Kbd.Abbr keyValue="down" />
              </Kbd>
              <Kbd>
                <Kbd.Abbr keyValue="left" />
              </Kbd>
              <Kbd>
                <Kbd.Abbr keyValue="right" />
              </Kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">
              {t('helpDialog.controls.pauseResume')}:
            </span>
            <div className="flex items-center gap-2">
              <Kbd>
                <Kbd.Content>P</Kbd.Content>
              </Kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">
              {t('helpDialog.controls.shuffle')}:
            </span>
            <div className="flex items-center gap-2">
              <Kbd>
                <Kbd.Abbr keyValue="space" />
              </Kbd>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button slot="close" variant="secondary">
          {t('common.ok')}
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export namespace HelpDialog {
  export type Props = ModalDialogProps;
}
