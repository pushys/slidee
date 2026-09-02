import {
  SquareChartColumn,
  CrownDiamond,
  Clock,
  TrashBin,
} from '@gravity-ui/icons';
import {
  Modal,
  Button,
  Table,
  Chip,
  AlertDialog,
  Typography,
  toast,
  type ModalDialogProps,
} from '@heroui/react';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Stats } from '@/stats/stats.schema';

import { Game } from '@/game/game';
import { formatElapsedTime } from '@/shared/utils/format-elapsed-time';

export const StatsDialog = (props: StatsDialog.Props) => {
  const { stats = {}, onClearStatsPress, ...rest } = props;

  const { t } = useTranslation();

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [boardSize, setBoardSize] = useState<Game.BoardSize | undefined>();

  const handleClearStats = () => {
    toast.success(t('statsDialog.clearSuccessMessage'));
    onClearStatsPress?.(boardSize);
  };

  return (
    <React.Fragment>
      <Modal.Dialog {...rest} className={clsx('sm:max-w-lg', rest.className)}>
        <Modal.CloseTrigger />
        <Modal.Header>
          <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
            <SquareChartColumn className="size-5" />
          </Modal.Icon>
          <Modal.Heading>{t('statsDialog.title')}</Modal.Heading>
        </Modal.Header>
        <Modal.Body>
          <Table variant="secondary">
            <Table.ScrollContainer>
              <Table.Content aria-label={t('statsDialog.title')}>
                <Table.Header>
                  <Table.Column isRowHeader>
                    {t('statsDialog.tableColumns.board')}
                  </Table.Column>
                  <Table.Column>
                    {t('statsDialog.tableColumns.personalBest')}
                  </Table.Column>
                  <Table.Column>
                    {t('statsDialog.tableColumns.average')}
                  </Table.Column>
                  <Table.Column>
                    {t('statsDialog.tableColumns.games')}
                  </Table.Column>
                  <Table.Column>
                    <span className="sr-only">
                      {t('statsDialog.tableColumns.actions')}
                    </span>
                  </Table.Column>
                </Table.Header>
                <Table.Body>
                  {Game.BOARD_SIZES.map((size) => {
                    const entry = stats[size];

                    return (
                      <Table.Row key={size}>
                        <Table.Cell className="min-w-10 font-bold">{`${size}x${size}`}</Table.Cell>
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
                              {t('statsDialog.timeNotSet')}
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
                              {t('statsDialog.timeNotSet')}
                            </Typography>
                          )}
                        </Table.Cell>
                        <Table.Cell>{entry?.games ?? '0'}</Table.Cell>
                        <Table.Cell>
                          <Button
                            isIconOnly
                            variant="danger-soft"
                            size="sm"
                            isDisabled={!entry}
                            onPress={() => {
                              setBoardSize(size);
                              setConfirmOpen(true);
                            }}
                            aria-label={t('statsDialog.clearStats')}
                          >
                            <TrashBin />
                          </Button>
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
          <Button
            variant="danger-soft"
            isDisabled={Object.keys(stats).length === 0}
            onPress={() => {
              setBoardSize(undefined);
              setConfirmOpen(true);
            }}
          >
            <TrashBin />
            {t('statsDialog.clearAll')}
          </Button>
          <Button slot="close" variant="secondary">
            {t('common.close')}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
      <AlertDialog.Backdrop
        isOpen={isConfirmOpen}
        onOpenChange={setConfirmOpen}
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                {boardSize
                  ? t('alerts.clearStats.title.board', { size: boardSize })
                  : t('alerts.clearStats.title.all')}
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>{t('alerts.clearStats.description')}</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                {t('common.cancel')}
              </Button>
              <Button slot="close" variant="danger" onPress={handleClearStats}>
                {t('common.clear')}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </React.Fragment>
  );
};

export namespace StatsDialog {
  export interface Props extends ModalDialogProps {
    /**
     * Stats object.
     */
    stats?: Stats;
    /**
     * Clear stats button press handler.
     */
    onClearStatsPress?: (boardSize?: Game.BoardSize) => void;
  }
}
