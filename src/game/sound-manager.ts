import { sounds } from '@/assets/sounds';

export class SoundManager {
  static readonly Sound = Object.freeze({
    Move: 'move',
    Win: 'win',
  } as const);

  readonly #move = new Audio(sounds.move);
  readonly #win = new Audio(sounds.win);

  constructor() {
    this.#move.volume = 1;
    this.#win.volume = 1;
  }

  #playAudio(audio: HTMLAudioElement): void {
    if (navigator.userActivation.hasBeenActive) {
      audio.currentTime = 0;
      void audio.play();
    }
  }

  /**
   * Plays a sound by a code.
   *
   * @param sound
   */
  public play(sound: SoundManager.Sound): void {
    switch (sound) {
      case SoundManager.Sound.Move:
        this.#playAudio(this.#move);
        break;
      case SoundManager.Sound.Win:
        this.#playAudio(this.#win);
        break;
    }
  }
}

export namespace SoundManager {
  export type Sound =
    (typeof SoundManager.Sound)[keyof typeof SoundManager.Sound];
}
