import { Stopwatch } from '@gravity-ui/icons';
import {
  Modal,
  Button,
  Typography,
  type ModalDialogProps,
} from '@heroui/react';
import clsx from 'clsx';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import type { ChallengeSettings } from '@/shared/lib/challenge-settings/challenge-settings.schema';

import { ChallengeSettingsForm } from '@/components/forms/challenge-settings-form';

export const ChallengeSettingsDialog = (
  props: ChallengeSettingsDialog.Props,
) => {
  const { defaultChallengeSettings, onChallengeSettingsSave, images, ...rest } =
    props;

  const { t } = useTranslation();

  const formId = `form-${useId()}`;

  return (
    <Modal.Dialog {...rest} className={clsx('sm:max-w-md', rest.className)}>
      <Modal.CloseTrigger />
      <Modal.Header>
        <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
          <Stopwatch className="size-5" />
        </Modal.Icon>
        <Modal.Heading>{t('challengeSettingsDialog.title')}</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <Typography color="muted" type="body-sm" className="mb-4">
          {t('challengeSettingsDialog.description')}
        </Typography>
        <ChallengeSettingsForm
          id={formId}
          defaultValues={defaultChallengeSettings}
          onSubmit={onChallengeSettingsSave}
          images={images}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button slot="close" variant="secondary">
          {t('common.cancel')}
        </Button>
        <Button slot="close" type="submit" form={formId}>
          {t('common.start')}
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export namespace ChallengeSettingsDialog {
  export interface Props
    extends ModalDialogProps, Pick<ChallengeSettingsForm.Props, 'images'> {
    defaultChallengeSettings?: ChallengeSettings;
    onChallengeSettingsSave: (settings: ChallengeSettings) => void;
  }
}
