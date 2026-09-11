import { mapValues } from 'es-toolkit';

import { sounds, type SoundKey } from '@/assets/sounds';

class SoundManager {
  #isEnabled: boolean = true;

  readonly #audio: Record<SoundKey, HTMLAudioElement>;

  constructor(enabled = true) {
    this.#isEnabled = enabled;
    this.#audio = mapValues(sounds, (src) => new Audio(src));
  }

  public setEnabled = (enabled: boolean) => {
    this.#isEnabled = enabled;
  };

  public play = (sound: SoundKey): void => {
    const { hasBeenActive } = navigator.userActivation;

    if (!this.#isEnabled || !hasBeenActive) return;

    const audio = this.#audio[sound];

    audio.currentTime = 0;
    void audio.play();
  };
}

export const soundManager = new SoundManager();
