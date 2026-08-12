import {
  SquareChartColumn,
  CrownDiamond,
  Clock,
  TrashBin,
} from '@gravity-ui/icons';
import {
  Modal,
  Button,
  type ModalBackdropProps,
  Table,
  Chip,
  AlertDialog,
  Typography,
  toast,
} from '@heroui/react';

import type { Stats } from '@/stats/types';

import { Game } from '@/game/game';
import { formatElapsedTime } from '@/shared/utils/format-elapsed-time';

const boardSizes: Game.BoardSize[] = [3, 4, 5, 6];

interface StatsDialogProps extends Pick<
  ModalBackdropProps,
  'isOpen' | 'onOpenChange'
> {
  /**
   * Stats object.
   */
  stats?: Stats;
  /**
   * Clear stats button press handler.
   */
  onClearStatsPress?: () => void;
}

export const StatsDialog = (props: StatsDialogProps) => {
  const { isOpen, onOpenChange, stats = {}, onClearStatsPress } = props;

  const handleClearStats = () => {
    toast.success('Stats cleared');
    onClearStatsPress?.();
  };

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
              <SquareChartColumn className="size-5" />
            </Modal.Icon>
            <Modal.Heading>Your stats</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <Table variant="secondary">
              <Table.ScrollContainer>
                <Table.Content aria-label="Player statistics">
                  <Table.Header>
                    <Table.Column isRowHeader>Board</Table.Column>
                    <Table.Column>PB</Table.Column>
                    <Table.Column>Avg</Table.Column>
                    <Table.Column>Games</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {boardSizes.map((size) => {
                      const entry = stats[size];

                      return (
                        <Table.Row key={size}>
                          <Table.Cell className="text-center font-bold min-w-10">{`${size}x${size}`}</Table.Cell>
                          <Table.Cell>
                            {entry ? (
                              <Chip
                                color="warning"
                                variant="soft"
                                className="tabular-nums"
                              >
                                <CrownDiamond width={12} />
                                <Chip.Label>
                                  {formatElapsedTime(entry.best)}
                                </Chip.Label>
                              </Chip>
                            ) : (
                              <Typography color="muted" type="body-sm">
                                Not set
                              </Typography>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {entry ? (
                              <Chip
                                color="default"
                                variant="soft"
                                className="tabular-nums"
                              >
                                <Clock width={12} />
                                <Chip.Label>
                                  {formatElapsedTime(entry.average)}
                                </Chip.Label>
                              </Chip>
                            ) : (
                              <Typography color="muted" type="body-sm">
                                Not set
                              </Typography>
                            )}
                          </Table.Cell>
                          <Table.Cell className="text-center">
                            {entry?.games ?? '0'}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <AlertDialog>
              <Button
                variant="danger-soft"
                isDisabled={Object.keys(stats).length === 0}
              >
                <TrashBin />
                Clear
              </Button>
              <AlertDialog.Backdrop>
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="sm:max-w-[400px]">
                    <AlertDialog.CloseTrigger />
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="danger" />
                      <AlertDialog.Heading>Clear stats?</AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p>This action cannot be undone.</p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button slot="close" variant="tertiary">
                        Cancel
                      </Button>
                      <Button
                        slot="close"
                        variant="danger"
                        onPress={handleClearStats}
                      >
                        Clear
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
            <Button slot="close" variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};
