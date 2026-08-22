import type { images } from '@/assets/images';
import type { Game } from '@/game/game';

export interface Settings {
  sound: boolean;
  boardSize: Game.BoardSize;
  confetti: boolean;
  animations: boolean;
  showNumbers: boolean;
  image: null | keyof typeof images;
}
