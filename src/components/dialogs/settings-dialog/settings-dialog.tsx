import { Gear } from '@gravity-ui/icons';
import { Modal, Button, type ModalDialogProps } from '@heroui/react';
import clsx from 'clsx';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import type { Settings } from '@/settings/settings.schema';

import { SettingsForm } from '@/components/settings-form';

export const SettingsDialog = (props: SettingsDialog.Props) => {
  const { defaultSettings, onSettingsSave, images, stats, ...rest } = props;

  const { t } = useTranslation();

  const formId = `form-${useId()}`;

  return (
    <Modal.Dialog {...rest} className={clsx('sm:max-w-md', rest.className)}>
      <Modal.CloseTrigger />
      <Modal.Header>
        <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
          <Gear className="size-5" />
        </Modal.Icon>
        <Modal.Heading>{t('settingsDialog.title')}</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <SettingsForm
          id={formId}
          defaultValues={defaultSettings}
          onSubmit={onSettingsSave}
          images={images}
          stats={stats}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button slot="close" variant="secondary">
          {t('common.cancel')}
        </Button>
        <Button slot="close" type="submit" form={formId}>
          {t('common.save')}
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export namespace SettingsDialog {
  export interface Props
    extends ModalDialogProps, Pick<SettingsForm.Props, 'images' | 'stats'> {
    defaultSettings?: Settings;
    onSettingsSave: (settings: Settings) => void;
  }
}
