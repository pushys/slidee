import { sounds, type SoundKey } from '@/assets/sounds';

export class SoundManager {
  readonly #countdown = new Audio(sounds.countdown);
  readonly #countdownEnd = new Audio(sounds.countdownEnd);
  readonly #move = new Audio(sounds.move);
  readonly #tick = new Audio(sounds.tick);
  readonly #win = new Audio(sounds.win);

  constructor() {
    this.#countdown.volume = 1;
    this.#countdownEnd.volume = 1;
    this.#move.volume = 1;
    this.#tick.volume = 1;
    this.#win.volume = 1;
  }

  #playAudio(audio: HTMLAudioElement): void {
    if (navigator.userActivation.hasBeenActive) {
      audio.currentTime = 0;
      void audio.play();
    }
  }

  public play(sound: SoundKey): void {
    switch (sound) {
      case 'countdown':
        this.#playAudio(this.#countdown);
        break;
      case 'countdownEnd':
        this.#playAudio(this.#countdownEnd);
        break;
      case 'move':
        this.#playAudio(this.#move);
        break;
      case 'tick':
        this.#playAudio(this.#tick);
        break;
      case 'win':
        this.#playAudio(this.#win);
        break;
    }
  }
}

export namespace SoundManager {
  export type Sound = SoundKey;
}
