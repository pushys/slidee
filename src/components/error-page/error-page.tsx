import type { ComponentProps } from 'react';

import {
  ArrowRotateLeft,
  SquareExclamation,
  TrashBin,
} from '@gravity-ui/icons';
import { Button, type ButtonProps, AlertDialog } from '@heroui/react';

import { Empty } from '@/components/empty';

export const ErrorPage = (props: ErrorPage.Props) => {
  const { onRetryPress, onClearStoragePress, ...rest } = props;

  return (
    <div {...rest}>
      <Empty
        icon={<SquareExclamation className="size-6" />}
        title="Error Occurred"
        description="Something went wrong."
      >
        <div className="flex gap-2">
          <Button onPress={onRetryPress}>
            <ArrowRotateLeft />
            Retry
          </Button>
          {onClearStoragePress && (
            <AlertDialog>
              <Button variant="danger-soft">
                <TrashBin />
                Clear storage
              </Button>
              <AlertDialog.Backdrop>
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="sm:max-w-100">
                    <AlertDialog.CloseTrigger />
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="danger" />
                      <AlertDialog.Heading>Clear storage</AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p>
                        The issue might be in corrupt storage data. This action
                        will clear game's settings and statistics. Continue?
                      </p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button slot="close" variant="tertiary">
                        Cancel
                      </Button>
                      <Button
                        slot="close"
                        variant="danger"
                        onPress={onClearStoragePress}
                      >
                        Clear
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
