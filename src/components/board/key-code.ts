export const KeyCode = {
  ArrowLeft: 'ArrowLeft',
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  ArrowDown: 'ArrowDown',
  Space: 'Space',
  KeyP: 'KeyP',
} as const;

export type KeyCode = (typeof KeyCode)[keyof typeof KeyCode];
