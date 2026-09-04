import type { ComponentProps } from 'react';

import {
  ArrowRotateLeft,
  SquareExclamation,
  TrashBin,
} from '@gravity-ui/icons';
import { Button, type ButtonProps, AlertDialog } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { Empty } from '@/components/empty';

export const ErrorPage = (props: ErrorPage.Props) => {
  const { onRetryPress, onClearStoragePress, ...rest } = props;

  const { t } = useTranslation();

  return (
    <div {...rest}>
      <Empty
        icon={<SquareExclamation className="size-6" />}
        title={t('errors.title')}
        description={t('errors.somethingWentWrong')}
      >
        <div className="flex gap-2">
          <Button onPress={onRetryPress}>
            <ArrowRotateLeft />
            {t('common.retry')}
          </Button>
          {onClearStoragePress && (
            <AlertDialog>
              <Button variant="danger-soft">
                <TrashBin />
                {t('alerts.clearStorage.title')}
              </Button>
              <AlertDialog.Backdrop>
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="sm:max-w-100">
                    <AlertDialog.CloseTrigger />
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="danger" />
                      <AlertDialog.Heading>
                        {t('alerts.clearStorage.title')}
                      </AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p>{t('alerts.clearStorage.description')}</p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button slot="close" variant="tertiary">
                        {t('common.cancel')}
                      </Button>
                      <Button
                        slot="close"
                        variant="danger"
                        onPress={onClearStoragePress}
                      >
                        {t('common.clear')}
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
          )}
        </div>
      </Empty>
    </div>
  );
};

export namespace ErrorPage {
  export interface Props extends ComponentProps<'div'> {
    /**
     * "Retry" button press handler.
     */
    onRetryPress?: ButtonProps['onPress'];
    /**
     * "Clear storage" button press handler.
     */
    onClearStoragePress?: ButtonProps['onPress'];
  }
}
