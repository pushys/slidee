import { Gear } from '@gravity-ui/icons';
import { Modal, Button, type ModalBackdropProps } from '@heroui/react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import type { Settings } from '@/settings/settings.schema';

import { SettingsForm } from '@/components/settings-form';

export const SettingsDialog = (props: SettingsDialog.Props) => {
  const {
    isOpen,
    onOpenChange,
    defaultSettings,
    onSettingsSave,
    images,
    stats,
  } = props;

  const { t } = useTranslation();

  const formId = `form-${useId()}`;

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md">
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
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export namespace SettingsDialog {
  export interface Props
    extends
      Pick<ModalBackdropProps, 'isOpen' | 'onOpenChange'>,
      Pick<SettingsForm.Props, 'images' | 'stats'> {
    defaultSettings?: Settings;
    onSettingsSave: (settings: Settings) => void;
  }
}
