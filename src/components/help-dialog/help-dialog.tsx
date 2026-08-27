import { CircleInfoFill } from '@gravity-ui/icons';
import {
  Modal,
  Button,
  type ModalBackdropProps,
  Kbd,
  Typography,
} from '@heroui/react';

export const HelpDialog = (props: HelpDialog.Props) => {
  const { isOpen, onOpenChange } = props;

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-sm">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
              <CircleInfoFill className="size-5" />
            </Modal.Icon>
            <Modal.Heading>How to play</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <Typography color="muted" type="body-sm">
              Slide the tiles into the empty space to arrange the numbers in
              order, from 1 to the highest number. Try to solve the puzzle as
              quickly as possible!
            </Typography>
            <Typography type="h3" className="mt-4 mb-3 text-sm">
              Controls
            </Typography>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Move tiles:</span>
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
                <span className="text-sm text-muted">Pause/resume:</span>
                <div className="flex items-center gap-2">
                  <Kbd>
                    <Kbd.Content>P</Kbd.Content>
                  </Kbd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Shuffle:</span>
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
              OK
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export namespace HelpDialog {
  export type Props = Pick<ModalBackdropProps, 'isOpen' | 'onOpenChange'>;
}
