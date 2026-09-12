import { useState, useMemo, useCallback } from 'react';
import { useDidUpdate } from 'rooks';

export function useDialog(props: useDialog.Props = {}): useDialog.ReturnValue {
  const { onOpen, onClose } = props;

  const [current, setCurrent] = useState<useDialog.Key | null>(null);
  const [isOpen, setOpen] = useState(false);

  const open = useCallback((key: useDialog.Key) => {
    setCurrent(key);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useDidUpdate(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen]);

  return useMemo(
    () => ({ current, isOpen, open, close }),
    [current, isOpen, open, close],
  );
}

export namespace useDialog {
  export type Key =
    | 'settings'
    | 'stats'
    | 'help'
    | 'challenge-settings'
    | 'challenge-result';

  export interface Props {
    onOpen?: () => void;
    onClose?: () => void;
  }

  export interface ReturnValue {
    current: Key | null;
    isOpen: boolean;
    open: (key: Key) => void;
    close: () => void;
  }
}
