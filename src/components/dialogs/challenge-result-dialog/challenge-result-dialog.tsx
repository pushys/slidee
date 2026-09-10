import { Flag, Stopwatch, ArrowRightFromSquare } from '@gravity-ui/icons';
import {
  Modal,
  Button,
  Description,
  Separator,
  type ModalDialogProps,
} from '@heroui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimeoutWhen } from 'rooks';

const INTERACTIVITY_DELAY_MS = 1000;

export const ChallengeResultDialog = (props: ChallengeResultDialog.Props) => {
  const {
    score = 0,
    bestScore = 0,
    onNewChallengePress,
    onQuitPress,
    ...rest
  } = props;

  const { t } = useTranslation();

  const [isInteractive, setInteractive] = useState(false);

  const isNewScore = score > bestScore;

  // Make buttons interactive only some time after dialog has opened
  // so a player doesn't accidentally presses anything while still
  // being focused on the game when the results pop up on time's up.
  useTimeoutWhen(() => setInteractive(true), INTERACTIVITY_DELAY_MS);

  return (
    <Modal.Dialog {...rest} className={clsx('sm:max-w-sm', rest.className)}>
      <Modal.Header>
        <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
          <Flag className="size-5" />
        </Modal.Icon>
        <Modal.Heading>{t('challengeResultDialog.title')}</Modal.Heading>
      </Modal.Header>
      <Modal.Body>
        <div className="mt-4 mb-6 flex flex-col items-center">
          <span
            className={clsx(
              'rounded-2xl px-7 py-4 font-mono text-8xl font-bold slashed-zero tabular-nums text-shadow-xs',
              { 'bg-surface-tertiary': !isNewScore },
              { 'bg-warning/15 text-warning': isNewScore },
            )}
          >
            {Math.abs(score)}
          </span>
          <span className="mt-3 text-lg font-bold text-black dark:text-white">
            {isNewScore
              ? t('challengeResultDialog.newBestScore')
              : t('challengeResultDialog.yourScore')}
          </span>
          {bestScore > 0 && (
            <Description className="text-xs">
              {isNewScore
                ? t('challengeResultDialog.previous')
                : t('challengeResultDialog.best')}
              {': '}
              {Math.abs(bestScore)}
            </Description>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="w-full"
            onPress={onNewChallengePress}
            isDisabled={!isInteractive}
            slot="close"
          >
            <Stopwatch />
            {t('challengeResultDialog.newChallenge')}
          </Button>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-sm text-muted uppercase">
              {t('challengeResultDialog.or')}
            </span>
            <Separator className="flex-1" />
          </div>
          <Button
            size="lg"
            variant="danger-soft"
            className="w-full"
            onPress={onQuitPress}
            isDisabled={!isInteractive}
            slot="close"
          >
            <ArrowRightFromSquare />
            {t('common.quit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export namespace ChallengeResultDialog {
  export interface Props extends ModalDialogProps {
    /**
     * Current challenge score.
     *
     * @default 0
     */
    score?: number;
    /**
     * Best all time score.
     *
     * @default 0
     */
    bestScore?: number;
    /**
     * Restart challenge press handler.
     */
    onNewChallengePress?: () => void;
    /**
     * Exit challenge press handler.
     */
    onQuitPress?: () => void;
  }
}
