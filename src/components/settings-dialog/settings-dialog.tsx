import { Gear } from '@gravity-ui/icons';
import { Modal, Button, type ModalBackdropProps } from '@heroui/react';
import { useId } from 'react';

import type { Settings } from '@/settings/types';

import {
  SettingsForm,
  type SettingsFormProps,
} from '@/components/settings-form';

interface SettingsDialogProps
  extends
    Pick<ModalBackdropProps, 'isOpen' | 'onOpenChange'>,
    Pick<SettingsFormProps, 'stats'> {
  defaultSettings?: Settings;
  onSettingsSave: (settings: Settings) => void;
}

export const SettingsDialog = (props: SettingsDialogProps) => {
  const { isOpen, onOpenChange, defaultSettings, onSettingsSave, stats } =
    props;

  const formId = `form-${useId()}`;

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-md">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
              <Gear className="size-5" />
            </Modal.Icon>
            <Modal.Heading>Settings</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <SettingsForm
              id={formId}
              defaultValues={defaultSettings}
              onSubmit={onSettingsSave}
              stats={stats}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button slot="close" type="submit" form={formId}>
              Save
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};
