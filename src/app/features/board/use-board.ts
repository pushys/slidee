import { useState, useMemo, useCallback } from 'react';

export function useBoard(): useBoard.ReturnValue {
  const [isImagePreviewing, setImagePreviewing] = useState(false);

  const startImagePreview = useCallback(() => setImagePreviewing(true), []);
  const stopImagePreview = useCallback(() => setImagePreviewing(false), []);

  return useMemo(
    () => ({ isImagePreviewing, startImagePreview, stopImagePreview }),
    [isImagePreviewing, startImagePreview, stopImagePreview],
  );
}

export namespace useBoard {
  export interface ReturnValue {
    isImagePreviewing: boolean;
    startImagePreview: () => void;
    stopImagePreview: () => void;
  }
}
